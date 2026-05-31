## REMOVED Requirements

### Requirement: Edit post link displayed on blog posts
The post detail page SHALL render an "Edit this post" anchor that links to the repository's web editor for the current post file, using `PUBLIC_EDIT_POST_URL` as the base URL.

**Reason**: The site is deployed as a static GitHub Pages personal blog. Visitors cannot edit posts, making the link non-functional and the associated config/env variable dead weight.
**Migration**: No migration needed. Remove the `hideEditPost` frontmatter field from any posts that declare it; the field is now unrecognised and ignored by Zod.

#### Scenario: Edit link rendered when enabled
- **WHEN** `SITE.editPost.enabled` is `true` and `hideEditPost` is not set on the post
- **THEN** an anchor pointing to `PUBLIC_EDIT_POST_URL + post.filePath` SHALL appear in the post layout

#### Scenario: Edit link suppressed per-post
- **WHEN** a post's frontmatter sets `hideEditPost: true`
- **THEN** the edit link SHALL not be rendered regardless of the global enabled flag

### Requirement: Per-post hideEditPost frontmatter field
Blog posts SHALL accept an optional `hideEditPost` boolean in their frontmatter to suppress the edit link on a per-post basis.

**Reason**: Removed together with the edit link feature it controls.
**Migration**: Delete `hideEditPost` entries from post frontmatter files; the field is no longer part of the content schema.

#### Scenario: Field accepted in frontmatter
- **WHEN** a post declares `hideEditPost: true` in its frontmatter
- **THEN** the content schema SHALL accept it without a validation error

### Requirement: PUBLIC_EDIT_POST_URL environment variable
The application SHALL expose a `PUBLIC_EDIT_POST_URL` env variable validated via `astro:env` for use by the edit post component.

**Reason**: The consuming component is removed; the env variable serves no purpose.
**Migration**: Remove `PUBLIC_EDIT_POST_URL` from `.env` and `.env.example` if present.

#### Scenario: Build succeeds without env variable set
- **WHEN** `PUBLIC_EDIT_POST_URL` is not set in the environment
- **THEN** the application SHALL still build successfully (field was optional)
