#!/usr/bin/env node

import { readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const MIN_OPTIMIZE_BYTES = 128 * 1024;
const MAX_IMAGE_BYTES = 1024 * 1024;
const MAX_IMAGE_WIDTH = 2560;

const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);
const TEXT_EXTENSIONS = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".map",
  ".mjs",
  ".xml",
]);

function isConvertibleToWebp(extension, relativePath) {
  const basename = path.basename(relativePath).toLowerCase();
  const normalizedPath = relativePath.split(path.sep).join("/").toLowerCase();

  // Keep social preview images in their original formats.
  return (
    [".jpg", ".jpeg", ".png"].includes(extension) &&
    basename !== "og.png" &&
    basename !== "index.png" &&
    !normalizedPath.includes("/og/")
  );
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(entryPath)));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

async function optimizeImage(filePath, checkOnly, basenameCounts) {
  const extension = path.extname(filePath).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(extension)) {
    return null;
  }

  const original = await stat(filePath);
  const relativePath = path.relative(DIST, filePath);
  const sourceBuffer = await readFile(filePath);
  const image = sharp(sourceBuffer, { failOn: "none" });
  const metadata = await image.metadata();

  if (
    original.size < MIN_OPTIMIZE_BYTES &&
    (metadata.width ?? 0) <= MAX_IMAGE_WIDTH
  ) {
    return { filePath, originalSize: original.size, finalSize: original.size, changed: false };
  }

  if (checkOnly) {
    return { filePath, originalSize: original.size, finalSize: original.size, changed: false };
  }

  const needsResize = (metadata.width ?? 0) > MAX_IMAGE_WIDTH;
  const basePipeline = needsResize
    ? image.resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true })
    : image;

  let optimizedBuffer;
  if (isConvertibleToWebp(extension, relativePath)) {
    optimizedBuffer = await basePipeline
      .clone()
      .webp({ quality: 84, effort: 6 })
      .toBuffer();
  }

  let sameFormatBuffer;
  switch (extension) {
    case ".jpg":
    case ".jpeg":
      sameFormatBuffer = await basePipeline
        .clone()
        .jpeg({ quality: 82, progressive: true, mozjpeg: true })
        .toBuffer();
      break;
    case ".png":
      sameFormatBuffer = await basePipeline
        .clone()
        .png({
          compressionLevel: 9,
          adaptiveFiltering: true,
          effort: 10,
        })
        .toBuffer();
      break;
    case ".webp":
      sameFormatBuffer = await basePipeline
        .clone()
        .webp({ quality: 84, effort: 6 })
        .toBuffer();
      break;
    case ".avif":
      sameFormatBuffer = await basePipeline
        .clone()
        .avif({ quality: 55, effort: 6 })
        .toBuffer();
      break;
    default:
      sameFormatBuffer = await basePipeline.toBuffer();
      break;
  }

  const candidates = [
    { buffer: sameFormatBuffer, targetPath: filePath, converted: false },
  ];
  if (
    optimizedBuffer &&
    optimizedBuffer.length < original.size &&
    basenameCounts.get(path.basename(filePath).toLowerCase()) === 1
  ) {
    candidates.push({
      buffer: optimizedBuffer,
      targetPath: filePath.replace(/\.(png|jpe?g)$/i, ".webp"),
      converted: true,
    });
  }

  const best = candidates.reduce((smallest, candidate) =>
    candidate.buffer.length < smallest.buffer.length ? candidate : smallest,
  );

  if (best.buffer.length >= original.size) {
    return {
      filePath,
      originalSize: original.size,
      finalSize: original.size,
      changed: false,
    };
  }

  if (best.converted) {
    try {
      await stat(best.targetPath);
      return {
        filePath,
        originalSize: original.size,
        finalSize: original.size,
        changed: false,
      };
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }

    await writeFile(best.targetPath, best.buffer);
    await rm(filePath);
  } else {
    await writeFile(filePath, best.buffer);
  }

  return {
    filePath,
    originalSize: original.size,
    finalSize: best.buffer.length,
    changed: true,
    converted: best.converted,
    targetPath: best.targetPath,
  };
}

async function updateReferences(replacements) {
  if (replacements.length === 0) return 0;

  const files = await walk(DIST);
  let updatedFiles = 0;

  for (const filePath of files) {
    if (!TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase())) continue;

    let content = await readFile(filePath, "utf8");
    const original = content;

    for (const replacement of replacements) {
      content = content.split(replacement.from).join(replacement.to);
    }

    if (content !== original) {
      await writeFile(filePath, content);
      updatedFiles += 1;
    }
  }

  return updatedFiles;
}

async function main() {
  const checkOnly = process.argv.includes("--check");

  try {
    await stat(DIST);
  } catch {
    throw new Error("dist/ does not exist. Run the Astro build first.");
  }

  const files = await walk(DIST);
  const imageFiles = files.filter((filePath) =>
    IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase()),
  );
  const basenameCounts = new Map();

  for (const filePath of imageFiles) {
    const basename = path.basename(filePath).toLowerCase();
    basenameCounts.set(basename, (basenameCounts.get(basename) ?? 0) + 1);
  }

  const results = [];
  for (const filePath of imageFiles) {
    results.push(await optimizeImage(filePath, checkOnly, basenameCounts));
  }

  const replacements = results
    .filter((result) => result?.converted && result.targetPath)
    .map((result) => ({
      from: path.basename(result.filePath),
      to: path.basename(result.targetPath),
    }));
  const updatedFiles = checkOnly ? 0 : await updateReferences(replacements);

  const remainingFiles = await walk(DIST);
  const oversized = [];
  for (const filePath of remainingFiles) {
    if (!IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase())) continue;
    const imageStats = await stat(filePath);
    if (imageStats.size > MAX_IMAGE_BYTES) {
      oversized.push({
        filePath,
        size: imageStats.size,
      });
    }
  }

  const changed = results.filter((result) => result?.changed);
  const converted = changed.filter((result) => result.converted);
  const savedBytes = changed.reduce(
    (total, result) => total + (result.originalSize - result.finalSize),
    0,
  );

  console.log(
    "[images] " + (checkOnly ? "Checked" : "Optimized") + " " + imageFiles.length + " images.",
  );
  if (!checkOnly) {
    console.log(
      "[images] Recompressed " + changed.length +
        "; converted " + converted.length + " to WebP; updated " +
        updatedFiles + " text files.",
    );
  }

  if (oversized.length > 0) {
    console.error("[images] ERROR: " + oversized.length + " image(s) exceed 1 MB:");
    for (const image of oversized) {
      console.error(
        "  " + formatBytes(image.size) + " " + path.relative(DIST, image.filePath),
      );
    }
    process.exitCode = 1;
  } else {
    console.log("[images] All deployed raster images are within the 1 MB limit.");
  }

  if (!checkOnly && savedBytes > 0) {
    console.log("[images] Saved approximately " + formatBytes(savedBytes) + ".");
  }
}

main().catch((error) => {
  console.error("[images] ERROR: " + error.message);
  process.exitCode = 1;
});
