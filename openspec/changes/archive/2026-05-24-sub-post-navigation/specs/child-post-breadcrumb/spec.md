## ADDED Requirements

### Requirement: Breadcrumb back button accepts explicit target

`Breadcrumb` component SHALL accept an optional `backTo: { label: string; href: string }` prop. When provided, the back button MUST display the given `label` as its visible text and navigate to the given `href` unconditionally, bypassing the `sessionStorage` dynamic-URL logic.

#### Scenario: Child post renders parent-aware back button

- **WHEN** `Breadcrumb` is rendered with `withBackButton={true}` and `backTo={{ label: "../picoctf", href: "/posts/picoctf/" }}`
- **THEN** the back button displays `cd ../picoctf` instead of `cd ..`
- **THEN** the back button `href` attribute equals `/posts/picoctf/`
- **THEN** the `sessionStorage` override script does NOT overwrite the `href`

#### Scenario: Default back button unchanged when backTo is absent

- **WHEN** `Breadcrumb` is rendered with `withBackButton={true}` and no `backTo` prop
- **THEN** the back button displays `cd ..`
- **THEN** the `sessionStorage` script runs and may overwrite `href` as before

### Requirement: PostDetails passes parent link to Breadcrumb for child posts

`PostDetails` layout SHALL accept an optional `parentPost: CollectionEntry<"blog">` prop. When present, it MUST compute `backTo` as `{ label: "../<parent-slug>", href: getPath(parentPost.id, parentPost.filePath) }` and forward it to `Breadcrumb`.

#### Scenario: Child post layout wires parent to breadcrumb

- **WHEN** `PostDetails` renders a child post with `parentPost` prop supplied
- **THEN** `Breadcrumb` receives a `backTo` object pointing to the parent post URL
- **THEN** the parent slug segment in the label matches the last path segment of the parent's URL

#### Scenario: Non-child post layout leaves breadcrumb unchanged

- **WHEN** `PostDetails` renders a post without `parentPost` prop
- **THEN** `Breadcrumb` receives no `backTo` prop and behaves as before
