## ADDED Requirements

### Requirement: GFM alert blockquote rendering
The system SHALL transform GitHub-Flavored Markdown alert blockquotes (`> [!TYPE]`) into styled callout elements. Supported types are `NOTE`, `TIP`, `WARNING`, `CAUTION`, and `IMPORTANT` (case-insensitive).

#### Scenario: Note callout from GFM syntax
- **WHEN** a markdown file contains `> [!NOTE]` followed by blockquote body text
- **THEN** the rendered HTML wraps the content in a callout element with type `note`, displaying a note icon and the label "Note"

#### Scenario: Custom title is not supported in GFM syntax
- **WHEN** a `> [!WARNING]` block has no inline title override
- **THEN** the callout title defaults to the type name ("Warning") with appropriate icon

#### Scenario: Multi-line body in GFM alert
- **WHEN** a `> [!TIP]` block spans multiple blockquote lines
- **THEN** all lines are included in the callout body as a single callout element

#### Scenario: Unknown alert type passes through unchanged
- **WHEN** a blockquote contains `> [!UNKNOWN]`
- **THEN** it renders as a plain blockquote with existing blockquote styles (no callout wrapping)

### Requirement: Directive-fence callout syntax
The system SHALL transform `:::type[Optional Title]` … `:::` directive fences into styled callout elements. Supported directive names are listed in the Callout Type Palette requirement below.

#### Scenario: Callout with default title
- **WHEN** a markdown file contains `:::note` … `:::` with no title label
- **THEN** the callout renders with type `note`, icon, and default title "Note"

#### Scenario: Callout with custom title
- **WHEN** a directive fence is written as `:::warning[請注意]` … `:::`
- **THEN** the callout renders with the title "請注意" instead of the default

#### Scenario: Multi-paragraph body in directive fence
- **WHEN** the directive fence body contains multiple paragraphs
- **THEN** all paragraphs are preserved inside the callout element

#### Scenario: Nested inline Markdown in body
- **WHEN** the callout body contains inline Markdown (bold, code, links)
- **THEN** those elements are rendered as HTML inside the callout body

#### Scenario: Unknown directive name passes through
- **WHEN** a directive name does not match any supported callout type
- **THEN** the directive is not transformed into a callout (no output or passthrough)

### Requirement: Callout type palette
The system SHALL support the following callout types. Each type MUST have a default label, a distinct colour, and a unique icon.

| Directive name | Aliases | Default label | Colour |
|---|---|---|---|
| `note` | — | Note | blue-gray |
| `tip` | — | Tip | emerald |
| `warning` | `warn` | Warning | amber |
| `caution` | — | Caution | rose |
| `important` | — | Important | violet |
| `info` | — | Info | sky |
| `success` | `check`, `done` | Success | green |
| `danger` | `error` | Danger | red |
| `question` | `faq`, `help` | Question | teal |
| `abstract` | `tldr`, `summary` | Abstract | cyan |
| `todo` | — | Todo | orange |
| `example` | — | Example | indigo |
| `quote` | `cite` | Quote | stone |
| `bug` | — | Bug | pink |

#### Scenario: Alias resolves to canonical type
- **WHEN** a directive fence uses an alias such as `:::check` or `:::tldr`
- **THEN** the callout renders identically to its canonical type (`success` and `abstract` respectively)

#### Scenario: Each type has unique icon
- **WHEN** any two different callout types appear on the same page
- **THEN** their icons are visually distinct from one another and rendered as SVG (not emoji)

### Requirement: Callout visual design
Each callout type SHALL have a distinct left-border colour, background tint, and icon rendered via CSS, using existing CSS custom properties (`--accent`, `--foreground`, `--border`). The callout MUST be visually distinct from plain blockquotes. Icons MUST be SVG-based (rendered as CSS `mask-image` data URIs on `::before` pseudo-elements) so their colour is fully controlled by CSS `background-color` — emoji characters are NOT permitted as icons.

#### Scenario: Type-specific colour in light mode
- **WHEN** a `warning` callout is rendered in light mode
- **THEN** it displays an amber left border, amber background tint, and a warning icon

#### Scenario: Type-specific colour in dark mode
- **WHEN** any callout type is rendered with `html[data-theme="dark"]`
- **THEN** the callout retains its type-specific colour scheme without colour inversion or loss of contrast

#### Scenario: Callout is visually distinct from blockquote
- **WHEN** a callout and a plain blockquote appear in the same article
- **THEN** the callout is clearly distinguishable (different border, background, icon)
