---
title: csrf-2
published: 2025-02-20
updated: 2025-07-09
description: "Dreamhack"
image: ""
tags: ["CTF Writeup", "Dreamhack", "Web"]
category: "Dreamhack"
draft: false
---

# csrf-2

![home](/assets/dreamhack/csrf-2/image.png)

題目會比對輸入的密碼是否等於 users[password]

![script](/assets/dreamhack/csrf-2/image-2.png)

![users](/assets/dreamhack/csrf-2/image-1.png)

先以 guest 登入

![guest](/assets/dreamhack/csrf-2/image-4.png)

可以透過 `/change_password` 去改密碼

![change_password](/assets/dreamhack/csrf-2/image-3.png)

因為透過 `flag` 頁面的 session_storage[session_id] 都會是 admin，所以可以以 guest 的身分去改 admin 的密碼

試試看

```javascript
<img src="/change_password?pw=test">
```

然後以密碼為 test 去登入 admin 帳號

![flag](/assets/dreamhack/csrf-2/image-5.png)
