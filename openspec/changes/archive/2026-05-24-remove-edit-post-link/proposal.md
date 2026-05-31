## Why

This blog is hosted as a static site via GitHub Pages, where visitors cannot edit content directly. The "Edit this post" button links to the GitHub repository's edit page, which is only meaningful for repos that accept public contributions. For a personal blog deployment, the feature adds UI noise and dead configuration surface with no practical value.

## What Changes

- Remove the `EditPost.astro` component entirely
- Remove `editPost` config block from `src/config.ts`
- Remove the `PUBLIC_EDIT_POST_URL` env field from `astro.config.ts` and `.env.example`
- Remove the `hideEditPost` frontmatter field from the blog content schema (`src/content.config.ts`)
- Remove import and usage of `EditPost` from `src/layouts/PostDetails.astro`

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
<!-- none — this is a pure removal with no spec-level behavior changes -->

## Impact

- `src/components/EditPost.astro` — deleted
- `src/config.ts` — `editPost` block removed
- `astro.config.ts` — `PUBLIC_EDIT_POST_URL` env field removed
- `.env.example` — `PUBLIC_EDIT_POST_URL` entry removed
- `src/content.config.ts` — `hideEditPost` schema field removed
- `src/layouts/PostDetails.astro` — import and JSX usage removed
- Any existing post frontmatter using `hideEditPost: true/false` will have an unrecognised field (harmless, but can be cleaned up)
