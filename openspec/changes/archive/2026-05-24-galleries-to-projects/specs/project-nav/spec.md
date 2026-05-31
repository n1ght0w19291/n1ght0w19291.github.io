## ADDED Requirements

### Requirement: Projects nav link in desktop header
`src/components/Header.astro` SHALL include a "Projects" navigation link that is only rendered when `SITE.showProjects` is `true`.

#### Scenario: Link visible when enabled
- **WHEN** `SITE.showProjects` is `true`
- **THEN** the desktop header contains an `<a href="/projects">` element

#### Scenario: Link hidden when disabled
- **WHEN** `SITE.showProjects` is `false`
- **THEN** no `/projects` link appears in the rendered header HTML

### Requirement: Projects link in mobile menu
`src/components/MobileMenu.astro` SHALL include a "Projects" entry in the mobile navigation, conditional on `SITE.showProjects`.

#### Scenario: Mobile menu entry present
- **WHEN** `SITE.showProjects` is `true` and the mobile menu is open
- **THEN** a "Projects" link to `/projects` is visible in the mobile nav list

### Requirement: Projects nav uses a recognisable icon
The nav link SHALL use an existing or new SVG icon from `src/assets/icons/` to visually identify the projects section.

#### Scenario: Icon renders
- **WHEN** the Projects nav link is rendered
- **THEN** an `<svg>` icon is displayed alongside the label text
