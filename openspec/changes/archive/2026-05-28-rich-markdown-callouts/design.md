## Context

The blog uses Astro with MDX, Tailwind CSS (typography plugin), and a Shiki-powered code block pipeline. Markdown is processed via remark/rehype. Existing custom styles live in `src/styles/typography.css` inside the `.app-prose` layer. There are already two remark plugins wired in (`remark-toc`, `remark-collapse`).

Authors want to write callout blocks and spoiler (hidden-until-clicked) blocks in `.md` and `.mdx` files without dropping into raw HTML or custom Astro components every time.

## Goals / Non-Goals

**Goals:**
- Support GFM alert syntax (`> [!NOTE]` etc.) out of the box — matches GitHub preview and Obsidian-style writing habits
- Support directive fences (`:::note[Title]` … `:::`) for multi-paragraph callouts with optional custom titles
- Support a `:::spoiler[Optional Title]` directive that hides content until clicked to reveal
- All styles integrate with existing CSS tokens (`--accent`, `--foreground`, `--border`, `--muted`) and respect light/dark themes
- Works in both `.md` and `.mdx` files

**Non-Goals:**
- Custom callout types beyond the five standard ones (note/tip/warning/caution/important)
- Animated or interactive callout variants
- MDX-component-only solution (must work in plain `.md`)

## Decisions

### 1. GFM Alert Syntax — use `remark-github-alerts`

**Choice**: Add `remark-github-alerts` to the remark plugin chain.

**Rationale**: This package parses `> [!TYPE]` blockquotes (identical to GitHub's rendering) and wraps them in `<blockquote class="github-alert github-alert-note">` elements. Zero authoring friction — syntax is already familiar to anyone who writes on GitHub. The alternative (writing a custom remark plugin) would duplicate this well-maintained logic.

**Alternatives considered**:
- `rehype-callouts` — operates on the rehype (HTML) AST. Works, but runs after remark so it can't be composed as cleanly with directive syntax. Also doesn't add directive-fence support.
- Custom remark visitor — more control but more maintenance burden.

### 2. Directive Fences — use `remark-directive` + a small custom plugin

**Choice**: Add `remark-directive` to parse `:::type[title]` syntax, then a thin custom plugin (`src/plugins/remarkCallouts.ts`) that maps directive nodes to `<aside>` elements with `data-callout` and `data-callout-title` attributes.

**Rationale**: `remark-directive` handles the fence parsing generically; the custom plugin is only ~50 lines and gives full control over the HTML structure. This approach avoids pulling in a heavy opinionated library.

**Note**: The custom plugin also handles `:::spoiler` as a special case, emitting a `<div class="spoiler" data-spoiler="block">…</div>`. For inline `||text||` syntax, an additional remark plugin (`remarkInlineSpoiler`) transforms the `||…||` token into `<span class="spoiler" data-spoiler="inline">…</span>`.

**Alternatives considered**:
- Pure MDX components (`<Callout type="note">`) — forces authors to use MDX for every file and import the component. Too much friction.
- `rehype-directive` — not a stable package; `remark-directive` is the canonical choice per the unified ecosystem.

### 3. Styling — Tailwind inside `.app-prose`, not a separate CSS file

**Choice**: Add all callout and spoiler styles directly inside the `.app-prose` block in `src/styles/typography.css`.

**Rationale**: Keeps all prose-scoped overrides in one place. CSS tokens (`--accent`, `--foreground`, etc.) are already in scope. Dark mode is handled by the blog's `html[data-theme="dark"]` pattern, so we don't need extra Tailwind dark: variants.

Each callout type gets its own colour pair (icon + left border) mapped to semantic meaning:
- `note` → blue (`sky`)
- `tip` → green (`emerald`)
- `warning` → yellow (`amber`)
- `caution` → red (`rose`)
- `important` → purple (`violet`)

The colours are applied as opaque tints using `color-mix(in srgb, ...)` to stay within the existing pattern.

### 4. Icon delivery — inline SVG data URIs via CSS `::before`

**Choice**: Icons are rendered as CSS `::before` pseudo-elements using inline SVG `mask-image` data URIs, matching the pattern already used for `summary::before` in the TOC.

**Rationale**: No additional JS, no font loading, no component complexity. The existing pattern in `typography.css` proves this approach works in this codebase.

## Risks / Trade-offs

- **`remark-github-alerts` class names conflict with future Tailwind purge**: The plugin emits its own class names (`github-alert-*`). We style by targeting the `data-` attributes we add in the custom plugin, so this is a minor concern — but if the library changes its output, our CSS selectors may need updating.
  → Mitigation: Pin the package version; add a brief comment in the CSS.

- **Directive syntax not rendered in GitHub Markdown preview**: `:::note` fences show as literal code fences in GitHub's web UI.
  → Mitigation: GFM alert syntax (`> [!NOTE]`) does render on GitHub and is the recommended option for short callouts. Directive fences are opt-in for multi-paragraph use cases.

- **Order sensitivity of remark plugins**: `remark-directive` must run before the custom callout plugin. Wrong order → nodes not transformed.
  → Mitigation: Document plugin order clearly in `astro.config.ts` comments and tasks.

## Migration Plan

1. Install new packages (`remark-directive`, `remark-github-alerts`)
2. Register plugins in `astro.config.ts` (in correct order)
3. Add CSS rules to `src/styles/typography.css`
4. Write a custom remark plugin at `src/plugins/remarkCallouts.ts`
5. Test with a sample MDX/MD post; verify both syntaxes render in light and dark mode
6. No rollback needed — changes are additive; existing blockquotes are unaffected

### 5. Spoiler reveal mechanism — CSS + minimal inline JS, no `<details>`

**Choice**: Use a solid gray overlay (`background-color` on a `::after` pseudo-element or a wrapper with `color: transparent; background: gray`) toggled by a `data-revealed` attribute set via a small `<script>` inline click handler — or a single shared `src/scripts/spoiler.ts` loaded per page.

**Rationale**: The `<details>` element expands downward and shows an arrow toggle — it is not the right UX. The target effect is a gray rectangle covering text that disappears on click, identical to social-media spoiler tags. CSS alone can achieve the mask; a tiny event listener handles the reveal toggle.

**Alternatives considered**:
- `<details>/<summary>` — wrong UX; expands rather than unmasking
- `filter: blur()` — text still partially legible, not true concealment
- `color: transparent` + `user-select: none` on hidden state — simpler than overlay but still allows copy-paste of the hidden text; overlay approach is more honest visually
- Should the inline `||…||` syntax conflict with any existing remark plugin? → Needs a quick test; if so, an alternative delimiter (e.g., `{!!…!!}`) can be used.
- Should we expose the callout types through a TypeScript union for MDX component consumers? → Out of scope for this change; plain remark plugin approach covers all cases.
