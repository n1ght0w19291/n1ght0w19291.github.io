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

const tooltipBubble = document.createElement("div");
tooltipBubble.className = "site-tooltip";
tooltipBubble.id = "site-tooltip";
tooltipBubble.setAttribute("role", "tooltip");
tooltipBubble.setAttribute("aria-hidden", "true");
document.body.append(tooltipBubble);

let activeTooltipTarget: Element | null = null;

function showTooltip(target: Element) {
  const label = target.getAttribute("data-tooltip");
  if (!label) return;

  activeTooltipTarget = target;
  tooltipBubble.textContent = label;
  tooltipBubble.dataset.placement = "above";
  tooltipBubble.dataset.visible = "true";

  const targetRect = target.getBoundingClientRect();
  const bubbleRect = tooltipBubble.getBoundingClientRect();
  const halfWidth = bubbleRect.width / 2;
  const centerX = Math.min(
    Math.max(targetRect.left + targetRect.width / 2, halfWidth + 8),
    window.innerWidth - halfWidth - 8,
  );
  tooltipBubble.style.left = `${centerX}px`;

  if (targetRect.top < bubbleRect.height + 16) {
    tooltipBubble.dataset.placement = "below";
    tooltipBubble.style.top = `${targetRect.bottom + 10}px`;
  } else {
    tooltipBubble.style.top = `${targetRect.top - 10}px`;
  }

  tooltipBubble.setAttribute("aria-hidden", "false");
}

function hideTooltip(target?: Element | null) {
  if (target && target !== activeTooltipTarget) return;
  activeTooltipTarget = null;
  tooltipBubble.dataset.visible = "false";
  tooltipBubble.setAttribute("aria-hidden", "true");
}

document.addEventListener("pointerover", (event) => {
  if (event.pointerType === "touch" || !(event.target instanceof Element)) return;
  const target = event.target.closest("[data-tooltip]");
  if (target) showTooltip(target);
});

document.addEventListener("pointerout", (event) => {
  if (!(event.target instanceof Element)) return;
  const target = event.target.closest("[data-tooltip]");
  if (!target || (event.relatedTarget instanceof Node && target.contains(event.relatedTarget))) return;
  hideTooltip(target);
});

document.addEventListener("focusin", (event) => {
  if (!(event.target instanceof Element)) return;
  const target = event.target.closest("[data-tooltip]");
  if (target) showTooltip(target);
});

document.addEventListener("focusout", (event) => {
  if (!(event.target instanceof Element)) return;
  const target = event.target.closest("[data-tooltip]");
  if (target) hideTooltip(target);
});

window.addEventListener("scroll", () => hideTooltip(), { passive: true });
window.addEventListener("resize", () => hideTooltip());

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
