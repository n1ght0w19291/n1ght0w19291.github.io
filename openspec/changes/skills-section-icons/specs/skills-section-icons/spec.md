## ADDED Requirements

### Requirement: Skill badge displays technology icon
Each skill badge in the SkillsSection component SHALL render an SVG icon to the left of the skill label text when a matching Devicon icon exists for that skill.

#### Scenario: Skill has a matching icon
- **WHEN** a skill name has a corresponding entry in the icon mapping table
- **THEN** the badge SHALL render the Devicon SVG icon (16×16 px) followed by the skill label text, with 6 px gap between them

#### Scenario: Skill has no matching icon
- **WHEN** a skill name has no entry in the icon mapping table
- **THEN** the badge SHALL render the skill label text only, without any icon placeholder or broken image

### Requirement: Icon mapping is statically defined
The component SHALL maintain a static lookup table that maps each skill name string to its Devicon icon identifier (e.g., `"React" → "devicon:react"`).

#### Scenario: Known skill lookup
- **WHEN** the component renders a skill whose name exists in the lookup table
- **THEN** the correct Devicon icon identifier SHALL be resolved and used to render the icon

#### Scenario: Unknown skill lookup
- **WHEN** the component renders a skill whose name is not in the lookup table
- **THEN** the lookup SHALL return `undefined` and no icon element SHALL be rendered

### Requirement: Icon library loaded from local bundle
The component SHALL use `@iconify/react` with offline-bundled icons from `@iconify-json/devicon` to render icons without any CDN or network requests at runtime.

#### Scenario: Icon renders without network
- **WHEN** the page is loaded without internet access
- **THEN** all skill icons SHALL still render correctly from the bundled icon data
