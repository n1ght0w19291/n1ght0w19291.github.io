---
title: "packer"
description: "Solving the packer challenge from picoCTF."
pubDatetime: 2025-07-23T01:00:00Z
tags: ["picoCTF", "Reverse"]
parentPost: "picoctf"
draft: false
---

# packer

開 ghidra 之後看到

> Info: This file is packed with the UPX executable packer http://upx.sf.net

![upx](../../../assets/images/blog/picoCTF/packer/image.png)

先試試看對 `out` 解壓縮

```bash
upx -d out
```

解壓縮後發現要輸入密碼，直接看看有沒有 flag 相關的東西

![strings flag](../../../assets/images/blog/picoCTF/packer/image-1.png)

看到 hex ，拿去 cyberchef 解密

![flag](../../../assets/images/blog/picoCTF/packer/image-2.png)

---

好啦，真的要去做正事了，不能再玩了
