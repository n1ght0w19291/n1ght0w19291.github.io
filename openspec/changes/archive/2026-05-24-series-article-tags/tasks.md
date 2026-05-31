## 1. Template — Add tag chips to series list rows

- [x] 1.1 In `src/layouts/PostDetails.astro`, inside `children.map(...)`, compute filtered tags: `const childTags = child.data.tags.filter(tag => slugifyStr(tag) !== child.data.parentPost)`
- [x] 1.2 After `<span class="sub-post-title">`, conditionally render `{childTags.length > 0 && (<span class="sub-post-tags">{childTags.map(tag => <span class="sub-post-tag">{tag}</span>)}</span>)}`

## 2. Styling — sub-post-tag chip

- [x] 2.1 Add `.sub-post-tags` style: `display: flex; flex-wrap: wrap; gap: 0.25rem; align-items: center; justify-content: flex-end; margin-left: auto; flex-shrink: 0` — tags are pushed to the right end of the row
- [x] 2.2 Add `.sub-post-tag` style: small pill chip — font-firacode, ~10px, rounded-full, border border-border/25, bg-muted/10, px-2 py-0.5, muted text color, matching the existing tag chip aesthetic

## 3. Verification

- [x] 3.1 Open a parent post (e.g. `/posts/picoctf`) in the dev server and confirm each child row shows its topic tags as chips after the title
- [x] 3.2 Confirm the series tag (e.g. "picoCTF") is absent from the chips
- [x] 3.3 Confirm a sub-post with no non-series tags renders no chip container
- [x] 3.4 Run `npm run build` with no type errors
