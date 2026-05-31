## ADDED Requirements

### Requirement: Block-level spoiler syntax
The system SHALL transform a `:::spoiler` … `:::` directive fence into a gray-masked block. All content inside is visually obscured by a solid gray overlay by default and revealed on click — identical to the spoiler mechanic on social platforms like Threads or Reddit.

#### Scenario: Block spoiler hidden on load
- **WHEN** a page loads and a `:::spoiler` block is present
- **THEN** the content area is covered by a solid gray overlay; the underlying text is not readable

#### Scenario: Block spoiler revealed on click
- **WHEN** the reader clicks anywhere on the gray overlay
- **THEN** the overlay is removed and the full content becomes readable

#### Scenario: Multi-paragraph body in spoiler
- **WHEN** the spoiler fence body contains multiple paragraphs or nested Markdown (lists, code, inline styles)
- **THEN** all content is revealed together in a single click

#### Scenario: Block spoiler re-hides on second click
- **WHEN** the reader clicks the revealed spoiler content again
- **THEN** the gray overlay returns, hiding the content again

### Requirement: Inline-level spoiler syntax
The system SHALL transform `||hidden text||` inline syntax (Discord/Reddit style) into a gray-masked inline span. The masked text is unreadable by default and revealed on click.

#### Scenario: Inline spoiler hidden on load
- **WHEN** markdown contains `||some text||`
- **THEN** "some text" renders as a gray pill/rectangle; the characters are not visible

#### Scenario: Inline spoiler revealed on click
- **WHEN** the reader clicks the gray inline span
- **THEN** the text becomes visible in its natural colour

#### Scenario: Inline spoiler within a sentence
- **WHEN** `||hidden||` appears mid-sentence
- **THEN** the surrounding text is unaffected; only the masked span changes

### Requirement: Spoiler visual design
Both block and inline spoiler elements SHALL use a solid gray overlay as the concealment mechanism — not blur or opacity. The color MUST provide sufficient contrast to make the text completely unreadable beneath it. On reveal the original text color is restored. The element MUST appear interactive (cursor pointer).

#### Scenario: Gray mask covers text completely
- **WHEN** a spoiler is in its hidden state
- **THEN** no part of the underlying text characters is legible through the mask

#### Scenario: Revealed state uses natural text colour
- **WHEN** a spoiler is in its revealed state
- **THEN** the text renders exactly as it would without any spoiler wrapper — same size, colour, and weight

#### Scenario: Design consistent across light and dark mode
- **WHEN** a spoiler is rendered in dark mode (`html[data-theme="dark"]`)
- **THEN** the gray mask colour adjusts so it still fully conceals the text against the dark background
