## Why

The blog currently has a galleries feature for displaying photo collections, but there is no dedicated space to showcase personal software/design projects. Adding a projects section gives visitors a curated view of completed work with a cover image and a full write-up article per project.

## What Changes

- Add a new `projects` content collection backed by `src/data/project/` folders
- Each project folder contains one article file named identically to the folder (e.g., `day-off/day-off.md`) plus a cover image
- Add `/projects` listing page and `/projects/[slug]` detail page that renders the article
- Add `ProjectCard` component for the listing grid
- Add `showProjects` and `showProjectsInIndex` flags to `src/config.ts`
- Integrate projects into mixed feeds (home, archives, tags, RSS) behind the `showProjectsInIndex` flag
- Add a `Projects` nav link to the header (conditional on `showProjects`)
- **BREAKING**: The galleries feature is NOT removed — projects is a parallel, independent feature

## Capabilities

### New Capabilities

- `project-collection`: Content collection definition, schema (title, description, pubDatetime, coverImage, tags, draft), and slug resolution for projects stored in `src/data/project/`
- `project-listing`: `/projects` page listing all non-draft projects sorted by date with cover images
- `project-detail`: `/projects/[slug]` page that renders the project's `.md`/`.mdx` article with full MDX support
- `project-card`: `ProjectCard` Astro component used on the listing page
- `project-config`: `showProjects` and `showProjectsInIndex` flags in `src/config.ts` controlling visibility and mixed-feed inclusion
- `project-nav`: Conditional header nav link and mobile menu entry for projects
- `project-mixed-feed`: Integration of projects into home feed, archives, tags, and RSS behind the `showProjectsInIndex` flag

### Modified Capabilities

- `mixed-feed`: `ContentEntry` union type and shared sort/filter/tag utilities extended to include `CollectionEntry<"projects">`

## Impact

- **New files**: `src/data/project/` (data dir), `src/pages/projects/index.astro`, `src/pages/projects/[project].astro`, `src/components/ProjectCard.astro`
- **Modified files**: `src/content.config.ts`, `src/config.ts`, `src/utils/contentEntry.ts`, `src/utils/getSortedPosts.ts`, `src/utils/getUniqueTags.ts`, `src/utils/getPostsByTag.ts`, `src/utils/getPostsByGroupCondition.ts`, `src/components/Header.astro`, `src/components/MobileMenu.astro`, `src/components/Card.astro`, `src/pages/index.astro`, `src/pages/posts/[...page].astro`, `src/pages/archives/index.astro`, `src/pages/tags/index.astro`, `src/pages/tags/[tag]/[...page].astro`, `src/pages/rss.xml.ts`
- **No new dependencies**: Uses existing Astro content collections, `<Image />`, and MDX rendering pipeline
