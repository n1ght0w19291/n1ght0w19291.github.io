### Requirement: postFilter supports excludeSubPosts option
`src/utils/postFilter.ts` SHALL accept an optional options object `{ excludeSubPosts?: boolean }`. When `excludeSubPosts` is `true` (default), any entry with a `parentPost` field SHALL be excluded.

#### Scenario: Default behavior excludes sub-posts
- **WHEN** `postFilter` is called with no options and an entry has `parentPost` set
- **THEN** the filter returns `false` for that entry

#### Scenario: excludeSubPosts false includes sub-posts
- **WHEN** `postFilter` is called with `{ excludeSubPosts: false }` and an entry has `parentPost` set
- **THEN** the filter returns `true` (subject to draft/publish-time rules)

#### Scenario: Top-level posts unaffected
- **WHEN** an entry has no `parentPost` field
- **THEN** `postFilter` behaviour is identical to before this change

### Requirement: Main post listing excludes sub-posts
The posts listing page (`/posts`) and pagination SHALL not include sub-posts.

#### Scenario: Sub-post absent from listing
- **WHEN** the posts listing page is rendered
- **THEN** entries with `parentPost` set are not present in the rendered list

### Requirement: Tag pages include sub-posts
Tag pages (`/tags/<tag>`) SHALL include sub-posts that carry the matching tag.

#### Scenario: Sub-post appears on its tag page
- **WHEN** a sub-post has `tags: ["picoctf", "crypto"]`
- **THEN** it appears on both `/tags/picoctf` and `/tags/crypto`

#### Scenario: Tag count includes sub-posts
- **WHEN** the `/tags` index page computes tag counts
- **THEN** sub-posts with that tag are counted

### Requirement: RSS feed excludes sub-posts
`src/pages/rss.xml.ts` SHALL filter out sub-posts from the feed items.

#### Scenario: Sub-post absent from RSS
- **WHEN** the RSS feed is generated
- **THEN** entries with `parentPost` set are not included as feed items

### Requirement: Search index excludes sub-posts
The search page (`search.astro`) SHALL not include sub-posts in the client-side search index.

#### Scenario: Sub-post absent from search results
- **WHEN** the search index is built at compile time
- **THEN** entries with `parentPost` set are not serialised into the search data

### Requirement: Archives page excludes sub-posts
The archives page SHALL not include sub-posts in its grouped post list.

#### Scenario: Sub-post absent from archives
- **WHEN** the archives page is rendered
- **THEN** entries with `parentPost` set are not present
