## ADDED Requirements

### Requirement: KaTeX formulas are readable in dark mode
KaTeX formula elements SHALL inherit the parent text color so that formulas remain legible in both light and dark themes without hardcoded color values.

#### Scenario: Formula visible in dark mode
- **WHEN** the site is in dark mode and a page contains inline or block KaTeX math
- **THEN** the formula text SHALL be rendered in a light color (inherited from the dark-theme foreground) and SHALL be clearly readable against the dark background

#### Scenario: Formula appearance unchanged in light mode
- **WHEN** the site is in light mode and a page contains KaTeX math
- **THEN** the formula text SHALL remain dark-colored (inherited from the light-theme foreground) with no visual regression from the previous behavior
