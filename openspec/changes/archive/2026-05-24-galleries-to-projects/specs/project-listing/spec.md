## ADDED Requirements

### Requirement: /projects listing page exists
The system SHALL serve a `/projects` route via `src/pages/projects/index.astro`.

#### Scenario: Route is accessible
- **WHEN** a visitor navigates to `/projects`
- **THEN** the page renders without error and returns HTTP 200

#### Scenario: showProjects false redirects
- **WHEN** `SITE.showProjects` is `false` and a visitor navigates to `/projects`
- **THEN** the visitor is redirected to the 404 page

### Requirement: Listing shows all non-draft projects sorted by date
The listing page SHALL display all projects where `draft` is not `true`, ordered by `pubDatetime` descending (newest first).

#### Scenario: Draft projects excluded
- **WHEN** a project has `draft: true`
- **THEN** it does not appear in the `/projects` listing

#### Scenario: Projects sorted newest first
- **WHEN** multiple projects exist with different `pubDatetime` values
- **THEN** the project with the latest `pubDatetime` appears first in the grid

### Requirement: Each project is shown as a ProjectCard
The listing page SHALL render one `ProjectCard` per project, passing the collection entry and resolved slug.

#### Scenario: Cover image displayed
- **WHEN** a project has a `coverImage` frontmatter field
- **THEN** the card displays that image as the cover

#### Scenario: Missing cover image shows placeholder
- **WHEN** a project has no `coverImage`
- **THEN** the card renders without a broken image (uses a placeholder or omits the image element)

### Requirement: Listing page has a hero section
The listing page SHALL include a page header with the section title "Projects" and a brief description.

#### Scenario: Hero renders
- **WHEN** the `/projects` page loads
- **THEN** an `<h1>` containing "Projects" is present in the rendered HTML
