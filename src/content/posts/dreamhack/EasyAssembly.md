---
title: Easy Assembly
published: 2025-02-20
updated: 2025-07-09
description: "Dreamhack"
image: ""
tags: ["CTF Writeup", "Dreamhack", "Reverse"]
category: "Dreamhack"
draft: false
---

# Easy Assembly

![enc_flag](/assets/dreamhack/EasyAssembly/image.png)

`check_password`中可以看到`enc_flag[i] ^ len ^ password[i]`

![check_password](/assets/dreamhack/EasyAssembly/image-2.png)

```python
enc = [
    0x74,
    0x78,
    0x4B,
    0x65,
    0x77,
    0x48,
    0x5C,
    0x69,
    0x68,
    0x7E,
    0x5C,
    0x79,
    0x77,
    0x62,
    0x46,
    0x79,
    0x77,
    0x05,
    0x46,
    0x54,
    0x73,
    0x72,
    0x59,
    0x69,
    0x68,
    0x7E,
    0x5C,
    0x7E,
    0x5A,
    0x61,
    0x57,
    0x6A,
    0x77,
    0x66,
    0x5A,
    0x52,
    0x02,
    0x62,
    0x5C,
    0x79,
    0x77,
    0x5C,
    0x00,
    0x7C,
    0x57,
    0x0D,
    0x0D,
    0x4D,
    0x00,
]

for k in range(256):
    flag = "".join(chr(c ^ len(enc) ^ k) for c in enc)
    if all(32 <= ord(ch) <= 126 for ch in flag):
        if flag.startswith("DH{"):
            print(f"[key = {k}] {flag}")

```

![flag](/assets/dreamhack/EasyAssembly/image-1.png)
