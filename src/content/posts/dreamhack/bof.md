---
title: bof
published: 2025-07-10
description: "Dreamhack"
image: ""
tags: ["CTF Writeup", "Dreamhack", "pwnable"]
category: "Dreamhack"
draft: false
lang: ""
---

# bof

[題目連結](https://dreamhack.io/wargame/challenges/1111)

直接 `nc host3.dreamhack.games 19095` 過去

開 `Ghidra` 去看程式碼

![ghidra](/assets/dreamhack/bof/image-2.png)

可以知道程式會去讀檔案，題目說 flag 放在 `/home/bof/flag`

存寫入字串的變數大小是 128，但是實際可以讀的大小是 144，所以只要給 128 的 padding，就可以蓋掉原本要讀的 `./cat` 檔案，換成題目指定的 `/home/bof/flag`

![alt text](/assets/dreamhack/bof/image-1.png)

![flag](/assets/dreamhack/bof/image.png)
