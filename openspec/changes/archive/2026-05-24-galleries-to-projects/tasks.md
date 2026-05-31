## 1. Foundation — Config & Collection

- [x] 1.1 Add `showProjects` and `showProjectsInIndex` boolean flags to `SITE` in `src/config.ts` (both default `true`)
- [x] 1.2 Define `projects` content collection in `src/content.config.ts` with glob loader targeting `src/data/project/**/*.{md,mdx}` and Zod schema (title, description, pubDatetime, coverImage, tags, draft)
- [x] 1.3 Create `src/data/project/` directory with a sample project folder (e.g., `src/data/project/hello-world/hello-world.md`) to validate the schema

## 2. Utilities

- [x] 2.1 Add `getProjectSlug(id: string): string` helper to `src/utils/contentEntry.ts` that strips `/<filename>.<ext>` from the entry id
- [x] 2.2 Add `isProjectEntry(entry)` predicate to `src/utils/contentEntry.ts`
- [x] 2.3 Extend `ContentEntry` union type in `src/utils/contentEntry.ts` to include `CollectionEntry<"projects">`
- [x] 2.4 Update `getEntryPath` in `src/utils/contentEntry.ts` to return `/projects/<slug>` for project entries
- [x] 2.5 Update `getSortedPosts.ts` to accept and handle project entries
- [x] 2.6 Update `getUniqueTags.ts` to include project tags
- [x] 2.7 Update `getPostsByTag.ts` to filter project entries
- [x] 2.8 Update `getPostsByGroupCondition.ts` to include project entries

## 3. Components

- [x] 3.1 Add a project icon SVG at `src/assets/icons/IconProject.svg` (or reuse an existing icon)
- [x] 3.2 Create `src/components/ProjectCard.astro` with props `project: CollectionEntry<"projects">` and `slug: string`; display cover image (with fallback), title linked to `/projects/<slug>`, formatted date, and description
- [x] 3.3 Update `src/components/Card.astro` to handle `collection === "projects"` — add project badge, resolve cover image from `coverImage` frontmatter, and link to `/projects/<slug>`

## 4. Pages

- [x] 4.1 Create `src/pages/projects/index.astro` — fetch all non-draft projects, sort by date, render with `ProjectCard` grid; redirect to 404 if `SITE.showProjects` is false
- [x] 4.2 Create `src/pages/projects/[project].astro` — generate static paths from all non-draft projects, render article with `<Content />`, display cover image and metadata header; pass `GalleryEmbed` as MDX component

## 5. Navigation

- [x] 5.1 Add conditional Projects nav link to `src/components/Header.astro` (visible only when `SITE.showProjects` is true)
- [x] 5.2 Add conditional Projects entry to `src/components/MobileMenu.astro`

## 6. Mixed Feed Integration

- [x] 6.1 Update `src/pages/index.astro` to fetch and merge project entries when `SITE.showProjects && SITE.showProjectsInIndex`
- [x] 6.2 Update `src/pages/posts/[...page].astro` to include projects in paginated feed
- [x] 6.3 Update `src/pages/archives/index.astro` to include project entries in the timeline
- [x] 6.4 Update `src/pages/tags/index.astro` to include project tags in the tag cloud
- [x] 6.5 Update `src/pages/tags/[tag]/[...page].astro` to include project entries in tag results
- [x] 6.6 Update `src/pages/rss.xml.ts` to include project entries in the RSS feed

## 7. Verification

- [x] 7.1 Run `pnpm build` (or `astro build`) and confirm zero type errors and no broken static paths
- [x] 7.2 Start dev server and verify `/projects` listing page renders with sample project
- [x] 7.3 Verify `/projects/hello-world` detail page renders the article content
- [x] 7.4 Verify project appears in home feed, archives, and tag pages when `showProjectsInIndex: true`
- [x] 7.5 Verify project is hidden from feeds when `showProjectsInIndex: false`
- [x] 7.6 Verify nav link appears/disappears correctly with `showProjects` flag
