## ADDED Requirements

### Requirement: ProjectCard component exists
The system SHALL provide `src/components/ProjectCard.astro` for rendering a single project entry in the listing grid.

#### Scenario: Component renders without error
- **WHEN** `ProjectCard` is passed a valid `CollectionEntry<"projects">` and its slug
- **THEN** the component renders a card element without throwing

### Requirement: ProjectCard displays cover image, title, date, and description
The card SHALL show the project cover image (if present), the project title as a link to `/projects/<slug>`, the formatted `pubDatetime`, and a truncated description.

#### Scenario: Title links to detail page
- **WHEN** the card is rendered with slug `"day-off"`
- **THEN** the title anchor's `href` is `/projects/day-off`

#### Scenario: Cover image rendered with Astro Image
- **WHEN** `coverImage` is defined
- **THEN** the card uses `<Image />` with appropriate `widths` and `sizes` for responsive display

#### Scenario: Missing cover image
- **WHEN** `coverImage` is undefined
- **THEN** the card renders with a placeholder background or no image element, without layout breakage

### Requirement: ProjectCard uses a distinct visual style
The card SHALL use a visual accent color distinct from blog post cards (blue) and gallery cards (purple) — using a teal/green scheme — to allow visual differentiation in mixed feeds.

#### Scenario: Accent color applied
- **WHEN** the card is rendered
- **THEN** the card border or badge uses a teal/green CSS class distinct from `text-purple-*` or `text-amber-*`
