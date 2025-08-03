---
title: DownUnderCTF 2025
published: 2025-07-18
updated: 2025-07-22
description: "DownUnderCTF 2025 writeup"
image: ""
tags: ["CTF Writeup"]
category: "CTF Writeup"
draft: false
---

星期六開會 + 聚餐時間就這麼不見了，只寫完三題 ~~beginner 等級的題目 好難過~~  
這次有 eating 大電神帶我打，eating 最電了 ⚡

536 th /2336

![](/assets/DUCTF2025/Pasted%20image%2020250720173209.png)

![](/assets/DUCTF2025/Pasted%20image%2020250720173229.png)

![](/assets/DUCTF2025/Pasted%20image%2020250720173252.png)

我其實有花時間在 osint 上面，總感覺找對地方了但是輸入的 flag 是錯的 🥲

要好好找時間看大神們的 writeup 🛐

---

有去翻 writeup，然後 `Look at all those chickens!` ，我找到圖片中的 `Bin Chicken Island` 了，沒想到這題是要找到拍攝者拍照當下的位置 www

---

# DownUnderCTF 2025

## Misc

### discord

![](/assets/DUCTF2025/Pasted%20image%2020250718173227.png)

```txt
DUCTF{E-d0g_th4nks_th3_sp0ns0rs_4_th3ir_supp0rt!}
```

![](/assets/DUCTF2025/Pasted%20image%2020250718173620.png)

## Reverse

### zeus

![](/assets/DUCTF2025/Pasted%20image%2020250718174404.png)

老樣子開 Ghidra

使用 `Maimaktes1337` 當作 Key，對這段資料 XOR，就能得到 Zeus 的回應

![](/assets/DUCTF2025/Pasted%20image%2020250718174425.png)

找 chatgpt 生 script，越來越懶惰了，有錯再修

```python
from pwn import *
from itertools import cycle
data = (
    p64(0x0c1f1027392a3409) +
    p64(0x011512515c6c561d) +
    p64(0x5a411e1c18043e08) +
    p64(0x3412090606125952) +
    p64(0x12535c546e170b15) +
    p64(0x003a110315320f0e)[:7] +
    p32(0x4e4a5a00)
)

key = b"Maimaktes1337"

result = bytes([a ^ b for a, b in zip(data, cycle(key))])

print(result.decode(errors="ignore"))
```

得到 flag

```txt
DUCTF{king_of_the_olympian_gods_and_god_of_the_sky}
```

## Crypto

### ecb-a-tron-9000

這題有覺得好玩 xd

![alt text](/assets/DUCTF2025/image-1.png)

一進去就會有這個 help 可以按

![alt text](/assets/DUCTF2025/image.png)

總之呢，這題題目會在輸入的資料後面加一段 secret 再進行加密，並且加密模式是 ECB ，也就是每 16 bytes 的明文 block 會獨立加密，相同輸入會有相同輸出

利用這個特性可以控制的輸入，觀察密文變化，來逐字猜出 secret 內容

比如讓前十 15 個都是 `A` ，這樣就是 `AAAAAAAAAAAAAAA` + secret 的第一個字母

按下 `Encrypt` 可以看到加密結果，接下來去猜第十六格放 `A-Z` 的哪個字母會有相同的加密結果，就能知道 secret 的第一個字母是甚麼，接下來 15 個字依此類推，但是能看的出來這些是由英文詞語組成的，所以不需要真的每一個都 `A-Z` 下去猜

![](/assets/DUCTF2025/Pasted%20image%2020250720171738.png)

最後能得出左右兩邊加密結果相同，所以 secret phrase 就是 `DONTUSEECBPLEASE` ，填到 DUCTF{} 裡面就得到 flag 了

```txt
DUCTF{DONTUSEECBPLEASE}
```

![](/assets/DUCTF2025/Pasted%20image%2020250720171825.png)
