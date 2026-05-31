import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const SPOILER_RE = /\|\|([\s\S]+?)\|\|/g;
const NODE_PH = "\x00"; // non-text inline node (image, link, etc.)
// Use a private-use Unicode char as hard-break placeholder to avoid linter issues
const BREAK_PH = ""; // hard break node (  \n)

function splitSpoilerLines(s: string): string[] {
  return s.split(BREAK_PH).flatMap(part => part.split("\n")).filter(l => l.length > 0);
}

type Child = { type: string; value?: string; [key: string]: unknown };

function childToFlat(child: Child): string {
  if (child.type === "text") return child.value ?? "";
  if (child.type === "break") return BREAK_PH;
  return NODE_PH;
}

function appendPlainSlice(
  out: Child[],
  slice: string,
  segments: Array<{ start: number; end: number; original: Child }>,
  flatOffset: number,
): void {
  let pos = flatOffset;
  let buf = "";

  const flush = () => {
    if (!buf) return;
    // Soft \n within text → space (standard HTML soft-break behaviour)
    out.push({ type: "text", value: buf.replaceAll("\n", " ") });
    buf = "";
  };

  for (const ch of slice) {
    if (ch === BREAK_PH) {
      flush();
      out.push({ type: "break" });
    } else if (ch === NODE_PH) {
      flush();
      const seg = segments.find(s => s.start <= pos && pos < s.end);
      if (seg) out.push(seg.original);
    } else {
      buf += ch;
    }
    pos++;
  }
  flush();
}

const remarkInlineSpoiler: Plugin<[], Root> = () => (tree: Root) => {
  visit(tree, "paragraph", (node: any) => {
    type Segment = { start: number; end: number; original: Child };
    const segments: Segment[] = [];
    let flat = "";

    for (const child of node.children as Child[]) {
      const start = flat.length;
      flat += childToFlat(child);
      segments.push({ start, end: flat.length, original: child });
    }

    if (!flat.includes("||")) return;

    SPOILER_RE.lastIndex = 0;
    const newChildren: Child[] = [];
    let cursor = 0;
    let matched = false;
    let match: RegExpExecArray | null;

    while ((match = SPOILER_RE.exec(flat)) !== null) {
      matched = true;
      appendPlainSlice(newChildren, flat.slice(cursor, match.index), segments, cursor);

      const lines = splitSpoilerLines(match[1]);

      // All lines are inline spans; explicit <br> between lines preserves
      // surrounding text on the same line as the first/last spoiler chunk.
      for (let i = 0; i < lines.length; i++) {
        if (i > 0) newChildren.push({ type: "html", value: "<br>" });
        newChildren.push({
          type: "html",
          value: `<span class="spoiler" data-spoiler="inline">${lines[i]}</span>`,
        });
      }
      cursor = SPOILER_RE.lastIndex;
    }
    if (!matched) return;
    appendPlainSlice(newChildren, flat.slice(cursor), segments, cursor);
    node.children = newChildren;
  });
};

export default remarkInlineSpoiler;
