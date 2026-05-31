## Context

`PostDetails.astro` renders the "Articles in this series" section when `children.length > 0`. Each list item currently shows only a numbered link with the sub-post title. The component already imports `slugifyStr` and has access to the full `CollectionEntry<"blog">` for each child, including `child.data.tags` and `child.data.parentPost`.

Tag chips already exist in the post header and footer of `PostDetails.astro`, so there is a visual precedent to follow.

## Goals / Non-Goals

**Goals:**
- Show each sub-post's topic-specific tags inline after its title in the series list.
- Exclude the tag that represents the series itself (the parent post's slug) so redundant information is not repeated.
- Keep the visual style lightweight — chips should feel secondary to the title, not compete with it.

**Non-Goals:**
- Tags are not links in the series list (no navigation from the chips).
- No changes to data fetching, routing, or schemas.
- No changes to how tags appear anywhere outside the series section.

## Decisions

### Decision 1: Filter by `slugifyStr(tag) !== child.data.parentPost`

**Choice:** For each child, compute `child.data.tags.filter(tag => slugifyStr(tag) !== child.data.parentPost)` to get the chips to display.

**Rationale:** `child.data.parentPost` is already the slugified parent name (e.g. `"picoctf"`). `slugifyStr` normalises any tag to the same format. A simple string equality check is sufficient and avoids depending on the parent's own `data.tags` array.

**Alternative considered:** Compare against every tag of the parent post (`post.data.tags`). Rejected — this would hide tags that happen to appear on both the parent and a child, which is not the user's intent. The intent is only to hide the tag that names the series.

### Decision 2: Tags are right-aligned via `margin-left: auto` on the chip container

**Choice:** The `.sub-post-tags` container uses `margin-left: auto` (equivalent to Tailwind's `ml-auto`) so the chips are pushed flush to the right end of the `.sub-post-link` flex row. `justify-content: flex-end` is also set so chips wrap toward the right when the row wraps.

**Rationale:** The number + title already occupies the left side of the row. Right-aligning the tags keeps them visually separated from the title and lets readers scan two distinct pieces of information in the natural left-to-right order: *what* the article is → *what topics it covers*.

### Decision 3: Render chips as non-linking `<span>` elements

**Choice:** Render each chip as `<span class="sub-post-tag">` rather than `<a href="/tags/...">`.

**Rationale:** The series list is already inside an `<a>` (the row is a link to the sub-post). Nesting interactive anchors inside an anchor is invalid HTML. A `<span>` styled like a chip communicates the information without creating an accessibility violation.

**Alternative considered:** Place tags outside the `<a>`, as a sibling element. This would require restructuring the `<li>` from a single link to a flex container with a link + tag group. More markup change for marginal benefit — the chip-inside approach is simpler and still scannable.

### Decision 3: Conditionally render the tag group only when filtered tags exist

**Choice:** Only render the tag container when `childTags.length > 0`.

**Rationale:** Some sub-posts may have no tags beyond the series tag (or no tags at all). Rendering an empty container adds no value and clutters the DOM.

## Risks / Trade-offs

- **Inline `<span>` not interactive** — chips cannot be clicked to navigate to the tag page. Trade-off is HTML validity over interactivity; acceptable because the post footer already shows linked tags.
- **Long tag lists** — a sub-post with many tags could make rows visually heavy. Acceptable for now; can be capped with CSS if needed later.

## Migration Plan

Single-file change to `PostDetails.astro`:
1. In the `children.map(...)` block, compute filtered tags per child.
2. Conditionally render tag chips after `<span class="sub-post-title">`.
3. Add CSS class `sub-post-tag` for the chip appearance.

No build steps, no migrations.
