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
---
`,
});
