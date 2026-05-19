import { visit } from "unist-util-visit";

/**
 * Rehype plugin to add loading="lazy" and decoding="async" to all <img> tags.
 * This significantly improves initial page load on mobile, especially for
 * image-heavy CTF writeup posts.
 */
export function rehypeLazyImages() {
	return (tree) => {
		visit(tree, "element", (node) => {
			if (node.tagName === "img") {
				node.properties = node.properties || {};
				if (!node.properties.loading) {
					node.properties.loading = "lazy";
				}
				if (!node.properties.decoding) {
					node.properties.decoding = "async";
				}
			}
		});
	};
}
