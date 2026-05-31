## Why

The "Articles in this series" index on a parent post lists sub-posts by title only, giving readers no hint about the topic of each article before clicking. Adding the sub-post's own tags (minus the parent-series tag that every entry shares) lets readers quickly scan what each article covers.

## What Changes

- In `PostDetails.astro`, each child post row in the series list gains a set of tag chips rendered after the title.
- The chips show `child.data.tags` filtered to exclude any tag whose slugified value equals `child.data.parentPost` (the shared series tag that is redundant in this context).
- Styling mirrors the existing inline tag chips already used in the post header, keeping visual consistency.
- No schema changes, no new data loading — all required data (`child.data.tags`, `child.data.parentPost`) is already available in the `children` prop.

## Capabilities

### New Capabilities

<!-- No new top-level capabilities — this is a UI enhancement to an existing section. -->

### Modified Capabilities

- `post-nesting`: The "Parent post page renders a child post index" requirement gains a new scenario covering tag display on each child row.

## Impact

- `src/layouts/PostDetails.astro` — the only file that changes; update the series list template and add tag chip styles.
- No utility, config, schema, or route changes needed.
