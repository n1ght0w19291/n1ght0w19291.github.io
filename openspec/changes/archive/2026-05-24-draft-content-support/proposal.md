## Why

Authors need to save work-in-progress articles, galleries, and projects without them appearing on the published site. The `draft` frontmatter field already exists in all three content schemas, but its behavior is inconsistent: production filtering is largely in place, yet dev mode also hides drafts — meaning authors cannot preview draft content while writing.

## What Changes

- Formalize `draft: true` as the canonical way to mark any content (blog post, gallery, project) as hidden in production builds.
- Make draft content **visible in dev mode** (`npm run dev`) so authors can preview and iterate before publishing.
- Ensure `postFilter` — and every `getStaticPaths` / `getCollection` call that bypasses it — consistently applies the rule: hide drafts in production, show drafts in dev.
- No new frontmatter fields are introduced; `draft: boolean (optional, defaults to false)` is the single source of truth.

## Capabilities

### New Capabilities

- `draft-content`: Defines the full lifecycle of draft content — how `draft: true` in frontmatter suppresses a piece of content from all production surfaces (routes, listing pages, feeds, OG images, tag counts) while keeping it accessible in dev mode for authoring.

### Modified Capabilities

<!-- No existing spec-level requirements change; this change adds the missing spec. -->

## Impact

- `src/utils/postFilter.ts` — Change `if (data.draft) return false` to respect `import.meta.env.DEV`.
- `src/pages/posts/[...slug]/index.astro` — `getStaticPaths` inline filter must respect dev mode.
- `src/pages/galleries/[gallery].astro` — same inline filter.
- `src/pages/projects/[project].astro` — same inline filter.
- `src/pages/posts/[...slug]/index.png.ts` — OG image `getStaticPaths` inline filter.
- All three `getCollection` call sites that inline `!data.draft` need to be updated to `!(data.draft && !import.meta.env.DEV)` or extracted to a shared helper.
- No breaking changes to the frontmatter API; content that already omits `draft` is unaffected.
