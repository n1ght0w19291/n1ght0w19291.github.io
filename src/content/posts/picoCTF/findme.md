---
title: findme
published: 2025-07-11
description: "picoCTF"
image: ""
tags: ["CTF Writeup", "picoCTF", "Web"]
category: "picoCTF"
draft: false
---

# findme

![index](/assets/picoCTF/findme/image.png)

用帳號 `test` 密碼 `test!`登入

送出後會先有 url `/next-page/id=cGljb0NURntwcm94aWVzX2Fs`

然後是 `/next-page/id=bF90aGVfd2F5XzI1YmJhZTlhfQ==`

![redirect](/assets/picoCTF/findme/image-4.png)

最後導到`/home`

![home](/assets/picoCTF/findme/image-1.png)

前面的 url 看起來就像是 base64

把兩段 id `cGljb0NURntwcm94aWVzX2FsbF90aGVfd2F5XzI1YmJhZTlhfQ==` 拿去 CyberChef

![flag](/assets/picoCTF/findme/image-2.png)

就得到 flag 了
