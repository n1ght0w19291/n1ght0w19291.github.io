import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error(
    "Error: No filename argument provided\nUsage: pnpm new-mdx-post <filename>"
  );
  process.exit(1);
}

let fileName = args[0];

if (!/\.(md|mdx)$/i.test(fileName)) {
  fileName += ".mdx";
}

const targetDir = "./src/data/blog";
const fullPath = path.join(targetDir, fileName);
const assetsDir = path.join(
  "./src/assets/images/blog",
  fileName.slice(0, -path.extname(fileName).length)
);

if (fs.existsSync(fullPath)) {
  console.error(`Error: File ${fullPath} already exists`);
  process.exit(1);
}

const now = new Date();
const pubDatetime = now.toISOString().replace(/(\.\d{3})Z$/, ".000Z");
const title = path.basename(fileName, path.extname(fileName));

const content = `---
title: "${title}"
description: ''
pubDatetime: ${pubDatetime}
tags: []
draft: false
---

{/* 可以在這裡加入 MDX 或 React 元件 */}
`;

fs.writeFileSync(fullPath, content);
fs.mkdirSync(assetsDir, { recursive: true });
console.log(`Post ${fullPath} created`);
console.log(`Assets folder ${assetsDir} created`);
