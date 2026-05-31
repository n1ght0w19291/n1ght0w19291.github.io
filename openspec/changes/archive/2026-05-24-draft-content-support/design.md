## Context

All three content collections (`blog`, `galleries`, `projects`) already define `draft: z.boolean().optional()` in their Zod schemas. The majority of listing pages and `getStaticPaths` calls already inline `!data.draft` filters. The central filtering utility `postFilter.ts` — used by `getSortedPosts`, `getUniqueTags`, and `getPostsByTag` — also correctly short-circuits on `data.draft`.

The gap is that **all** draft checks are unconditional: they suppress content in both production builds and the Astro dev server. Authors cannot preview a draft post in the browser without temporarily removing `draft: true`.

Additionally, the filtering logic is scattered: some pages use `getCollection("blog", ({ data }) => !data.draft)` inline, while others rely on the `postFilter` utility. This inconsistency makes it harder to change the behavior in one place.

## Goals / Non-Goals

**Goals:**
- Draft content (`draft: true`) is never accessible in a production build — no static route is generated, no listing entry appears, no RSS item, no OG image, no tag association.
- Draft content IS accessible on the Astro dev server (`npm run dev`) so authors can preview work in progress.
- The rule lives in one place (`postFilter`) and is referenced everywhere, rather than duplicated inline.

**Non-Goals:**
- No password-protected or role-gated draft preview.
- No draft indicator UI in the browser.
- No `draft` field normalization (omitting `draft` continues to mean "not a draft").
- No changes to the frontmatter schema — `draft: boolean (optional)` stays as-is.

## Decisions

### Decision 1: Centralize the draft check in `postFilter`

**Choice:** Change `postFilter.ts` from `if (data.draft) return false` to `if (data.draft && !import.meta.env.DEV) return false`.

**Rationale:** `postFilter` is already the single source of truth for visibility logic (scheduled posts, sub-post exclusion). Keeping the draft rule there means listing pages, tag utilities, and RSS all get the dev-mode behavior for free without touching each file.

**Alternative considered:** Add a shared `isDraftHidden(data)` helper imported by each `getStaticPaths`. Rejected — this is more files to touch and leaves the utility out of sync with `postFilter`.

### Decision 2: Update `getStaticPaths` inline filters to respect dev mode

**Choice:** Replace `getCollection(…, ({ data }) => !data.draft)` with `getCollection(…, ({ data }) => !data.draft || import.meta.env.DEV)` in all `getStaticPaths` blocks.

**Rationale:** `getStaticPaths` bypasses `postFilter` — it calls `getCollection` directly to control which URL slugs are generated. If we don't update these, draft pages will remain unreachable in dev mode even after fixing `postFilter`.

Affected files:
- `src/pages/posts/[...slug]/index.astro`
- `src/pages/posts/[...slug]/index.png.ts`
- `src/pages/galleries/[gallery].astro`
- `src/pages/projects/[project].astro`

**Alternative considered:** Remove inline filters entirely and let `postFilter` decide. Rejected — `getStaticPaths` needs explicit filtering to generate the correct set of slugs; it can't delegate to `postFilter` without collecting and then re-filtering.

### Decision 3: OG image routes follow the same rule

**Choice:** `src/pages/posts/[...slug]/index.png.ts` already inlines `!data.draft`. Update to `!data.draft || import.meta.env.DEV`.

**Rationale:** In dev mode, visiting a draft post's page will request its OG image. If the OG route doesn't generate the path, Astro's dev server returns 404 for the image. Keeping the rule consistent avoids broken image errors.

### Decision 4: Archives page — no change needed

`src/pages/archives/index.astro` already inlines `!data.draft`. We update it to `!(data.draft && !import.meta.env.DEV)` for consistency, but it has the same semantic effect as decisions above.

## Risks / Trade-offs

- **Dev-prod parity**: Dev mode now shows more content than production. This is intentional and standard in blogging tools, but authors should be aware that a URL working in dev does not mean it will exist in production.
  → Mitigation: No action needed; this is the desired behavior. The distinction is well-established (Jekyll `--drafts` flag, Hugo draft mode, etc.).

- **`import.meta.env.DEV` in getStaticPaths**: In Astro's static build, `getStaticPaths` runs at build time where `import.meta.env.DEV` is `false`. In the dev server it is `true`. This is exactly the behavior we want, and Astro guarantees this distinction.
  → No mitigation needed.

- **Sparse draft discovery**: There is no way to list all drafts from the UI. Authors must know the slug to navigate to a draft.
  → Out of scope for this change.

## Migration Plan

1. Update `postFilter.ts` (one-line change).
2. Update the four `getStaticPaths` inline filters.
3. Update the archives page inline filter for consistency.
4. Smoke-test in dev mode: create a post with `draft: true` and verify it is reachable at its URL.
5. Run production build (`npm run build`) and verify the draft URL returns 404.

No database migrations, no deploy steps, no rollback complexity — this is a pure code change.

## Open Questions

- Should the Astro dev server also show a visual banner ("DRAFT") when viewing a draft post? Out of scope for this change but could be a follow-up.
