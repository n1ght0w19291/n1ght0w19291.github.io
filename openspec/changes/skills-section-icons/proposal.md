## Why

The current `SkillsSection` component displays skills as plain text badges with no visual differentiation, making it harder for readers to quickly scan and recognize technologies. Adding recognizable icons alongside skill names improves scannability and visual appeal on the About/Resume page.

## What Changes

- Add technology icons to each skill badge in `SkillsSection.jsx`
- Integrate a suitable icon library (Devicons via CDN or `@iconify/react` package) to render per-skill SVG icons
- Update the badge layout to accommodate an icon + label pair

## Capabilities

### New Capabilities
- `skills-section-icons`: Render a technology icon alongside each skill label in the SkillsSection component badges

### Modified Capabilities
<!-- No existing spec-level behavior is changing -->

## Impact

- `src/components/misc/SkillsSection.jsx` — primary change
- `package.json` — may add `@iconify/react` or similar icon dependency
- No API or data-model changes; purely a UI enhancement
