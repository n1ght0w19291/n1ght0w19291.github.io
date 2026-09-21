import type { Root } from "mdast";
import type { Plugin } from "unified";
import type { Node } from "unist";
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

type DirectiveData = {
  directiveLabel?: boolean;
  hName?: string;
  hProperties?: Record<string, string | string[]>;
};

type DirectiveChild = Node & {
  data?: DirectiveData;
  children?: DirectiveChild[];
  value?: string;
};

type ContainerDirective = Node & {
  name?: string;
  children: DirectiveChild[];
  data?: DirectiveData;
};

const remarkCallouts: Plugin<[], Root> = () => (tree: Root) => {
  visit(tree, "containerDirective", node => {
    const directive = node as ContainerDirective;
    const name = directive.name?.toLowerCase();

    if (name === "spoiler") {
      const labelNode = directive.children.find(
        child => child.data?.directiveLabel === true
      );
      const label = labelNode ? toString(labelNode) : "Spoiler";
      directive.children = directive.children.filter(
        child => child.data?.directiveLabel !== true
      );
      directive.data = directive.data ?? {};
      directive.data.hName = "div";
      directive.data.hProperties = {
        class: "spoiler",
        "data-spoiler": "block",
        "data-spoiler-label": label,
      };
      return;
    }

    const canonical = name ? ALIAS_MAP[name] : undefined;
    if (!canonical) return;

    const labelNode = directive.children.find(
      child => child.data?.directiveLabel === true
    );
    const label = labelNode
      ? toString(labelNode)
      : DEFAULT_LABELS[canonical];
    const bodyChildren = directive.children.filter(
      child => child.data?.directiveLabel !== true
    );

    directive.data = directive.data ?? {};
    directive.data.hName = "aside";
    directive.data.hProperties = { "data-callout": canonical };
    directive.children = [
      {
        type: "paragraph",
        data: {
          hName: "div",
          hProperties: { className: ["callout-title"] },
        },
        children: [{ type: "text", value: label }],
      },
      ...bodyChildren,
    ];
  });
};

export default remarkCallouts;
