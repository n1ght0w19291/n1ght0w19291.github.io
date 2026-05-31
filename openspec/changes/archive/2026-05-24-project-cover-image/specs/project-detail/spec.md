## MODIFIED Requirements

### Requirement: Detail page displays project metadata
The detail page SHALL show the project `title`, `pubDatetime`, `description`, and `tags` in a header section above the article content, and SHALL resolve and pass an OG image URL to `<Layout>` for social sharing metadata.

#### Scenario: Title rendered as heading
- **WHEN** the detail page loads
- **THEN** the project `title` appears in an `<h1>` element

#### Scenario: Tags rendered as links
- **WHEN** a project has tags
- **THEN** each tag is rendered as a link to `/tags/<tag>`

#### Scenario: OG image wired to Layout
- **WHEN** the detail page renders
- **THEN** a resolved `ogImage` URL (custom, satori-generated, or undefined) is passed as the `ogImage` prop to `<Layout>`, so `<meta property="og:image">` reflects the project's image
