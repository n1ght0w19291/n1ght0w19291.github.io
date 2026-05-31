import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";

const ALIAS_MAP: Record<string, string> = {
  note: "note",
  tip: "tip",
  warning: "warning",
  warn: "warning",
  caution: "caution",
  important: "important",
  info: "info",
  success: "success",
  check: "success",
  done: "success",
  danger: "danger",
  error: "danger",
  question: "question",
  faq: "question",
  help: "question",
  abstract: "abstract",
  tldr: "abstract",
  summary: "abstract",
  todo: "todo",
  example: "example",
  quote: "quote",
  cite: "quote",
  bug: "bug",
};

const DEFAULT_LABELS: Record<string, string> = {
  note: "Note",
  tip: "Tip",
  warning: "Warning",
  caution: "Caution",
  important: "Important",
  info: "Info",
  success: "Success",
  danger: "Danger",
  question: "Question",
  abstract: "Abstract",
  todo: "Todo",
  example: "Example",
  quote: "Quote",
  bug: "Bug",
};

const remarkCallouts: Plugin<[], Root> = () => (tree: Root) => {
  visit(tree, "containerDirective", (node: any) => {
    const name = node.name?.toLowerCase();

    if (name === "spoiler") {
      const labelNode = node.children.find(
        (c: any) => c.data?.directiveLabel === true
      );
      const label = labelNode ? toString(labelNode) : "Spoiler";
      node.children = node.children.filter(
        (c: any) => c.data?.directiveLabel !== true
      );
      node.data = node.data ?? {};
      node.data.hName = "div";
      node.data.hProperties = {
        class: "spoiler",
        "data-spoiler": "block",
        "data-spoiler-label": label,
      };
      return;
    }

    const canonical = ALIAS_MAP[name];
    if (!canonical) return;

    const labelNode = node.children.find(
      (c: any) => c.data?.directiveLabel === true
    );
    const label = labelNode
      ? toString(labelNode)
      : DEFAULT_LABELS[canonical];
    const bodyChildren = node.children.filter(
      (c: any) => c.data?.directiveLabel !== true
    );

    node.data = node.data ?? {};
    node.data.hName = "aside";
    node.data.hProperties = { "data-callout": canonical };
    node.children = [
      {
        type: "paragraph",
        data: {
          hName: "div",
          hProperties: { className: ["callout-title"] },
        },
        children: [{ type: "text", value: label }],
      } as any,
      ...bodyChildren,
    ];
  });
};

export default remarkCallouts;
