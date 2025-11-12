import fs from "node:fs";
import path from "node:path";

function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

const args = process.argv.slice(2);

if (args.length === 0) {
	console.error(`Error: No filename argument provided
Usage: npm run new-post -- <filename>`);
	process.exit(1);
}

let fileName = args[0];

// Add .mdx extension if not present
const fileExtensionRegex = /\.(md|mdx)$/i;
if (!fileExtensionRegex.test(fileName)) {
	fileName += ".mdx";
}

const targetDir = "./src/content/posts/";
const fullPath = path.join(targetDir, fileName);

if (fs.existsSync(fullPath)) {
	console.error(`Error: File ${fullPath} already exists`);
	process.exit(1);
}

// recursive mode creates multi-level directories
const dirPath = path.dirname(fullPath);
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath, { recursive: true });
}

// front-matter + optional JSX example
const content = `---
title: ${args[0]}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false
lang: ''
---

{/* 可以在這裡加入 MDX 或 React 元件 */}
`;

fs.writeFileSync(fullPath, content);

console.log(`Post ${fullPath} created`);

const parsed = path.parse(fileName);
const imageSubPath = path.join(parsed.dir, parsed.name);
const imageDir = path.join("public", "assets");
const fullImagePath = path.join(imageDir, imageSubPath);

if (!fs.existsSync(fullImagePath)) {
	fs.mkdirSync(fullImagePath, { recursive: true });
	console.log(`Image directory ${fullImagePath} created`);
} else {
	console.log(`Image directory ${fullImagePath} already exists`);
}
