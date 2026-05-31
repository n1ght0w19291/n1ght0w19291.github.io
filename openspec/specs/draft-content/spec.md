### Requirement: Draft frontmatter field
Every content type (blog post, gallery, project) MAY include a `draft` boolean field in its frontmatter YAML. When omitted, the content SHALL be treated as published (`draft: false`). Setting `draft: true` marks the content as a work-in-progress that SHALL NOT appear on the production site in any form.

#### Scenario: Post with draft true is hidden in production
- **WHEN** a blog post has `draft: true` in its frontmatter
- **THEN** no static route is generated for that post in a production build
- **THEN** visiting the post's URL returns a 404 response

#### Scenario: Post without draft field is published
- **WHEN** a blog post omits the `draft` field entirely
- **THEN** the post is treated as published and its route is generated normally

#### Scenario: Post with draft false is published
- **WHEN** a blog post has `draft: false` in its frontmatter
- **THEN** the post is treated as published and its route is generated normally

### Requirement: Draft content excluded from all listing surfaces
Content with `draft: true` SHALL be excluded from every surface that enumerates or counts content, including but not limited to: post listing pages, the homepage mixed feed, galleries index, projects index, archives, RSS feed, tag pages, tag counts, and OG images.

#### Scenario: Draft post absent from post listing
- **WHEN** a blog post has `draft: true`
- **THEN** it does not appear on `/posts/` or any paginated posts page

#### Scenario: Draft gallery absent from galleries index
- **WHEN** a gallery has `draft: true`
- **THEN** it does not appear on `/galleries/`

#### Scenario: Draft project absent from projects index
- **WHEN** a project has `draft: true`
- **THEN** it does not appear on `/projects/`

#### Scenario: Draft content absent from RSS feed
- **WHEN** any content item has `draft: true`
- **THEN** it is not included in `/rss.xml`

#### Scenario: Draft content tags are not exposed
- **WHEN** a content item has `draft: true` and tags unique to that item
- **THEN** those tags do not appear on `/tags/` and have no generated tag pages

#### Scenario: Draft content absent from homepage
- **WHEN** any content item has `draft: true`
- **THEN** it does not appear in the homepage mixed feed or featured posts section

### Requirement: Draft content visible in dev mode
When running the Astro dev server (`import.meta.env.DEV === true`), content with `draft: true` SHALL be accessible — its route is generated and the content appears in listings — so authors can preview and iterate on drafts before publishing.

#### Scenario: Draft post accessible on dev server
- **WHEN** a blog post has `draft: true`
- **AND** the site is running in dev mode (`npm run dev`)
- **THEN** the post's route is reachable and renders normally

#### Scenario: Draft post appears in listings on dev server
- **WHEN** a blog post has `draft: true`
- **AND** the site is running in dev mode
- **THEN** the post appears in the post listing at `/posts/`

#### Scenario: Draft gallery accessible on dev server
- **WHEN** a gallery has `draft: true`
- **AND** the site is running in dev mode
- **THEN** the gallery's route is reachable and renders normally

#### Scenario: Draft project accessible on dev server
- **WHEN** a project has `draft: true`
- **AND** the site is running in dev mode
- **THEN** the project's route is reachable and renders normally

### Requirement: Draft rule applied consistently via postFilter
The rule "hide if draft AND in production" SHALL be enforced in a single location (`postFilter`) and all `getStaticPaths` inline filters SHALL use the same condition (`!data.draft || import.meta.env.DEV`), so that a future change to draft visibility logic requires editing only one utility.

#### Scenario: postFilter hides drafts in production
- **WHEN** `postFilter` is called on an entry with `draft: true`
- **AND** `import.meta.env.DEV` is `false`
- **THEN** `postFilter` returns `false` (entry excluded)

#### Scenario: postFilter shows drafts in dev
- **WHEN** `postFilter` is called on an entry with `draft: true`
- **AND** `import.meta.env.DEV` is `true`
- **THEN** `postFilter` does NOT return `false` due to the draft field alone
