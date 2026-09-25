import { createPost } from "./create-post.js";

createPost({
  defaultExtension: ".md",
  usage: "pnpm new-md-post",
  renderContent: ({ title, pubDatetime }) => `---
title: "${title}"
description: ''
pubDatetime: ${pubDatetime}
modDatetime: ${pubDatetime} # Manually update this when editing; shown only when later than pubDatetime.
# Optional frontmatter fields:
# author: "Author name" # Defaults to the site author.
# featured: true # Show this post in the featured section on the home page.
# ogImage: "../../assets/images/blog/<post-name>/cover.png" # Local image or absolute HTTP(S) URL; used for social sharing and the post card.
# canonicalURL: "https://example.com/original-post" # Override this post's canonical URL.
# timezone: "Asia/Taipei" # IANA timezone for this post's dates; defaults to the site timezone.
# parentPost: "parent-post-id" # Group this as a child post under the matching blog entry ID.
tags: []
draft: false
# Optional resource links (URL must use HTTP or HTTPS; title is optional):
# references:
#   - title: "Reference title"
#     url: "https://example.com"
# furtherReading:
#   - title: "Related resource"
#     url: "https://example.org"
---
`,
});
