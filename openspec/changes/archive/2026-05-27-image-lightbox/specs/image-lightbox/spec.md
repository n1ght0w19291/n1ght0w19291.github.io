## ADDED Requirements

### Requirement: Article images open in lightbox on click
Within a blog post article, every `<img>` element (excluding those with `data-lightbox-ignore`) SHALL open a full-screen overlay displaying the original image when clicked.

#### Scenario: Click on article image
- **WHEN** user clicks an `<img>` inside `#article`
- **THEN** a full-screen lightbox overlay SHALL appear with the image centered and the background dimmed

#### Scenario: Opt-out via attribute
- **WHEN** an `<img>` has the `data-lightbox-ignore` attribute
- **THEN** clicking it SHALL NOT open the lightbox

### Requirement: Lightbox closes via Escape key
The lightbox overlay SHALL close when the user presses the Escape key.

#### Scenario: Press Escape while lightbox is open
- **WHEN** lightbox overlay is visible AND user presses the Escape key
- **THEN** the overlay SHALL close with a fade-out transition

### Requirement: Lightbox closes via backdrop click
The lightbox overlay SHALL close when the user clicks outside the image (on the backdrop).

#### Scenario: Click on backdrop
- **WHEN** lightbox overlay is visible AND user clicks outside the `<img>` element
- **THEN** the overlay SHALL close with a fade-out transition

### Requirement: Body scroll is locked while lightbox is open
While the lightbox overlay is visible, the page body SHALL NOT be scrollable.

#### Scenario: Open lightbox
- **WHEN** lightbox overlay opens
- **THEN** `document.body.style.overflow` SHALL be set to `'hidden'`

#### Scenario: Close lightbox
- **WHEN** lightbox overlay closes
- **THEN** `document.body.style.overflow` SHALL be restored to its original value

### Requirement: Lightbox re-attaches after View Transitions
After an Astro View Transition page swap, the lightbox behavior SHALL be re-initialized.

#### Scenario: Navigation via View Transitions
- **WHEN** `astro:after-swap` event fires
- **THEN** `attachLightbox()` SHALL be called again to bind new `<img>` elements

### Requirement: Lightbox cursor indicates interactivity
Article images that have lightbox enabled SHALL display a `zoom-in` cursor on hover to signal they are clickable.

#### Scenario: Hover over lightbox-enabled image
- **WHEN** user hovers over an `<img>` inside `#article` (without `data-lightbox-ignore`)
- **THEN** the cursor SHALL change to `zoom-in`
