---
title: welcome
published: 2025-07-10
description: "Dreamhack"
image: ""
tags: ["CTF Writeup", "Dreamhack", "pwnable"]
category: "Dreamhack"
draft: false
lang: ""
---

# welcome

[題目連結](https://dreamhack.io/wargame/challenges/27)

題目給了 `welcome.c` 以及 `welcome` 執行檔

```c
#include <stdio.h>

int main(void) {

    FILE *fp;
    char buf[0x80] = {};
    size_t flag_len = 0;

    printf("Welcome To DreamHack Wargame!\n");

    fp = fopen("/flag", "r");
    fseek(fp, 0, SEEK_END);
    flag_len = ftell(fp);
    fseek(fp, 0, SEEK_SET);
    fread(buf, 1, flag_len, fp);
    fclose(fp);

    printf("FLAG : ");

    fwrite(buf, 1, flag_len, stdout);
}
```

這看起來連線到 server 就可以拿到 flag

![flag](/assets/dreamhack/pwn_welcome/image-1.png)

---

本來想說要來好好練 pwn！寫完這一題之後：...這題不算 www
