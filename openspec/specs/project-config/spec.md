## ADDED Requirements

### Requirement: showProjects config flag controls section visibility
`SITE.showProjects` (boolean) SHALL be added to `src/config.ts`. When `false`, the `/projects` route redirects to 404 and no project nav link appears.

#### Scenario: showProjects true enables section
- **WHEN** `SITE.showProjects` is `true`
- **THEN** `/projects` is accessible and the nav link is visible

#### Scenario: showProjects false disables section
- **WHEN** `SITE.showProjects` is `false`
- **THEN** navigating to `/projects` results in a 404 redirect and the nav link is hidden

### Requirement: showProjectsInIndex config flag controls mixed-feed inclusion
`SITE.showProjectsInIndex` (boolean) SHALL control whether project entries appear in mixed feeds (home, archives, tags, RSS). It is only meaningful when `showProjects` is also `true`.

#### Scenario: showProjectsInIndex true includes projects in feeds
- **WHEN** `SITE.showProjects` is `true` and `SITE.showProjectsInIndex` is `true`
- **THEN** project entries appear alongside blog posts and galleries in the home feed, archives, tag pages, and RSS

#### Scenario: showProjectsInIndex false excludes from feeds
- **WHEN** `SITE.showProjectsInIndex` is `false`
- **THEN** project entries do not appear in the home feed, archives, tag pages, or RSS (only accessible via `/projects`)

### Requirement: Config defaults are safe
Both flags SHALL default to `true` in the `config.ts` template so that new installs see the projects section immediately.

#### Scenario: Default values
- **WHEN** a developer adds the flags to `SITE` without specifying values
- **THEN** the TypeScript type requires explicit assignment (no implicit undefined)
