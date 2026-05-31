### Requirement: Text selection uses accent color
The system SHALL apply a custom `::selection` style globally so that selected text displays with the site's accent color as background.

#### Scenario: User selects text in light theme
- **WHEN** a user drags to select text while the site is in light mode
- **THEN** the selection highlight SHALL use a color derived from `--accent` (light theme value `#1158d1`) at reduced opacity, distinct from the browser default

#### Scenario: User selects text in dark theme
- **WHEN** a user drags to select text while the site is in dark mode
- **THEN** the selection highlight SHALL use a color derived from `--accent` (dark theme value `#008fec`) at reduced opacity, distinct from the browser default

### Requirement: Selected text remains readable
The foreground color of selected text SHALL remain legible against the accent-tinted selection background.

#### Scenario: Text color on selection
- **WHEN** text is selected in either theme
- **THEN** the selected text color SHALL be `var(--foreground)` ensuring sufficient contrast against the selection background
