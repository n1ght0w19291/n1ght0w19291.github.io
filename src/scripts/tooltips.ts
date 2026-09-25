const ignoredTooltipTags = new Set(["LINK", "META", "SCRIPT", "STYLE", "TITLE"]);

function replaceNativeTooltip(element: Element) {
  if (ignoredTooltipTags.has(element.tagName)) return;

  const title = element.getAttribute("title")?.trim();
  if (!title) return;

  element.setAttribute("data-tooltip", title);
  element.removeAttribute("title");
}

function replaceTooltipsIn(root: ParentNode) {
  if (root instanceof Element) replaceNativeTooltip(root);
  root.querySelectorAll("[title]").forEach(replaceNativeTooltip);
}

replaceTooltipsIn(document.body);

const tooltipObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "attributes" && mutation.target instanceof Element) {
      replaceNativeTooltip(mutation.target);
      continue;
    }

    mutation.addedNodes.forEach((node) => {
      if (node instanceof Element) replaceTooltipsIn(node);
    });
  }
});

tooltipObserver.observe(document.body, {
  attributes: true,
  attributeFilter: ["title"],
  childList: true,
  subtree: true,
});
