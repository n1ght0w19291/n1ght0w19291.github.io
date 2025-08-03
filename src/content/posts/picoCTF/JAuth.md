---
title: JAuth
published: 2025-07-14
description: "picoCTF"
image: ""
tags: ["CTF Writeup", "picoCTF", "Web"]
category: "picoCTF"
draft: false
---

# JAuth

![alt text](/assets/picoCTF/JAuth/image.png)

目標是讓身分變成 `admin`

先按照題目用帳號 `test` 密碼 `Test123!` 登入

![alt text](/assets/picoCTF/JAuth/image-1.png)

登入後看到 jwt token，用 hashcat 找 secret key，但是沒有結果

嘗試把 `alg` 的值從 `HS256` 改成 `none`，並把 `role` 從 `user` 改成 `admin` ，並且保留後面的 `.` ，再貼回去

![alt text](/assets/picoCTF/JAuth/image-2.png)

得到 flag

![alt text](/assets/picoCTF/JAuth/image-3.png)
