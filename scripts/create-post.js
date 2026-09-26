import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "..");

export function getTaipeiDatetime() {
  const taipeiDate = new Date(Date.now() + 8 * 60 * 60 * 1000);
  return `${taipeiDate.toISOString().replace(/\.\d{3}Z$/, "")}+08:00`;
}

function resolvePostPath(input, targetDir, defaultExtension) {
  const normalizedInput = input.replace(/[\\/]+/g, path.sep);
  const segments = normalizedInput.split(path.sep);

  if (
    path.isAbsolute(normalizedInput) ||
    /^[a-z]:/i.test(input) ||
    segments.some(
      segment =>
        segment === ".." ||
        segment === "." ||
        !segment ||
        /[<>:"|?*]/.test(segment) ||
        /[. ]$/.test(segment)
    )
  ) {
    throw new Error("Filename must be a relative path inside src/data/blog");
  }

  const extension = path.extname(normalizedInput);
  if (extension && !/^\.(md|mdx)$/i.test(extension)) {
    throw new Error("Post filename must use the .md or .mdx extension");
  }

  const fileName = extension
    ? `${normalizedInput.slice(0, -extension.length)}${extension.toLowerCase()}`
    : `${normalizedInput}${defaultExtension}`;
  const fullPath = path.resolve(targetDir, fileName);
  const relativePath = path.relative(targetDir, fullPath);
  if (relativePath.startsWith(`..${path.sep}`) || relativePath === "..") {
    throw new Error("Filename must stay inside src/data/blog");
  }

  return { fileName, fullPath };
}

export function createPost({ defaultExtension, usage, renderContent }) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error(
      `Error: No filename argument provided\nUsage: ${usage} <filename>`
    );
    process.exit(1);
  }

  const targetDir = path.join(PROJECT_ROOT, "src/data/blog");
  let fileName;
  let fullPath;
  try {
    ({ fileName, fullPath } = resolvePostPath(args[0], targetDir, defaultExtension));
  } catch (error) {
    console.error(`Error: ${error.message}\nUsage: ${usage} <filename>`);
    process.exit(1);
  }

  const assetsDir = path.join(
    PROJECT_ROOT,
    "src/assets/images/blog",
    fileName.slice(0, -path.extname(fileName).length)
  );

  if (fs.existsSync(fullPath)) {
    console.error(`Error: File ${path.relative(PROJECT_ROOT, fullPath)} already exists`);
    process.exit(1);
  }

  const pubDatetime = getTaipeiDatetime();
  const title = path.basename(fileName, path.extname(fileName));

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, renderContent({ title, pubDatetime }));
  fs.mkdirSync(assetsDir, { recursive: true });
  console.log(`Post ${path.relative(PROJECT_ROOT, fullPath)} created`);
  console.log(`Assets folder ${path.relative(PROJECT_ROOT, assetsDir)} created`);
}
