---
title: "Irish-Name-Repo 2"
description: "Solving the Irish-Name-Repo 2 challenge from picoCTF."
pubDatetime: 2025-07-12T01:00:00Z
tags: ["picoCTF", "Web"]
parentPost: "picoctf"
draft: false
---

# Irish-Name-Repo 2

到 admin login 頁面

![admin login](../../../assets/images/blog/picoCTF/Irish-Name-Repo_2/image.png)

先試試看這題是不是 sql injection

![test sql injection](../../../assets/images/blog/picoCTF/Irish-Name-Repo_2/image-1.png)

結果會被偵測到

![sqli detected](../../../assets/images/blog/picoCTF/Irish-Name-Repo_2/image-2.png)

最後用 `/*` 註解掉後面內容得到 flag，看起來可能是 `--` 會被偵測到(?)

![flag](../../../assets/images/blog/picoCTF/Irish-Name-Repo_2/image-3.png)
