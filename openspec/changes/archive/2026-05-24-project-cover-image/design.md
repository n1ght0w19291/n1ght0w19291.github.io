## Context

Blog posts resolve their OG image through a three-tier cascade in `PostDetails.astro`:
1. Custom `ogImage` from frontmatter (local asset or remote URL string)
2. Satori-generated image at `posts/[slug]/index.png` when `SITE.dynamicOgImage` is enabled
3. Site-wide fallback `/og.png`

Project pages currently skip steps 1 and 2 entirely — `[project].astro` passes no `ogImage` to `<Layout>`, so all projects share the site-wide OG image. The satori pipeline (`generateOgImages.ts` / `loadGoogleFont.ts`) already exists and supports CJK fonts.

## Goals / Non-Goals

**Goals:**
- Mirror the blog post OG cascade for project pages
- Allow per-project custom image via `ogImage` frontmatter (local path or remote URL)
- Generate a satori text-based image for projects without a custom OG image
- No change required to existing project frontmatter (field is optional)

**Non-Goals:**
- Changing the OG template design (reuses existing satori post template)
- Adding OG image support to the project listing page `/projects`
- Modifying `coverImage` (page display image — separate concern from OG)

## Decisions

### Reuse `generateOgImageForPost` for project OG generation

The satori post template renders `post.data.title` and `post.data.author`. Project entries have `title` but no `author`. Rather than duplicating the template, `generateOgImageForProject` will coerce a project entry to the shape the template expects by supplying `SITE.author` as the author fallback. This avoids a separate template file and keeps both visually consistent.

**Alternative considered:** Create a dedicated project OG template. Rejected — adds a second template to maintain for minimal visual distinction.

### Field name `ogImage` (not `image`)

The blog collection uses `ogImage` for this purpose. Using the same name keeps the two collections parallel and makes resolution logic reusable. The YAML key will be `ogImage:`.

### Route structure `src/pages/projects/[project]/og.png.ts`

Blog uses `src/pages/posts/[...slug]/index.png.ts`. Projects use a simpler single-segment slug (`[project]`), so the route becomes `src/pages/projects/[project]/og.png.ts`. The generated URL will be `/projects/[slug]/og.png`.

### Slug derivation in the new route

The existing `getProjectSlug(project.id)` utility (used in `[project].astro`) is the correct way to get the URL-safe slug from a collection entry ID. The new `.png.ts` route must use the same utility to ensure URL consistency.

## Risks / Trade-offs

- **OTF font load on every build** — `loadGoogleFont.ts` now loads `gen-sen-rounded-tw.otf` (a full CJK font). Build time increases proportionally with the number of projects that need satori-generated images. Mitigation: acceptable for a personal blog; subset the font later if build time becomes a problem.
- **`generateOgImageForPost` type coupling** — coercing project entries to `CollectionEntry<"blog">` shape (for the author field) is a type lie. Mitigation: the coercion is isolated in `generateOgImages.ts`; use a proper project template in a future refactor if the templates diverge.

## Migration Plan

No data migration needed. `ogImage` is optional — existing project files work without changes. Deployment is a standard build-and-push.
