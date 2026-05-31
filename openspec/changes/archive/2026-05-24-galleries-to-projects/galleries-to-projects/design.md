## Context

The blog currently has two content types with distinct color identities: Galleries (purple/violet, `purple-500`) and Projects (teal, `#14b8a6`). Galleries is being removed entirely. The purple color scheme is visually distinctive and should be preserved by migrating it to Projects before the Galleries code is deleted.

Color references are spread across three files:
- `src/components/Card.astro` — shared card with per-collection color branches
- `src/components/ProjectCard.astro` — dedicated project card, hardcoded teal
- `src/pages/projects/index.astro` — listing page with inline `color-mix` teal values

Galleries references (beyond color) appear in: `src/config.ts`, `src/content.config.ts`, nav header, mixed feed components, archive timeline, and RSS feed.

## Goals / Non-Goals

**Goals:**
- Replace every teal reference in Projects UI with the purple equivalent
- Delete all Galleries code, config, and content data
- Leave the Projects feature fully functional with the new color, all existing behavior preserved

**Non-Goals:**
- Changing the Projects data model or routing
- Adding or removing any Projects feature capability
- Migrating gallery image data into Projects

## Decisions

**Decision 1 — Replace teal with purple, not a new color**
Rationale: Purple is already defined and tested in the design system via `Card.astro`. Reusing it avoids introducing a new color token and ensures visual consistency with the existing Tailwind palette. Considered adding a CSS variable for the project color, but that adds indirection without benefit for a single-color swap.

**Decision 2 — Do color migration first, then delete Galleries**
Rationale: If Galleries is deleted first, the purple color branch in `Card.astro` is removed along with it. Doing the color migration first means we can verify Projects look correct before any deletions.

**Decision 3 — Update `Card.astro` to map `projects` → purple instead of creating a separate branch**
In `Card.astro`, the gallery collection maps to purple and the project collection maps to teal. After this change, the project branch should use purple. The gallery branch is then removed as part of deletion.

**Decision 4 — Remove `showGalleriesInIndex` before `showGalleries`**
Safer to remove galleries from feeds first, then remove the pages/components, to avoid any render-time errors from components that might reference both flags together.

## Risks / Trade-offs

- **Risk**: Existing gallery content (`src/data/galleries/`) is permanently deleted → **Mitigation**: User should back up or commit data before deletion; data is in git history if needed
- **Risk**: `GalleryEmbed` component used inside MDX post files → **Mitigation**: Grep all MDX posts before deletion; remove or replace any `<GalleryEmbed />` usage first
- **Trade-off**: Purple is also used for tags/labels in some UI contexts — using it for Projects may feel overloaded → **Accepted**: The existing gallery already used purple; moving it to Projects does not increase the overlap

## Migration Plan

1. Audit all MDX files for `<GalleryEmbed />` usage; remove or comment out
2. Update `Card.astro`: change `projects` color branch from teal → purple
3. Update `ProjectCard.astro`: replace all `teal-*` classes and `#14b8a6` hex values with purple equivalents
4. Update `projects/index.astro`: replace all `#14b8a6` color-mix references with `#a855f7` (purple-500)
5. Remove Galleries from config flags, content collection, nav, mixed feed, archive, and RSS
6. Delete Galleries pages, components, icon, and data directory
7. Verify Projects listing, detail page, and mixed feed still render correctly
