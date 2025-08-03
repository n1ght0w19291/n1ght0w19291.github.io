---
title: baby-bof
published: 2025-07-10
updated: 2025-07-10
description: "Dreamhack"
image: ""
tags: ["CTF Writeup", "Dreamhack", "pwnable"]
category: "Dreamhack"
draft: false
lang: ""
---

# baby-bof

[題目連結](https://dreamhack.io/wargame/challenges/974)

先 build docker image

```bash
docker build -t baby-bof .
docker run --rm -it -p 33333:33333 baby-bof
```

`nc localhost 33333` 之後會先得到 win 的 address，接下來 name 輸入 main 查看 main 附近的 address

![win address](/assets/dreamhack/baby-bof/image.png)

看左邊的 address 可以知道 return address 應該在 idx=7，所以接下來先輸入 win 的 address，再輸入 7

![address](/assets/dreamhack/baby-bof/image-1.png)

就可以拿到 flag

![test flag](/assets/dreamhack/baby-bof/image-2.png)

接下來就正式試一次

![win address](/assets/dreamhack/baby-bof/image-3.png)

![flag](/assets/dreamhack/baby-bof/image-4.png)

得到 flag
