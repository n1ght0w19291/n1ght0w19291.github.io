---
title: "Flag Hunters"
published: 2025-07-12
description: "Solving the Flag Hunters challenge from picoCTF."
pubDatetime: 2025-07-12T01:00:00Z
tags: ["picoCTF", "Reverse"]
parentPost: "picoctf"
draft: false
---

# Flag Hunters

歌詞是用 `;` 分開的，所以在 `;` 以後再輸入 `RETURN 2` 就可以符合 `re.match(r"RETURN [0-9]+", line)`而控制變數 `lip` 的值，也就能跳到我們要的歌詞

![test](../../../assets/images/blog/picoCTF/Flag_Hunters/image.png)

nc 過去試試看

![flag](../../../assets/images/blog/picoCTF/Flag_Hunters/image-1.png)

---

現有的 Easy 都解完了 🎉

![picoCTF](../../../assets/images/blog/picoCTF/Flag_Hunters/image-2.png)
