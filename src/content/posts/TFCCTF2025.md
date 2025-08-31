---
title: TFC CTF 2025
published: 2025-08-31
description: "TFC CTF 2025 writeup"
image: "/assets/TFCCTF2025/logo.png"
tags: ["CTF Writeup"]
category: "CTF Writeup"
draft: false
---

這週比較忙，除了星期六有 AIS3 好厲駭的開幕式，還要處理一些開學前需要先準備的事，下週還有新生營隊，就只解了一個簽到題。

![](/assets/TFCCTF2025/IMG-20250831183542088.png)

一樣再去看大神們的 writeup 學習。

---

# TFC CTF 2025

## Misc

#### DISCORD SHENANIGANS V5

這一題要我們去 Discord 找 flag。我要寫的時候已經晚上八點多了，所以我先看到了這個提示，看起來像是不可顯示字元的題目。

![](/assets/TFCCTF2025/IMG-20250829211842456.png)

flag 在這個訊息裡面。

![](/assets/TFCCTF2025/IMG-20250829211826115.png)

確定方向之後找 Chatgpt 生 script。

```python
msg = "@everyone Starting in 3 hours!! (and 15 minutes). Get your shovels ready! 😉 ​‌​‌​‌​​​‌​​​‌‌​​‌​​​​‌‌​‌​​​​‌‌​‌​‌​‌​​​‌​​​‌‌​​‌‌‌‌​‌‌​‌‌​‌​​​​‌‌​‌​​‌​‌‌​​‌​​​‌‌​​‌​​​‌‌​​‌​‌​‌‌​‌‌‌​​‌​‌‌‌‌‌​‌‌‌​​‌‌​‌‌​‌​​​​‌‌​​‌​‌​‌‌​‌‌‌​​‌‌​​​​‌​‌‌​‌‌‌​​‌‌​‌​​‌​‌‌​​‌‌‌​‌‌​​​​‌​‌‌​‌‌‌​​‌‌‌​​‌‌​‌‌‌‌‌​‌https://ctf.thefewchosen.com/"
zw_chars = "".join(c for c in msg if c in ["\u200b","\u200c","\u200d"])
# 0=U+200B, 1=U+200C
bin_str = "".join("0" if c=="\u200b" else "1" for c in zw_chars)
flag = "".join(chr(int(bin_str[i:i+8],2)) for i in range(0,len(bin_str),8))
print(flag)
```

就拿到 flag 了。

![](/assets/TFCCTF2025/IMG-20250829211027211.png)

```txt
TFCCTF{hidden_shenanigans}
```

![](/assets/TFCCTF2025/IMG-20250829210418646.png)
