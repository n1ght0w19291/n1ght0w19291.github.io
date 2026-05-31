## 1. Install Dependencies

- [x] 1.1 Install `remark-directive` and `remark-github-alerts` via npm
- [x] 1.2 Verify packages are listed in `package.json` dependencies

## 2. Custom Remark Plugins

- [x] 2.1 Create `src/plugins/remarkCallouts.ts` — visits `containerDirective` nodes from `remark-directive`; resolves aliases (e.g. `check` → `success`, `tldr` → `abstract`) then maps all 14 supported types to `<aside data-callout="…">`, maps `spoiler` → `<div class="spoiler" data-spoiler="block">`, passes through unknowns
- [x] 2.2 Create `src/plugins/remarkInlineSpoiler.ts` — visits `text` nodes and replaces `||…||` tokens with `<span class="spoiler" data-spoiler="inline">…</span>` HTML nodes
- [x] 2.3 Write a client-side script `src/scripts/spoiler.ts` that attaches a click listener to all `.spoiler` elements, toggling `data-revealed` attribute on click

## 3. Wire Remark Plugins into Astro Config

- [x] 3.1 Import `remarkDirective`, `remarkGithubAlerts`, the custom `remarkCallouts`, and `remarkInlineSpoiler` plugins in `astro.config.ts`
- [x] 3.2 Add plugins to `markdown.remarkPlugins` in this order: `remarkDirective` → `remarkCallouts` → `remarkInlineSpoiler` → `remarkGithubAlerts`
- [x] 3.3 Confirm Astro dev server starts without errors after config change

## 4. Callout CSS Styles

- [x] 4.1 Add base `.callout` / `aside[data-callout]` styles inside `.app-prose` in `src/styles/typography.css` (border-left, padding, border-radius, background tint, icon via `::before` mask)
- [x] 4.2 Add type-specific colour overrides for all 14 types: `note` (blue-gray), `tip` (emerald), `warning` (amber), `caution` (rose), `important` (violet), `info` (sky), `success` (green), `danger` (red), `question` (teal), `abstract` (cyan), `todo` (orange), `example` (indigo), `quote` (stone), `bug` (pink)
- [x] 4.3 Source SVG paths for all 14 callout type icons from Lucide or Heroicons (MIT license); embed as inline `mask-image` data URIs in CSS — no emoji, no external icon font
- [x] 4.4 Add `.callout-title` styles (icon via `::before` mask + bold label row); icon `background-color` inherits the type's accent colour
- [x] 4.5 Add dark-mode overrides scoped to `html[data-theme="dark"]` if any colours need adjustment

## 5. Spoiler CSS Styles

- [x] 5.1 Add `.spoiler` base styles inside `.app-prose`: `position: relative; cursor: pointer;` with a `::after` pseudo-element overlay (`background: gray; inset: 0; position: absolute; border-radius`)
- [x] 5.2 Add `.spoiler[data-revealed]` rule that removes the overlay (`::after { display: none }` or `opacity: 0`)
- [x] 5.3 Add inline variant styles: `span.spoiler` with `display: inline; border-radius: 3px` and no height/width issues
- [x] 5.4 Add dark-mode gray colour adjustment so the mask still fully conceals text on dark backgrounds
- [x] 5.5 Verify spoiler does not interfere with existing `details`/`summary` styles used by TOC

## 6. GFM Alert Output Styling

- [x] 6.1 Inspect HTML output of `remark-github-alerts` to identify emitted class names / attributes
- [x] 6.2 Add CSS targeting those class names inside `.app-prose`, reusing the same colour palette as directive callouts (so both syntaxes look identical)

## 7. Verification

- [x] 7.1 Add a sample MDX file (or update an existing test/demo post) with all five GFM alert types (`>[!NOTE/TIP/WARNING/CAUTION/IMPORTANT]`)
- [x] 7.2 Add directive-fence examples for all 14 callout types, including at least one with a custom title and one with a multi-paragraph body
- [x] 7.3 Add spoiler examples: one `:::spoiler` block (multi-paragraph), one `||inline spoiler||` mid-sentence
- [x] 7.4 Visually verify light mode — correct colours, icons, and layout
- [x] 7.5 Visually verify dark mode — no colour inversion or contrast issues
- [x] 7.6 Confirm existing blockquotes and TOC `details`/`summary` still render unchanged
