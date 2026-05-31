## 1. Create Scripts

- [x] 1.1 Create `scripts/new-md-post.js` — ESM Node.js script that scaffolds a `.md` post in `src/data/blog/` with valid frontmatter (title, description, pubDatetime, tags, draft)
- [x] 1.2 Create `scripts/new-mdx-post.js` — same as above but writes `.mdx` with an MDX comment placeholder in the body

## 2. Wire Up npm Scripts

- [x] 2.1 Add `"new-md-post": "node scripts/new-md-post.js"` to `package.json` scripts
- [x] 2.2 Add `"new-mdx-post": "node scripts/new-mdx-post.js"` to `package.json` scripts

## 3. Verify

- [x] 3.1 Run `pnpm new-md-post test-post` and confirm `src/data/blog/test-post.md` is created with correct frontmatter
- [x] 3.2 Run `pnpm new-mdx-post test-post-mdx` and confirm `src/data/blog/test-post-mdx.mdx` is created with correct frontmatter and MDX placeholder
- [x] 3.3 Confirm `pnpm dev` starts without errors and both test posts appear in the blog collection
- [x] 3.4 Delete the two test files after verification
