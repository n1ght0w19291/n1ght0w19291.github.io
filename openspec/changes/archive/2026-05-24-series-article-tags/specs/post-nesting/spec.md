## MODIFIED Requirements

### Requirement: Parent post page renders a child post index
When a post has sub-posts, the `PostDetails` layout SHALL render a children section listing the sub-posts sorted by `pubDatetime` ascending. Each child row SHALL display the sub-post's title and a set of tag chips showing that sub-post's tags excluding the series tag (i.e. any tag whose slugified value equals `child.data.parentPost`).

#### Scenario: Parent with children shows child list
- **WHEN** the rendered post has one or more sub-posts
- **THEN** the page includes a section listing each child post's title and link

#### Scenario: Parent with no children shows no child list
- **WHEN** the rendered post has zero sub-posts
- **THEN** no child list section is rendered

#### Scenario: Child list items link to sub-post URLs
- **WHEN** a parent post has a sub-post `rsa-starter` under `picoctf-2024`
- **THEN** the child list renders a link to `/posts/picoctf-2024/rsa-starter`

#### Scenario: Child row shows topic tags after title
- **WHEN** a sub-post has `tags: ["picoCTF", "Reverse"]` and `parentPost: "picoctf"`
- **THEN** the child row displays a "Reverse" chip (excluding "picoCTF" whose slug matches the parentPost)

#### Scenario: Series tag is excluded from chips
- **WHEN** a sub-post's tag slugifies to the same value as its `parentPost`
- **THEN** that tag is NOT rendered as a chip in the series list row

#### Scenario: No chips when all tags are the series tag
- **WHEN** a sub-post's tags consist only of the series tag (or the sub-post has no tags)
- **THEN** no chip container is rendered for that row

#### Scenario: Chips are not interactive links
- **WHEN** a sub-post row renders tag chips
- **THEN** the chips are non-linking elements (not `<a>` tags), preserving valid HTML within the row anchor
