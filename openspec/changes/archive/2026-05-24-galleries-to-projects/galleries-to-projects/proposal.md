## Why

The Galleries feature is no longer needed and adds maintenance overhead. Before removing it, its distinctive color scheme (purple/violet — which renders as a pink-toned violet in the current dark theme) should be adopted by Projects to give Projects a more expressive visual identity, replacing its current teal color.

## What Changes

- Migrate the Galleries color scheme (Tailwind `purple-500` / `#a855f7`) to the Projects feature, replacing the current teal (`#14b8a6`) color
- **BREAKING**: Remove the Galleries content collection, pages, components, config flags, and all related data
- Remove `showGalleries` and `showGalleriesInIndex` config flags from `src/config.ts`
- Remove Galleries from mixed feed, archive timeline, nav, and RSS feed

## Capabilities

### New Capabilities
- `project-color-migration`: Projects adopt the purple/violet color scheme previously used by Galleries — all teal references in `ProjectCard.astro`, `projects/index.astro`, and `Card.astro` are replaced with purple equivalents

### Modified Capabilities
- `project-card`: Color scheme changes from teal to purple (visual change, no behavior change)
- `project-collection`: No requirement change; teal → purple is cosmetic only
- `project-listing`: No requirement change; teal → purple is cosmetic only

## Impact

- **Removed files**: `src/pages/galleries/`, `src/components/GalleryCard.astro`, `src/components/GalleryEmbed.astro`, `src/assets/icons/IconGallery.svg`, `src/data/galleries/`
- **Modified files**: `src/config.ts`, `src/content.config.ts`, `src/components/Card.astro`, `src/components/ProjectCard.astro`, `src/pages/projects/index.astro`
- **Downstream**: Mixed feed, archive timeline, nav header, and RSS feed all reference galleries by collection name — each needs a galleries reference removed
- **No API changes**: This is a UI/content-layer change only
