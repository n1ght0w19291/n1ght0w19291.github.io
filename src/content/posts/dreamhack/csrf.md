---
title: csrf-1
published: 2025-02-20
updated: 2025-07-09
description: "Dreamhack"
image: ""
tags: ["CTF Writeup", "Dreamhack", "Web"]
category: "Dreamhack"
draft: false
---

# csrf-1

這次是會檢查透過 bot 進入到 `/admin/notice_flag` 頁面的參數有沒有包含 userid = "admin"

```javascript
<img src="/admin/notice_flag?userid=admin">
```

得到 flag

![flag](/assets/dreamhack/csrf/image.png)
