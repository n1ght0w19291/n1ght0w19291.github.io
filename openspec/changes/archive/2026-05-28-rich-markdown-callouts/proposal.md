## Why

Blog posts are currently limited to plain prose, blockquotes, and code blocks. Adding callout/admonition blocks and spoiler (hidden-content) blocks will let authors visually distinguish notes, warnings, tips, and other asides, and hide spoiler content behind a click — making articles easier to scan and more visually engaging without leaving Markdown.

## What Changes

- Add support for GitHub-flavored alert syntax: `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, `> [!CAUTION]`, `> [!IMPORTANT]`
- Add support for directive-style callouts: `:::note[Optional Title]` … `:::` (covering `note`, `tip`, `warning`, `caution`, `important`)
- Add a spoiler block (`:::spoiler[Optional Title]` … `:::`) that hides content until the reader clicks to reveal it
- Wire all new elements into the existing `.app-prose` Tailwind typography layer so they inherit the blog's colour tokens (`--accent`, `--foreground`, `--border`, etc.)

## Capabilities

### New Capabilities

- `callout-blocks`: Remark plugin pipeline that converts GFM alert blockquotes (`> [!TYPE]`) and directive fences (`:::type[title]`) into styled `<aside>` elements with type-specific icon, title, and body — supports 14 types (`note`, `tip`, `warning`, `caution`, `important`, `info`, `success`, `danger`, `question`, `abstract`, `todo`, `example`, `quote`, `bug`) plus aliases
- `spoiler-block`: Remark transform that renders `:::spoiler[Optional Title]` … `:::` as a click-to-reveal element; content is hidden by default and shown on interaction

### Modified Capabilities

- (none)

## Impact

- **Dependencies added**: `remark-directive`, `remark-github-alerts` (or a custom remark plugin), optionally `rehype-callouts`
- **`astro.config.ts`**: New remark plugins registered in `markdown.remarkPlugins`
- **`src/styles/typography.css`**: New `.callout`, `.callout-note`, `.callout-tip`, `.callout-warning`, `.callout-caution`, `.callout-important`, `.spoiler` CSS rules added inside `.app-prose`
- **No breaking changes** — existing blockquotes and `---` continue to render as before
