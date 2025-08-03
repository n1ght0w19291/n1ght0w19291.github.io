---
title: php7cmp4re
published: 2025-02-20
updated: 2025-07-09
description: "Dreamhack"
image: ""
tags: ["CTF Writeup", "Dreamhack", "Web"]
category: "Dreamhack"
draft: false
---

# php7cmp4re

題目是

> php 7.4로 작성된 페이지입니다.  
> 알맞은 Input 값을 입력하고 플래그를 획득하세요.  
> 플래그 형식은 DH{} 입니다.

![chall](/assets/dreamhack/php7cmp4re/image.png)

題目要讓輸入的 input_1 跟 input_2 符合條件

"7.:"在字典序上會大於"8"且小於"7.A"且大於"7.9"

"7:"字串與數字比較時會被解析為數字 7，所以會小於數字 74，但又會大於字串"74"

輸入

```
input_1 = 7.:
input_2 = 7:
```

![flag](/assets/dreamhack/php7cmp4re/image-1.png)
