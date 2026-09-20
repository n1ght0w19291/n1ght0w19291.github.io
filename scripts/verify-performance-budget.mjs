#!/usr/bin/env node

import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASTRO_OUTPUT = path.join(ROOT, "dist", "_astro");
const BUDGETS = new Map([
  [".css", 180 * 1024],
  [".js", 220 * 1024],
]);

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

const files = await walk(ASTRO_OUTPUT);
const violations = [];

for (const filePath of files) {
  const extension = path.extname(filePath);
  const budget = BUDGETS.get(extension);
  if (!budget) continue;

  const size = (await stat(filePath)).size;
  if (size > budget) {
    violations.push({
      file: path.relative(ROOT, filePath),
      size,
      budget,
    });
  }
}

if (violations.length > 0) {
  console.error("[performance] Bundle budget exceeded:");
  for (const violation of violations) {
    console.error(
      `  ${violation.file}: ${(violation.size / 1024).toFixed(1)} KB ` +
        `(limit ${(violation.budget / 1024).toFixed(0)} KB)`
    );
  }
  process.exit(1);
}

console.log(
  `[performance] Checked ${files.length} generated Astro assets; ` +
    "CSS <= 180 KB and JS <= 220 KB."
);
