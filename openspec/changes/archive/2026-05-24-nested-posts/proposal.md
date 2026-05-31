## Why

The blog currently only supports a flat list of posts, making it impossible to group related content under a parent post. This is needed to organize practice series (e.g., picoCTF problem writeups) where each problem is its own post but belongs to a larger set — without polluting the main post listing.

## What Changes

- Add support for **sub-posts**: posts that live inside a parent post directory
- Sub-posts are excluded from the main `/posts` listing
- Sub-posts remain discoverable via tag pages (`/tags/<tag>`)
- Parent posts display an index of their sub-posts
- URLs for sub-posts follow the pattern `/posts/<parent-slug>/<sub-slug>`
- No changes to existing flat posts — fully backward-compatible

## Capabilities

### New Capabilities

- `post-nesting`: Parent-child post relationship — directory-based content structure, slug conventions, schema additions (`parentSlug`, `isSubPost` fields), and URL routing for sub-posts
- `sub-post-visibility`: Visibility rules — sub-posts excluded from main listing and RSS feed, but included in tag index pages; parent post renders a child post list section

### Modified Capabilities

- `mixed-feed`: The mixed feed query must be updated to filter out sub-posts from top-level listing results

## Impact

- `src/content.config.ts`: Blog collection schema gains optional `parentSlug` field
- `src/pages/posts/`: New dynamic route `[parent]/[slug].astro` for sub-post pages
- `src/pages/tags/[tag]/`: Tag listing queries must include sub-posts
- `src/utils/`: Post filtering utilities updated to separate top-level vs sub-posts
- `src/pages/posts/[...slug]/`: Parent post page updated to render sub-post index
- No breaking changes to existing flat post structure
