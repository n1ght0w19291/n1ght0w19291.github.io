## 1. Install Dependencies

- [x] 1.1 Install `@iconify/react` and `@iconify-json/devicon` packages

## 2. Icon Mapping

- [x] 2.1 Create a static `ICON_MAP` lookup table in `SkillsSection.jsx` mapping each skill name to its Devicon icon ID (e.g., `"React" → "devicon:react"`)
- [x] 2.2 Verify icon IDs exist in Devicon for all current skills: C, C++, Java, Python, JavaScript, TypeScript, React, Next.js, Vue.js, Astro, PHP, Docker, Git, GitHub, MySQL

## 3. Component Update

- [x] 3.1 Import `Icon` from `@iconify/react` in `SkillsSection.jsx`
- [x] 3.2 Update the skill badge `<span>` to render `Icon` (16×16 px) + label with 6 px gap when icon ID is found
- [x] 3.3 Ensure badges with no icon mapping fall back to text-only (no broken icon placeholder)

## 4. Verification

- [x] 4.1 Run dev server and visually verify all skill badges render their icons correctly
- [x] 4.2 Confirm text-only fallback renders cleanly for any unmapped skill
- [x] 4.3 Run `npm run build` to confirm no type errors or build failures
