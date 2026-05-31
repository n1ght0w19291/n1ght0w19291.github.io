## 1. Remove Component and Layout Usage

- [x] 1.1 Delete `src/components/EditPost.astro`
- [x] 1.2 Remove `import EditPost from "@/components/EditPost.astro"` from `src/layouts/PostDetails.astro`
- [x] 1.3 Remove `hideEditPost` from the destructured props in `PostDetails.astro`
- [x] 1.4 Remove the `<EditPost ... />` JSX block and its surrounding comment from `PostDetails.astro`

## 2. Remove Config and Schema Fields

- [x] 2.1 Remove the `editPost` block from `src/config.ts` (fields: `enabled`, `text`, `url`)
- [x] 2.2 Remove `hideEditPost` field from the blog collection schema in `src/content.config.ts`

## 3. Remove Environment Variable

- [x] 3.1 Remove the `PUBLIC_EDIT_POST_URL` env field declaration from `astro.config.ts`
- [x] 3.2 Remove the `PUBLIC_EDIT_POST_URL` entry (and its comment block) from `.env.example`

## 4. Verify

- [x] 4.1 Run `astro check` (or `tsc`) and confirm zero type errors
- [x] 4.2 Run `astro build` and confirm a clean build with no references to `EditPost` or `editPost`
