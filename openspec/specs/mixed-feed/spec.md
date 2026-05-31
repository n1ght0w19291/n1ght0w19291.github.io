## MODIFIED Requirements

### Requirement: ContentEntry union type includes projects
The `ContentEntry` type in `src/utils/contentEntry.ts` SHALL be extended to `CollectionEntry<"blog"> | CollectionEntry<"galleries"> | CollectionEntry<"projects">`.

#### Scenario: isProjectEntry helper
- **WHEN** `entry.collection === "projects"`
- **THEN** a new `isProjectEntry(entry)` predicate returns `true`

#### Scenario: getEntryPath handles projects
- **WHEN** `getEntryPath` is called with a project entry whose `id` is `"day-off/day-off.md"`
- **THEN** it returns `"/projects/day-off"`

#### Scenario: getEntryPublishedMs works for projects
- **WHEN** `getEntryPublishedMs` is called with a project entry
- **THEN** it returns the `pubDatetime` timestamp (projects have no `modDatetime`)

### Requirement: Shared utility functions handle projects
`getSortedPosts`, `getUniqueTags`, `getPostsByTag`, and `getPostsByGroupCondition` SHALL accept and process `CollectionEntry<"projects">` entries without type errors.

#### Scenario: getSortedPosts sorts mixed array
- **WHEN** an array containing blog, gallery, and project entries is passed to `getSortedPosts`
- **THEN** all entries are sorted by `pubDatetime` descending regardless of collection type

#### Scenario: getUniqueTags includes project tags
- **WHEN** a project has tag `"design"` and no blog post has that tag
- **THEN** `getUniqueTags` returns `"design"` in the tag list

#### Scenario: getPostsByTag filters projects
- **WHEN** `getPostsByTag` is called with tag `"web"`
- **THEN** project entries with that tag are included in the result

### Requirement: Mixed-feed top-level listing excludes sub-posts
The mixed feed (home page, index listing) that combines blog, gallery, and project entries SHALL exclude blog sub-posts (entries with `parentPost` set).

#### Scenario: Sub-post absent from mixed feed
- **WHEN** the home page or mixed-feed component renders top-level entries
- **THEN** blog entries with `parentPost` set are not included in the result

#### Scenario: Non-blog entries unaffected
- **WHEN** gallery or project entries are included in the mixed feed
- **THEN** they are not filtered out by the sub-post exclusion logic
