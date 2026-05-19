import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { visit } from "unist-util-visit";

// Resolve the project's public/ directory relative to this plugin file
// (src/plugins/ → ../../public/)
const publicDir = fileURLToPath(new URL("../../public/", import.meta.url));

async function getPublicImageSize(src) {
	try {
		// src may be URL-encoded (e.g. /assets/img%20name.png)
		const decoded = decodeURIComponent(src);
		const filePath = path.join(publicDir, decoded);
		if (!existsSync(filePath)) return null;

		// Dynamic import so the plugin stays an ES module without a hard dep at the top
		const sharp = (await import("sharp")).default;
		const meta = await sharp(filePath).metadata();
		if (meta.width && meta.height) return { width: meta.width, height: meta.height };
	} catch {
		// Silently skip unreadable / non-image files
	}
	return null;
}

/**
 * Rehype plugin that adds loading="lazy" + decoding="async" to all <img> tags
 * in markdown, and injects width/height for public-directory images so the
 * browser can reserve space and avoid Cumulative Layout Shift.
 */
export function rehypeLazyImages() {
	return async (tree) => {
		const tasks = [];

		visit(tree, "element", (node) => {
			if (node.tagName !== "img") return;
			node.properties = node.properties || {};

			if (!node.properties.loading) node.properties.loading = "lazy";
			if (!node.properties.decoding) node.properties.decoding = "async";

			// Only probe public-directory images that don't already have dimensions
			const src = node.properties.src;
			if (src?.startsWith("/") && !node.properties.width && !node.properties.height) {
				tasks.push(
					getPublicImageSize(src).then((dims) => {
						if (dims) {
							node.properties.width = dims.width;
							node.properties.height = dims.height;
						}
					}),
				);
			}
		});

		if (tasks.length > 0) await Promise.all(tasks);
	};
}
