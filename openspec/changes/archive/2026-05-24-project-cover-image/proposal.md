## Why

Project pages currently fall back to the site-wide `/og.png` for all social sharing metadata — there is no per-project OG image. Blog posts already support custom `ogImage` frontmatter with a satori-generated text fallback; projects should have the same capability.

## What Changes

- Add an `ogImage` field to the `projects` content collection schema (accepts a local image path or a remote URL string, optional).
- Add a new dynamic route `src/pages/projects/[project]/og.png.ts` that generates a satori text-based OG image for projects that do **not** specify their own `ogImage`.
- Update `src/pages/projects/[project].astro` to resolve the OG image (custom → satori-generated → site fallback) and pass it to `<Layout>`.
- Add `generateOgImageForProject` to `src/utils/generateOgImages.ts`.

## Capabilities

### New Capabilities
- `project-og-image`: Per-project OG image support — custom `ogImage` frontmatter field, satori text-based fallback generation, and correct `<meta>` wiring on the detail page.

### Modified Capabilities
- `project-detail`: The detail page now resolves and passes an `ogImage` prop to `<Layout>` (new metadata behavior on existing page).

## Impact

- **`src/content.config.ts`** — projects schema gets `ogImage` field.
- **`src/pages/projects/[project].astro`** — OG image resolution logic added.
- **`src/pages/projects/[project]/og.png.ts`** — new file (dynamic route).
- **`src/utils/generateOgImages.ts`** — new `generateOgImageForProject` export.
- No breaking changes; `ogImage` is optional and existing project frontmatter requires no changes.
