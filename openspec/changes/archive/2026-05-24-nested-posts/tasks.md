## 1. Schema & Type Foundation

- [x] 1.1 Add optional `parentPost: z.string().optional()` field to the `blog` collection schema in `src/content.config.ts`
- [x] 1.2 Update the `ContentEntry` type in `src/utils/contentEntry.ts` to reflect that `blog` entries may have a `parentPost` field (add it to the discriminated union / inferred type if needed)

## 2. Post Filter Update

- [x] 2.1 Refactor `postFilter` in `src/utils/postFilter.ts` to accept an optional second argument `options: { excludeSubPosts?: boolean }` (default `true`)
- [x] 2.2 Inside `postFilter`, when `excludeSubPosts` is `true`, return `false` for any entry whose `data.parentPost` is set (blog entries only — guard with `"parentPost" in data`)
- [x] 2.3 Update `getSortedPosts` in `src/utils/getSortedPosts.ts` to accept and forward the same options object to `postFilter`
- [x] 2.4 Update `getPostsByTag` in `src/utils/getPostsByTag.ts` to call `getSortedPosts(posts, { excludeSubPosts: false })` so sub-posts are included in tag results

## 3. Static Path Generation & Child Map

- [x] 3.1 In `src/pages/posts/[...slug]/index.astro → getStaticPaths`, after loading all posts, build a `Map<string, CollectionEntry<"blog">[]>` mapping each parent slug to its sorted children (`parentPost === slug`, sorted by `pubDatetime` ascending)
- [x] 3.2 Emit a `console.warn` for any post whose `parentPost` value does not match any known post id (dangling reference check)
- [x] 3.3 Pass the children array as a `children` prop alongside each `post` prop in the `getStaticPaths` return value

## 4. PostDetails Layout — Children Section

- [x] 4.1 Update the `Props` type in `src/layouts/PostDetails.astro` to include `children?: CollectionEntry<"blog">[]`
- [x] 4.2 Destructure `children` from `Astro.props` in `PostDetails.astro`
- [x] 4.3 Render a children section after the post body: if `children` is non-empty, output a `<section>` with a heading (e.g., "Articles in this series") and an `<ol>` linking each child to its URL via `getPath`

## 5. Listing Page Exclusions

- [x] 5.1 Verify that `src/pages/posts/[...page].astro` (main listing) uses `getSortedPosts` with default options — sub-posts will be excluded automatically after task 2.3; confirm by tracing the call chain and add explicit `{ excludeSubPosts: true }` if the default is not obvious
- [x] 5.2 In `src/pages/archives/index.astro`, filter out sub-posts from the `blogPosts` array before passing it to `getPostsByGroupCondition` (add `filter(p => !p.data.parentPost)` or use `postFilter` with default options)
- [x] 5.3 In `src/pages/rss.xml.ts`, confirm `getSortedPosts` is called on the combined array — sub-posts will be excluded via the updated `postFilter`; add explicit option if default is not clear

## 6. Tag Page Inclusion

- [x] 6.1 In `src/pages/tags/index.astro`, pass the full `blogPosts` array (including sub-posts) to `getUniqueTags` and `getPostsByTag` so sub-post tags are counted — update the `getUniqueTags` call to use `postFilter` with `excludeSubPosts: false` inside, or simply pass the unfiltered collection
- [x] 6.2 Confirm `src/pages/tags/[tag]/[...page].astro` uses `getPostsByTag` — which after task 2.4 already includes sub-posts; no code change needed beyond verifying the data flow

## 7. Search (Pagefind) Exclusion

- [x] 7.1 In `src/layouts/PostDetails.astro`, add `data-pagefind-ignore="all"` to the root element (or the `<main>` content wrapper) when the rendered post is a sub-post (i.e., `post.data.parentPost` is set), so pagefind skips indexing it

## 8. Verification & Example Content

- [x] 8.1 Create a sample parent post `src/data/blog/picoctf-2024.md` with standard frontmatter and no `parentPost` field
- [x] 8.2 Create two sample sub-posts `src/data/blog/picoctf-2024/rsa-starter.md` and `src/data/blog/picoctf-2024/caesar-cipher.md` with `parentPost: "picoctf-2024"` and respective tags
- [x] 8.3 Run `pnpm build` (or `pnpm dev`) and verify: parent post appears in `/posts`, sub-posts do not appear in `/posts`, sub-posts appear on `/tags/picoctf`, parent post shows child list, no build warnings for dangling references
