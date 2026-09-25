import { createPost } from "./create-post.js";

createPost({
  defaultExtension: ".md",
  usage: "pnpm new-md-post",
  renderContent: ({ title, pubDatetime }) => `---
title: "${title}"
description: ''
pubDatetime: ${pubDatetime}
tags: []
draft: false
# Optional references:
# references:
#   - title: "Reference title"
#     url: "https://example.com"
# Optional further reading:
# furtherReading:
#   - title: "Related resource"
#     url: "https://example.org"
---
`,
});
