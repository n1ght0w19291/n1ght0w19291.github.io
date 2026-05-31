## Why

Creating new blog posts requires manually writing YAML frontmatter, which is tedious and error-prone. A pair of CLI scripts (`new-md-post` / `new-mdx-post`) will scaffold correctly-formatted posts in seconds and match this project's exact content schema.

## What Changes

- Add `scripts/new-md-post.js` — scaffolds a `.md` post in `src/data/blog/` with all required frontmatter fields
- Add `scripts/new-mdx-post.js` — scaffolds a `.mdx` post in `src/data/blog/` with all required frontmatter fields plus an MDX comment placeholder
- Register `new-md-post` and `new-mdx-post` npm scripts in `package.json`
- Both scripts accept a filename argument, auto-append the correct extension if omitted, and refuse to overwrite an existing file

## Capabilities

### New Capabilities

- `new-md-post`: CLI script that creates a frontmatter-valid `.md` blog post under `src/data/blog/`
- `new-mdx-post`: CLI script that creates a frontmatter-valid `.mdx` blog post under `src/data/blog/`

### Modified Capabilities

<!-- none -->

## Impact

- `package.json`: two new `scripts` entries (`new-md-post`, `new-mdx-post`)
- `scripts/` directory (new): two new Node.js ESM scripts
- No changes to the Astro content schema or existing blog posts
- No new runtime dependencies required
