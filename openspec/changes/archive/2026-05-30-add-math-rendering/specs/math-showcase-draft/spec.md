## ADDED Requirements

### Requirement: Math showcase draft post exists
The system SHALL include a draft blog post at `src/data/blog/math-showcase.mdx` that demonstrates KaTeX math rendering capabilities.

#### Scenario: Draft post is excluded from production build
- **WHEN** the site is built with `draft: true` on the showcase post
- **THEN** the post SHALL not appear in the post list, RSS feed, or sitemap

#### Scenario: Draft post is accessible during local development
- **WHEN** running `astro dev` locally
- **THEN** the draft post SHALL be accessible via its slug URL (e.g., `/posts/math-showcase`)

### Requirement: Showcase post covers key math formula types
The showcase post SHALL contain examples that exercise all major KaTeX rendering scenarios, so the author can visually confirm correct output.

#### Scenario: Showcase contains inline math examples
- **WHEN** the showcase post is rendered
- **THEN** it SHALL display at least 3 inline math examples including Greek letters, fractions, and superscripts/subscripts

#### Scenario: Showcase contains block math examples
- **WHEN** the showcase post is rendered
- **THEN** it SHALL display at least 3 block math examples including a sum/integral, an aligned equation system, and a matrix

#### Scenario: Showcase contains crypto-relevant formulas
- **WHEN** the showcase post is rendered
- **THEN** it SHALL display examples relevant to CTF crypto writeups (e.g., modular arithmetic, RSA formula, elliptic curve equation)
