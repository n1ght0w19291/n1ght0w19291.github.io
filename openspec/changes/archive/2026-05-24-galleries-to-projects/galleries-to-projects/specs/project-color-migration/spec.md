## ADDED Requirements

### Requirement: Projects use purple color scheme
All Projects UI elements SHALL use the purple color palette (`purple-500` / `#a855f7`) instead of teal (`teal-500` / `#14b8a6`). This applies to borders, backgrounds, text accents, icon rings, shadows, and inline `color-mix` gradient values on the projects listing page.

#### Scenario: Project card renders with purple accent
- **WHEN** a project card is rendered in the listing or mixed feed
- **THEN** the card border, background tint, icon ring, and text accent SHALL use `purple-500` variants (e.g., `border-purple-500/20`, `bg-purple-500/5`, `text-purple-400`)

#### Scenario: Projects listing page uses purple gradients
- **WHEN** the `/projects` page is loaded
- **THEN** all `color-mix` gradient values referencing `#14b8a6` SHALL be replaced with `#a855f7` (purple-500)

#### Scenario: Shared card routes projects to purple
- **WHEN** `Card.astro` renders an item with `collection === "projects"`
- **THEN** the card SHALL use the purple color branch (same classes previously used for `collection === "galleries"`)

## REMOVED Requirements

### Requirement: Galleries color branch in shared Card
**Reason**: Galleries collection is being removed entirely; its purple color branch is repurposed for Projects.
**Migration**: The `collection === "galleries"` branch in `Card.astro` is deleted. No migration needed as Galleries content is also removed.
