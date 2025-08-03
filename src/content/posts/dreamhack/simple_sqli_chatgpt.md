---
title: simple_sqli_chatgpt
published: 2025-02-20
updated: 2025-07-09
description: "Dreamhack"
image: ""
tags: ["CTF Writeup", "Dreamhack", "Web"]
category: "Dreamhack"
draft: false
---

# simple_sqli_chatgpt

題目：

> 어딘가 이상한 로그인 서비스입니다.  
> SQL INJECTION 취약점을 통해 플래그를 획득하세요. 플래그는 flag.txt, FLAG 변수에 있습니다.  
> chatGPT와 함께 풀어보세요!

![source code](/assets/dreamhack/simple_sqli_chatgpt/image.png)

從題目給的原始碼可以看到，只要讓 `userid` 等於 `admin` 且 `userlevel` 等於 `0` 就能得到 flag

前面在其他 ctf 已經玩過很多 sql injection 的題目

query 是直接由使用者輸入的東西去做查詢，所以可以直接把 `userid` 為 `admin` 的結果查詢出來。

![login](/assets/dreamhack/simple_sqli_chatgpt/image-2.png)

```
0' and userid='admin
```

![flag](/assets/dreamhack/simple_sqli_chatgpt/image-1.png)
