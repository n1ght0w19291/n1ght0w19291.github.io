import { visit } from "unist-util-visit";

/**
 * Rehype plugin that improves image loading in markdown:
 * - First image: loading="eager" + fetchpriority="high" (LCP candidate — never defer)
 * - All subsequent images: loading="lazy" + decoding="async" (below-fold deferral)
 */
export function rehypeLazyImages() {
	return (tree) => {
		let isFirst = true;

		visit(tree, "element", (node) => {
			if (node.tagName !== "img") return;
			node.properties = node.properties || {};

			if (isFirst) {
				isFirst = false;
				node.properties.loading = node.properties.loading || "eager";
				node.properties.fetchpriority = node.properties.fetchpriority || "high";
				node.properties.decoding = node.properties.decoding || "async";
			} else {
				if (!node.properties.loading) node.properties.loading = "lazy";
				if (!node.properties.decoding) node.properties.decoding = "async";
			}
		});
	};
}
