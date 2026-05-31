## ADDED Requirements

### Requirement: /projects/[slug] detail page exists
The system SHALL serve dynamic project detail pages via `src/pages/projects/[project].astro` using `getStaticPaths()`.

#### Scenario: Static paths generated
- **WHEN** Astro builds the site
- **THEN** one route is generated per non-draft project using the folder-name slug

#### Scenario: Project article renders
- **WHEN** a visitor navigates to `/projects/day-off`
- **THEN** the full MDX/Markdown content of `src/data/project/day-off/day-off.md` is rendered

#### Scenario: Unknown slug returns 404
- **WHEN** a visitor navigates to `/projects/nonexistent`
- **THEN** Astro returns a 404 (no static path generated for that slug)

### Requirement: Detail page displays project metadata
The detail page SHALL show the project `title`, `pubDatetime`, `description`, and `tags` in a header section above the article content.

#### Scenario: Title rendered as heading
- **WHEN** the detail page loads
- **THEN** the project `title` appears in an `<h1>` element

#### Scenario: Tags rendered as links
- **WHEN** a project has tags
- **THEN** each tag is rendered as a link to `/tags/<tag>`

### Requirement: Cover image shown on detail page
If the project has a `coverImage`, the detail page SHALL display it in an optimized `<Image />` component above the article content.

#### Scenario: Cover image present
- **WHEN** `coverImage` is defined in frontmatter
- **THEN** an `<img>` element referencing the optimized image URL is rendered on the page

#### Scenario: No cover image
- **WHEN** `coverImage` is undefined
- **THEN** no broken image element appears; the article begins immediately after the header

### Requirement: MDX components available in project articles
The detail page SHALL make shared MDX components (including `GalleryEmbed`) available when rendering project content.

#### Scenario: GalleryEmbed usable in project MDX
- **WHEN** a `.mdx` project article uses `<GalleryEmbed slug="..." />`
- **THEN** the embed renders correctly without import errors
