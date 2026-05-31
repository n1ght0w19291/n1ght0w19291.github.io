## Context

The blog currently ships an `EditPost.astro` component that renders a link pointing to the GitHub edit page of each post file. The feature is guarded by `SITE.editPost.enabled` (from `src/config.ts`) and the per-post `hideEditPost` frontmatter field. Since this site is deployed exclusively via GitHub Pages as a personal blog, the link is never useful to visitors and the associated config, env variable, and schema field are dead weight.

## Goals / Non-Goals

**Goals:**
- Remove every surface area that belongs to the "Edit this post" feature: component, config, env variable, content schema field, and layout usage
- Leave no dangling references in compiled output

**Non-Goals:**
- Cleaning up `hideEditPost` values in existing post frontmatter (harmless unknown fields, out of scope)
- Any UI replacement or alternative contribution workflow

## Decisions

**Delete the component, don't just disable it.**  
Keeping `EditPost.astro` with `enabled: false` would leave dead code. Since this is a personal blog with no planned re-enable path, deletion is cleaner and removes the config surface entirely.

**Remove `hideEditPost` from the content schema.**  
It is tightly coupled to the removed component. Keeping it in the schema serves no purpose and would be misleading.

**Remove `PUBLIC_EDIT_POST_URL` from `astro.config.ts` env validation.**  
Without the component consuming it, the env field has no effect. Removing it avoids confusing future developers (or the author) who might set the variable expecting something to happen.

## Risks / Trade-offs

- Existing post frontmatter may still have `hideEditPost: true/false` → Zod will silently ignore unknown fields by default, so no build breakage. Can be cleaned up separately.
- If someone forks this repo and wants the feature back, they'll need to re-implement it → Acceptable; the feature is easy to restore and the git history retains the original implementation.

## Migration Plan

1. Delete `src/components/EditPost.astro`
2. Remove `editPost` block from `src/config.ts` (and the `SiteConfig` type if it is typed)
3. Remove `hideEditPost` from `src/content.config.ts` blog schema
4. Remove import and `<EditPost>` usage from `src/layouts/PostDetails.astro`, including the `hideEditPost` destructure
5. Remove `PUBLIC_EDIT_POST_URL` env field from `astro.config.ts`
6. Remove `PUBLIC_EDIT_POST_URL` from `.env.example`
7. Verify `astro build` passes with no type errors
