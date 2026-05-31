## 1. Schema

- [x] 1.1 Add `ogImage: image().or(z.string()).optional()` to the `projects` collection schema in `src/content.config.ts`

## 2. OG Image Generation

- [x] 2.1 Add `generateOgImageForProject` function to `src/utils/generateOgImages.ts` — accepts `CollectionEntry<"projects">`, calls the satori post template with `SITE.author` as author fallback, returns PNG buffer
- [x] 2.2 Create `src/pages/projects/[project]/og.png.ts` — `getStaticPaths` filters to projects without `ogImage` and `SITE.dynamicOgImage === true`; `GET` handler calls `generateOgImageForProject` and returns `image/png`

## 3. Detail Page Wiring

- [x] 3.1 Update `src/pages/projects/[project].astro` to extract `ogImage` from `entry.data`
- [x] 3.2 Resolve `ogImageUrl`: if local asset use `.src`, if string use directly, if absent and `SITE.dynamicOgImage` use `/projects/[slug]/og.png`
- [x] 3.3 Pass resolved `ogImage` to `<Layout>` as the `ogImage` prop
