import { createPost } from "./create-post.js";

createPost({
  defaultExtension: ".mdx",
  usage: "pnpm new-mdx-post",
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

{/* 可以在這裡加入 MDX 或 React 元件 */}
`,
});
