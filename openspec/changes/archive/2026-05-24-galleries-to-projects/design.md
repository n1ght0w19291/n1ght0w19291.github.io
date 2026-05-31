## Context

The blog uses Astro content collections with a file-based data model. The galleries feature established a pattern: a folder under `src/data/galleries/` is one gallery, identified by an `index.md`/`index.mdx` metadata file. Images in the same folder are auto-discovered via `import.meta.glob`.

The projects feature follows a similar folder-per-entry convention but with a different file naming rule: the article file shares the folder name (e.g., `src/data/project/day-off/day-off.md`). This allows the article to carry its own MDX content and frontmatter while making the slug unambiguous from the filesystem path alone.

Existing utilities (`getSortedPosts`, `getUniqueTags`, `getPostsByTag`, `contentEntry.ts`) already support multiple collections via a union type — extending them to include projects is additive.

## Goals / Non-Goals

**Goals:**
- Add a `projects` content collection with its own listing and detail pages
- Allow each project to have a cover image (declared in frontmatter with Astro image schema)
- Render the project article as full MDX content on its detail page
- Integrate projects into mixed feeds behind an opt-in config flag
- Keep galleries completely untouched

**Non-Goals:**
- Replacing or migrating galleries to projects
- Multi-image/lightbox support on project pages
- Pagination on the `/projects` listing (not needed at this scale)
- Project categories or nested routing beyond flat slug

## Decisions

### 1. Article file named after folder, not `index.md`

**Decision:** The main content file is `<folder-name>/<folder-name>.md` (or `.mdx`), not `index.md`.

**Rationale:** The user specified this explicitly. It also avoids ambiguity when multiple collections use `index.md` — the slug derivation is cleaner (`id` splits on `/` and takes the last segment without extension).

**Alternative considered:** Reuse `index.md` convention from galleries — rejected because it requires the same slug-strip logic and makes folder purpose less obvious.

### 2. Cover image via frontmatter `coverImage`, not auto-discovered

**Decision:** The cover image is declared in frontmatter using Astro's `image()` schema helper, not discovered via glob.

**Rationale:** Projects have a single representative cover image, not a collection. Requiring explicit declaration keeps the schema strict and avoids scanning the folder for non-article files. The image is co-located in the same folder for convenience.

**Alternative considered:** Auto-discover the first non-article file — rejected because it creates implicit ordering rules and makes the schema unclear.

### 3. Glob pattern targets `<folder>/<folder>.{md,mdx}`

**Decision:** Content collection loader uses `glob({ pattern: "**/!(index).{md,mdx}" })` or more precisely a pattern that matches files where the filename matches the parent directory name.

**Actual approach:** Use `glob({ pattern: "**/*.{md,mdx}", base: "./src/data/project" })` and rely on the convention that each folder contains exactly one `.md`/`.mdx` file. Slug is derived from the folder name by stripping `/<filename>.{md,mdx}` from the `id`.

**Helper:** `getProjectSlug(id)` mirrors `getGallerySlug(id)` — strips the trailing filename to return the folder name.

### 4. Reuse `ContentEntry` union and shared utilities

**Decision:** Extend `ContentEntry = CollectionEntry<"blog"> | CollectionEntry<"galleries"> | CollectionEntry<"projects">` and update all shared utils to include the new collection.

**Rationale:** All existing mixed-feed pages already iterate over `ContentEntry[]`. Adding the third union member is the minimal change to get projects appearing in archives, tags, and RSS.

**Alternative considered:** Keep projects completely separate from mixed feeds — rejected because the user wants unified discoverability via tags.

### 5. `ProjectCard` is a new component, not a variant of `GalleryCard`

**Decision:** Create `src/components/ProjectCard.astro` as a standalone component.

**Rationale:** Projects and galleries have different data shapes (projects have a single `coverImage` field; galleries derive images from the folder). Sharing one component would require conditional branching that obscures both paths.

### 6. Config flags mirror the gallery pattern

**Decision:** Add `showProjects: boolean` and `showProjectsInIndex: boolean` to `SITE` in `src/config.ts`.

**Rationale:** Consistent with `showGalleries` / `showGalleriesInIndex`. Allows disabling the project section or keeping it separate from the main mixed feed independently.

## Risks / Trade-offs

- **Filename convention not enforced by schema** → Mitigation: Document the convention clearly; Astro will still collect any `.md`/`.mdx` in the folder, but the slug helper assumes one file per folder.
- **Glob collects files even if named differently** → Mitigation: If a folder has multiple `.md` files, both appear as separate entries. This is benign but unexpected. Accept for now; can add a build-time warning later.
- **Mixed-feed union type grows** → Trade-off: Each new collection type added to `ContentEntry` requires updating every call site that switches on `collection`. Currently manageable; would warrant a registry pattern if collections exceed 4-5.

## Migration Plan

1. Add `projects` collection to `src/content.config.ts` and `src/config.ts` (feature-flagged off by default)
2. Create `src/data/project/` with one sample project to validate the schema
3. Build listing and detail pages
4. Add `ProjectCard` component
5. Extend `ContentEntry` and shared utilities
6. Update header and mobile menu
7. Update all mixed-feed pages
8. Enable flags in config to verify end-to-end
9. No rollback complexity — all changes are additive; disabling `showProjects` restores prior behavior

## Open Questions

- Should project detail pages support `GalleryEmbed` MDX component (embed galleries inside project articles)? Assumed yes — register it the same way as in `PostDetails.astro`.
- Should projects appear in the `/posts/[...page].astro` paginated mixed feed or only on the home page and archives? Assumed: follow `showProjectsInIndex` flag consistently across all mixed-feed surfaces.
