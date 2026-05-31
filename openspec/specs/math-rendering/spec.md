## ADDED Requirements

### Requirement: Inline math syntax support
The system SHALL render `$...$` inline LaTeX syntax within `.md` and `.mdx` content files as KaTeX HTML at build time.

#### Scenario: Inline math renders correctly
- **WHEN** a blog post contains `$E = mc^2$` in its Markdown body
- **THEN** the rendered HTML SHALL contain a KaTeX `<span class="katex">` element with the formula displayed inline

#### Scenario: Inline math does not break surrounding text
- **WHEN** a paragraph contains inline math surrounded by regular text
- **THEN** the text before and after the formula SHALL remain on the same line without unexpected line breaks

### Requirement: Block math syntax support
The system SHALL render `$$...$$` block LaTeX syntax within `.md` and `.mdx` content files as a centered display-mode KaTeX block at build time.

#### Scenario: Block math renders as display element
- **WHEN** a blog post contains a `$$...$$` block
- **THEN** the rendered HTML SHALL contain a KaTeX element with `display: block` styling

#### Scenario: Multi-line block math renders correctly
- **WHEN** a `$$...$$` block spans multiple lines using LaTeX line-break syntax (e.g., `\\`)
- **THEN** all lines SHALL be rendered as a single display-mode formula

### Requirement: KaTeX CSS available on all post pages
The system SHALL include KaTeX CSS styles on every blog post page to ensure formulas display correctly even when the page is loaded directly.

#### Scenario: KaTeX CSS is present in page head
- **WHEN** any blog post page is loaded
- **THEN** the page SHALL contain KaTeX CSS rules (e.g., `.katex` selector) either via a stylesheet link or inline in `<style>` tags

### Requirement: MDX compatibility
The system SHALL support math syntax in `.mdx` files with the same behavior as `.md` files.

#### Scenario: Math in MDX renders identically to MD
- **WHEN** a `.mdx` file contains inline or block math syntax
- **THEN** the output SHALL be identical to the equivalent `.md` file with the same math content

### Requirement: Non-math content unaffected
Existing `.md` and `.mdx` content that does not use `$` math delimiters SHALL not be altered by the math rendering pipeline.

#### Scenario: Existing posts render unchanged
- **WHEN** a blog post contains no math syntax
- **THEN** its rendered output SHALL be byte-for-byte equivalent to the output before the math plugin was added (excluding KaTeX CSS)

### Requirement: KaTeX formulas are readable in dark mode
KaTeX formula elements SHALL inherit the parent text color so that formulas remain legible in both light and dark themes without hardcoded color values.

#### Scenario: Formula visible in dark mode
- **WHEN** the site is in dark mode and a page contains inline or block KaTeX math
- **THEN** the formula text SHALL be rendered in a light color (inherited from the dark-theme foreground) and SHALL be clearly readable against the dark background

#### Scenario: Formula appearance unchanged in light mode
- **WHEN** the site is in light mode and a page contains KaTeX math
- **THEN** the formula text SHALL remain dark-colored (inherited from the light-theme foreground) with no visual regression from the previous behavior
