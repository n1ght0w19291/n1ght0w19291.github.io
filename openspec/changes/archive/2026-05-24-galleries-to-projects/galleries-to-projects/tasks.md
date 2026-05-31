## 1. Pre-flight Audit

- [x] 1.1 Grep all MDX/MD data files for `<GalleryEmbed` usage and note any occurrences that need to be removed or replaced before deletion

## 2. Color Migration — Projects Adopt Purple

- [x] 2.1 In `src/components/Card.astro`, change the `projects` collection color branch from teal classes to purple classes (mirror the existing gallery branch values)
- [x] 2.2 In `src/components/ProjectCard.astro`, replace all `teal-*` Tailwind classes with `purple-*` equivalents (e.g., `teal-500` → `purple-500`, `teal-400` → `purple-400`)
- [x] 2.3 In `src/pages/projects/index.astro`, replace all hardcoded `#14b8a6` color values inside `color-mix(...)` with `#a855f7` (purple-500)

## 3. Remove Galleries from Config and Content

- [x] 3.1 In `src/config.ts`, remove `showGalleries` and `showGalleriesInIndex` flags (and any related exported values)
- [x] 3.2 In `src/content.config.ts`, remove the `galleries` collection definition

## 4. Remove Galleries from Shared UI

- [x] 4.1 In `src/components/Card.astro`, remove the `galleries` collection color branch entirely (it was already migrated to `projects` in step 2.1)
- [x] 4.2 In `src/components/Header.astro`, remove any Galleries nav link and `IconGallery` import
- [x] 4.3 In `src/components/MobileMenu.astro`, remove any Galleries nav entry
- [x] 4.4 In `src/utils/contentEntry.ts`, remove any galleries collection references
- [x] 4.5 In `src/pages/archives/index.astro`, remove galleries collection from archive timeline
- [x] 4.6 In `src/pages/index.astro`, remove galleries from mixed feed query and rendering
- [x] 4.7 In `src/pages/posts/[...page].astro`, remove galleries from feed
- [x] 4.8 In `src/pages/tags/index.astro`, remove galleries collection from tag aggregation
- [x] 4.9 In `src/pages/tags/[tag]/[...page].astro`, remove galleries from tag feed
- [x] 4.10 In `src/pages/tags/[tag]/og.png.ts`, remove galleries collection reference
- [x] 4.11 In `src/pages/rss.xml.ts`, remove galleries from RSS feed
- [x] 4.12 In `src/layouts/PostDetails.astro`, remove any galleries reference
- [x] 4.13 In `src/pages/projects/[project]/index.astro`, remove any GalleryEmbed import if present

## 5. Delete Galleries Files

- [x] 5.1 Delete `src/pages/galleries/` directory (index.astro and [gallery].astro)
- [x] 5.2 Delete `src/components/GalleryCard.astro`
- [x] 5.3 Delete `src/components/GalleryEmbed.astro`
- [x] 5.4 Delete `src/assets/icons/IconGallery.svg`
- [x] 5.5 Delete `src/data/galleries/` directory and all gallery content

## 6. Verification

- [x] 6.1 Run `npm run build` (or `astro build`) and confirm no TypeScript or build errors
- [ ] 6.2 Start dev server and verify `/projects` listing page renders with purple color scheme
- [ ] 6.3 Verify a project detail page renders correctly
- [ ] 6.4 Verify the mixed feed on homepage no longer shows gallery entries
- [ ] 6.5 Verify nav header has no broken galleries link
