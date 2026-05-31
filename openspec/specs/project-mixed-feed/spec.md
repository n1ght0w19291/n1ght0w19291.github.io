## ADDED Requirements

### Requirement: Projects included in home page feed when flag is on
`src/pages/index.astro` SHALL fetch and merge project entries alongside blog posts and galleries when `SITE.showProjects && SITE.showProjectsInIndex` is `true`.

#### Scenario: Projects appear in home feed
- **WHEN** both flags are `true` and a project exists
- **THEN** the project's `Card` entry appears in the home page mixed listing

#### Scenario: Projects absent from home feed when flag is off
- **WHEN** `SITE.showProjectsInIndex` is `false`
- **THEN** no project entries appear in the home page listing

### Requirement: Projects included in paginated posts feed
`src/pages/posts/[...page].astro` SHALL include project entries in its paginated list when `showProjectsInIndex` is `true`.

#### Scenario: Project appears on correct page
- **WHEN** a project's `pubDatetime` places it in page 2 of the paginated feed
- **THEN** it appears on `/posts/2` and not on `/posts/1`

### Requirement: Projects included in archives
`src/pages/archives/index.astro` SHALL include project entries grouped by year/month when `showProjectsInIndex` is `true`.

#### Scenario: Project entry in archive timeline
- **WHEN** a project is included in the feed
- **THEN** it appears in the archive timeline under the correct year with a "Project" badge

### Requirement: Projects contribute to tag index and tag pages
`src/pages/tags/index.astro` and `src/pages/tags/[tag]/[...page].astro` SHALL include project tags and entries when `showProjectsInIndex` is `true`.

#### Scenario: Project tag appears in tag cloud
- **WHEN** a project has tag `"web"` and `showProjectsInIndex` is `true`
- **THEN** `"web"` appears in the tag index with a count that includes the project

#### Scenario: Tag page lists project
- **WHEN** a visitor navigates to `/tags/web`
- **THEN** the project with tag `"web"` is listed

### Requirement: Projects included in RSS feed
`src/pages/rss.xml.ts` SHALL include project entries in the RSS channel when `showProjectsInIndex` is `true`.

#### Scenario: Project in RSS
- **WHEN** `showProjectsInIndex` is `true`
- **THEN** the RSS feed contains an `<item>` for each non-draft project with `link` pointing to `/projects/<slug>`
