### Requirement: PostDetails accepts siblings prop for scoped navigation

`PostDetails` layout SHALL accept an optional `siblings: CollectionEntry<"blog">[]` prop. When provided, the Prev/Next navigation MUST be computed from `siblings` instead of the full `posts` array. The `siblings` array is expected to be pre-sorted by `pubDatetime` ascending.

#### Scenario: Child post Prev/Next navigates within siblings

- **WHEN** `PostDetails` renders a child post with `siblings` prop containing the full list of sibling posts
- **THEN** `prevPost` is the sibling immediately before the current post in the array
- **THEN** `nextPost` is the sibling immediately after the current post in the array
- **THEN** no post outside the sibling array appears in Prev/Next

#### Scenario: First child post has no Prev

- **WHEN** `PostDetails` renders the first post in the `siblings` array
- **THEN** `prevPost` is `null` and the left nav slot renders an empty `<div>`

#### Scenario: Last child post has no Next

- **WHEN** `PostDetails` renders the last post in the `siblings` array
- **THEN** `nextPost` is `null` and the right nav slot is absent

#### Scenario: Non-child post uses global navigation

- **WHEN** `PostDetails` renders without a `siblings` prop
- **THEN** Prev/Next is computed from the full `posts` array as before

### Requirement: Slug page supplies siblings to child posts

`[...slug]/index.astro` MUST pass a `siblings` prop to `PostDetails` for child posts. The siblings array SHALL include all posts sharing the same `parentPost` value as the current post, sorted by `pubDatetime` ascending.

#### Scenario: Child post page provides correct siblings

- **WHEN** `getStaticPaths` generates the path for a child post
- **THEN** the `siblings` prop equals the full sorted children array of that parent (including the current post)

#### Scenario: Non-child post page omits siblings

- **WHEN** `getStaticPaths` generates the path for a post with no `parentPost`
- **THEN** the `siblings` prop is `undefined` or absent

### Requirement: Slug page supplies parentPost entry to child posts

`[...slug]/index.astro` MUST pass a `parentPost: CollectionEntry<"blog">` prop for child posts so the layout can render the parent-aware breadcrumb.

#### Scenario: Child post page provides parent entry

- **WHEN** `getStaticPaths` generates the path for a child post whose `parentPost` field matches a known post
- **THEN** the `parentPost` prop is the matching `CollectionEntry` object

#### Scenario: Non-child post page omits parentPost

- **WHEN** `getStaticPaths` generates the path for a post with no `parentPost`
- **THEN** the `parentPost` prop is `undefined` or absent
