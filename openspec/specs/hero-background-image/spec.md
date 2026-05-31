### Requirement: Hero background image is configurable
The system SHALL provide a `heroImage` field in `SITE` config (`src/config.ts`) that accepts an optional string path pointing to an image in the `/public` directory.

#### Scenario: heroImage is set
- **WHEN** `SITE.heroImage` is a non-empty string (e.g., `"/images/hero.jpg"`)
- **THEN** the homepage hero section SHALL render that image as a full-width, full-height background covering the entire hero block

#### Scenario: heroImage is empty or undefined
- **WHEN** `SITE.heroImage` is an empty string or not set
- **THEN** the homepage hero section SHALL render without any background image, preserving the existing default appearance

### Requirement: Background image covers the full hero area
When a hero image is configured, it SHALL fill the entire hero section using cover sizing and centered positioning, without distorting the aspect ratio.

#### Scenario: Wide viewport
- **WHEN** the viewport is wider than the image
- **THEN** the image SHALL be cropped symmetrically and cover the full width and height of the hero section

#### Scenario: Narrow viewport (mobile)
- **WHEN** the viewport is narrower than the image
- **THEN** the image SHALL still cover the full hero section without leaving blank areas

### Requirement: Text remains readable over the background image
When a hero background image is present, a semi-transparent overlay SHALL be applied between the image and the text content to ensure sufficient contrast.

#### Scenario: Dark theme with image
- **WHEN** the site is in dark mode and a hero image is configured
- **THEN** the overlay SHALL use a dark-tinted color (derived from `--background`) at approximately 60% opacity

#### Scenario: Light theme with image
- **WHEN** the site is in light mode and a hero image is configured
- **THEN** the overlay SHALL use a light-tinted color (derived from `--background`) at approximately 60% opacity

### Requirement: Intro audio player is removed
The system SHALL NOT include any audio playback UI on the homepage or in the site header.

#### Scenario: Homepage loads
- **WHEN** the homepage is rendered
- **THEN** no audio player element (play button, waveform, or progress bar) SHALL appear in the hero section

#### Scenario: Header on non-home pages
- **WHEN** any non-homepage route is loaded
- **THEN** no compact audio player SHALL appear in the site header
