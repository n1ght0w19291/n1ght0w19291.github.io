## 1. Core Utility

- [x] 1.1 Update `src/utils/postFilter.ts`: change `if (data.draft) return false` to `if (data.draft && !import.meta.env.DEV) return false`

## 2. Static Route Filters

- [x] 2.1 Update `src/pages/posts/[...slug]/index.astro` `getStaticPaths`: change `!data.draft` to `!data.draft || import.meta.env.DEV`
- [x] 2.2 Update `src/pages/posts/[...slug]/index.png.ts` `getStaticPaths`: change `.filter(({ data }) => !data.draft && !data.ogImage)` to `.filter(({ data }) => (!data.draft || import.meta.env.DEV) && !data.ogImage)`
- [x] 2.3 Update `src/pages/galleries/[gallery].astro` `getStaticPaths`: change `!data.draft` to `!data.draft || import.meta.env.DEV`
- [x] 2.4 Update `src/pages/projects/[project].astro` `getStaticPaths`: change `!data.draft` to `!data.draft || import.meta.env.DEV`

## 3. Listing Page Consistency

- [x] 3.1 Update `src/pages/posts/[...page].astro` `getStaticPaths` filters to use `!data.draft || import.meta.env.DEV`
- [x] 3.2 Update `src/pages/galleries/index.astro` `getCollection` filter to use `!data.draft || import.meta.env.DEV`
- [x] 3.3 Update `src/pages/projects/index.astro` `getCollection` filter to use `!data.draft || import.meta.env.DEV`
- [x] 3.4 Update `src/pages/archives/index.astro` inline `!data.draft` filters to use `!data.draft || import.meta.env.DEV`

## 4. Verification

- [x] 4.1 Add `draft: true` to a test blog post and verify it is reachable at its URL in dev mode (`npm run dev`)
- [x] 4.2 Verify the same draft post does NOT appear in the post listing, homepage, or tags in dev mode (listing pages still show all, so confirm the item appears — if listings should also show drafts in dev, this is expected behavior)
- [x] 4.3 Run `npm run build` and confirm the draft post's URL is not in the generated output (returns 404)
- [x] 4.4 Remove the `draft: true` test frontmatter from the test post after verification
