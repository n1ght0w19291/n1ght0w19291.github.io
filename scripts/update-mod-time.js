import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getTaipeiDatetime } from "./create-post.js";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "..");
const BLOG_DIR = path.join(PROJECT_ROOT, "src/data/blog");
const USAGE = "pnpm update-mod-time <filename>";

function fail(message) {
  console.error(`Error: ${message}\nUsage: ${USAGE}`);
  process.exit(1);
}

function isInsideBlogDir(fullPath) {
  const relativePath = path.relative(BLOG_DIR, fullPath);
  return (
    relativePath &&
    !relativePath.startsWith(`..${path.sep}`) &&
    relativePath !== ".." &&
    !path.isAbsolute(relativePath)
  );
}

// Accepts "post", "folder/post.mdx", "src/data/blog/post.md" or an absolute path.
function resolveExistingPost(input) {
  const normalizedInput = input.replace(/[\\/]+/g, path.sep);
  const blogPrefix = path.join("src", "data", "blog") + path.sep;
  let candidateBase;
  if (path.isAbsolute(normalizedInput)) {
    candidateBase = normalizedInput;
  } else if (normalizedInput.startsWith(blogPrefix)) {
    candidateBase = path.join(PROJECT_ROOT, normalizedInput);
  } else {
    candidateBase = path.join(BLOG_DIR, normalizedInput);
  }
  const fullBase = path.resolve(candidateBase);

  if (!isInsideBlogDir(fullBase)) {
    fail("File must be inside src/data/blog");
  }

  const extension = path.extname(fullBase);
  if (/^\.(md|mdx)$/i.test(extension)) {
    if (!fs.existsSync(fullBase)) {
      fail(`File ${path.relative(PROJECT_ROOT, fullBase)} does not exist`);
    }
    return fullBase;
  }

  const matches = [".md", ".mdx"]
    .map(ext => `${fullBase}${ext}`)
    .filter(candidate => fs.existsSync(candidate));

  if (matches.length === 0) {
    fail(`No .md or .mdx file found for ${path.relative(PROJECT_ROOT, fullBase)}`);
  }
  if (matches.length > 1) {
    fail(
      `Both .md and .mdx exist for ${path.relative(PROJECT_ROOT, fullBase)}; specify the extension`
    );
  }
  return matches[0];
}

const args = process.argv.slice(2);
if (args.length === 0) {
  fail("No filename argument provided");
}

const fullPath = resolveExistingPost(args[0]);
const relativePath = path.relative(PROJECT_ROOT, fullPath);
const content = fs.readFileSync(fullPath, "utf8");
const eol = content.includes("\r\n") ? "\r\n" : "\n";

const frontmatterMatch = content.match(/^(﻿?---\r?\n)([\s\S]*?\r?\n)(---(?:\r?\n|$))/);
if (!frontmatterMatch) {
  fail(`${relativePath} has no frontmatter`);
}

const [fullFrontmatter, opening, body, closing] = frontmatterMatch;
const modDatetime = getTaipeiDatetime();
let updatedBody;

if (/^modDatetime:/m.test(body)) {
  // Replace the value and keep any trailing comment.
  updatedBody = body.replace(
    /^modDatetime:[ \t]*([^\s#]+)([ \t]+#[^\r\n]*)?$/m,
    (_, _oldValue, comment = "") => `modDatetime: ${modDatetime}${comment}`
  );
} else if (/^pubDatetime:.*$/m.test(body)) {
  updatedBody = body.replace(
    /^pubDatetime:.*$/m,
    line => `${line}${eol}modDatetime: ${modDatetime}`
  );
} else {
  fail(`${relativePath} has no pubDatetime field`);
}

fs.writeFileSync(
  fullPath,
  content.replace(fullFrontmatter, () => `${opening}${updatedBody}${closing}`)
);
console.log(`Updated modDatetime of ${relativePath} to ${modDatetime}`);
