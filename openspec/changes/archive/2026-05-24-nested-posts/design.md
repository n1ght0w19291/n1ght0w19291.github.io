## Context

The blog uses Astro Content Collections with a glob loader (`**/[^_]*.{md,mdx}`) that loads all non-underscore-prefixed Markdown files from `src/data/blog/` into a single flat collection. `getSortedPosts` + `postFilter` drive the listing page. Tag pages gather tags from the same flat collection. There is no concept of post hierarchy today.

The user wants to group related sub-posts (e.g., individual picoCTF problem writeups) under a parent post, where sub-posts are hidden from the main listing but surfaced on tag pages.

## Goals / Non-Goals

**Goals:**
- Sub-posts discoverable via tag pages but excluded from main listing and RSS feed
- Parent post renders a children index (list of sub-posts)
- Sub-post URLs rooted under the parent: `/posts/<parent>/<sub>`
- Zero impact on existing flat posts
- Build-time static rendering throughout — no runtime cost

**Non-Goals:**
- Infinite nesting depth (one level only)
- Sub-posts appearing in the archives page or mixed-feed (`SITE.showGalleries`, etc.)
- Runtime or server-side filtering

## Decisions

### 1. Frontmatter field (`parentPost`) over directory convention

**Chosen:** Add optional `parentPost: string` to the blog schema.  
**Rejected:** Directory-based convention (parent = `index.md`, children = sibling files).

**Rationale:** A frontmatter field is explicit and queryable at collection parse time. Directory convention requires path-parsing heuristics (`getPath` already has edge-cases with `index` slugs). The field also allows the parent to live anywhere — flat or nested. Performance is identical since Astro resolves all frontmatter at build time.

### 2. Slug of parent stored in `parentPost`, not the full path

`parentPost: "picoctf-2024"` (just the final slug segment, not `posts/picoctf-2024`). This keeps frontmatter readable and matches the `id` that Astro assigns when files are at the root of `src/data/blog/`.

### 3. Separate dynamic route `[...slug]/` handles sub-post URLs

Current route `src/pages/posts/[...slug]/index.astro` already uses `getStaticPaths` and the `getPath` utility. Sub-posts whose `getPath` returns `/posts/<parent>/<sub>` will be captured by the existing catch-all `[...slug]` route — **no new route file needed**. The URL structure falls out naturally.

### 4. Filtering at utility layer, not page layer

`postFilter` gains an optional `{ excludeSubPosts?: boolean }` option (default `true`). This keeps all filtering logic co-located. Listing pages pass the default; tag pages pass `{ excludeSubPosts: false }`.

### 5. Parent-post child index rendered at layout level

`PostDetails.astro` checks whether the rendered post has children (passed as a prop from `getStaticPaths`). If so, it renders a sub-post list section. This avoids coupling the content MDX to routing logic.

### 6. Build-time child-post map computed once per `getStaticPaths` call

In `[...slug]/index.astro`, after loading the full collection, compute a `Map<parentSlug, ChildPost[]>` once. Each parent post receives its children array as a prop. Cost: O(n) with n = total posts — negligible.

## Risks / Trade-offs

- **RSS feed**: `src/pages/rss.xml.ts` queries `getCollection("blog")` directly. Must add `postFilter` with `excludeSubPosts: true` there too, else sub-posts leak into the feed. → Mitigate: include `rss.xml.ts` in implementation tasks.
- **Search page**: `search.astro` may index all posts. Must filter sub-posts from search index. → Mitigate: add to tasks.
- **Tag count on `/tags`**: Including sub-posts in tag counts increases counts, which may look surprising. The proposal says sub-posts are tag-discoverable, so counts should include them. This is intentional.
- **`parentPost` points to non-existent post**: No validation at build time by default. → Mitigate: add a build-time assertion in `getStaticPaths` that logs a warning if `parentPost` does not match any post id.

## Migration Plan

1. Schema change is additive (`parentPost` is optional) — existing posts unaffected.
2. `postFilter` change defaults to `excludeSubPosts: true` — existing behavior preserved.
3. No database migration needed; all data is in Markdown frontmatter.
4. Rollback: remove `parentPost` field from any sub-post frontmatter; revert schema and filter changes.

## Open Questions

- Should sub-posts appear in the **archives** page? (Current assumption: No)
- Should the parent post's `pubDatetime` auto-update to the latest child, or remain static? (Current assumption: static — author manages it)
