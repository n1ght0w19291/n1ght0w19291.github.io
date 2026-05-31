## Context

`SkillsSection.jsx` is a React component rendered on the About/Resume page. It currently renders skill categories as a two-column grid, with text-only pill badges per skill. The project already uses React 19, Tailwind CSS 4, and ships with `@astrojs/react`. There is no icon library currently installed.

## Goals / Non-Goals

**Goals:**
- Add a recognizable SVG icon to each skill badge
- Keep the existing badge layout intact (just add icon + label side-by-side)
- Gracefully handle skills that have no matching icon (fall back to text-only badge)

**Non-Goals:**
- Redesigning the overall layout or typography of SkillsSection
- Adding animations, tooltips, or links to skills
- Sourcing icons for every possible future skill (only current list covered)

## Decisions

### Icon library: `@iconify/react` + `@iconify-json/devicon`

**Choice:** Install `@iconify/react` with the `@iconify-json/devicon` icon set.

**Rationale:**
- Devicons covers virtually every technology in the current skills list
- `@iconify/react` bundles only the icons actually used (tree-shaking friendly)
- Works fully offline / at build time — no CDN dependency or FOIC risk
- Consistent icon style (colored SVG with brand colors) across all skills
- Alternative considered: manual SVG imports — rejected due to maintenance overhead as the skill list grows

### Icon mapping: static lookup table in component

Each skill name is mapped to a Devicon icon ID (e.g., `"React" → "devicon:react"`) inside the component file. Unknown skills render without an icon.

**Rationale:** Simple, explicit, easily extensible. No auto-resolution magic that could silently break.

### Badge layout: icon left of label, 16 px icon

```
[ 🐍 Python ]  [ ⚛ React ]  [ 🐳 Docker ]
```
Icon size: `16px × 16px`, `gap: 6px` between icon and text. No other layout changes.

## Risks / Trade-offs

- **Bundle size increase** — `@iconify-json/devicon` is ~1 MB of JSON, but only used icons are bundled via tree-shaking → negligible runtime impact. [Risk] dependency footprint → Mitigation: use `@iconify/react` offline bundle mode, never load from CDN.
- **Missing icons** — some niche skills may not have a Devicon entry → Mitigation: graceful fallback to text-only badge, icon mapping defaults to `undefined`.
- **Icon color on dark/light themes** — Devicon colored icons render brand colors which may clash in some themes → Mitigation: use colored variants as-is; can switch to plain/mono variants per theme in a follow-up if needed.
