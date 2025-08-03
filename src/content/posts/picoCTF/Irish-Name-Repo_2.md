---
title: Irish-Name-Repo 2
published: 2025-07-12
description: "picoCTF"
image: ""
tags: ["CTF Writeup", "picoCTF", "Web"]
category: "picoCTF"
draft: false
---

# Irish-Name-Repo 2

到 admin login 頁面

![admin login](/assets/picoCTF/Irish-Name-Repo_2/image.png)

先試試看這題是不是 sql injection

![test sql injection](/assets/picoCTF/Irish-Name-Repo_2/image-1.png)

結果會被偵測到

![sqli detected](/assets/picoCTF/Irish-Name-Repo_2/image-2.png)

最後用 `/*` 註解掉後面內容得到 flag，看起來可能是 `--` 會被偵測到(?)

![flag](/assets/picoCTF/Irish-Name-Repo_2/image-3.png)
