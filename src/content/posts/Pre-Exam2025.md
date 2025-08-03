---
title: My First CTF & Pre-exam 2025
published: 2025-05-27
updated: 2025-07-09
description: "My First CTF & Pre-exam 2025 writeup"
image: ""
tags: ["CTF Writeup"]
category: "CTF Writeup"
draft: false
---

這個 writeup 是 6/30 以後才能放出來的，然後我發現，我忘了截圖分數啊啊啊！！！ (╥﹏╥)

總之這次 mfc 排名是 11 th / 83，拿到潛力獎，獲得 ais3 新型態資安實務暑期課程的門票了 xdd

Pre-exam 成績是 186 th / 389

還是太菜 🥬 了，會多練，明年...明年爭取也能去 ais3 吧 (畫餅中)

# My First CTF

## misc - Welcome

有被題目騙到，因為是 welcome 也沒有想麼多，剛開始真的文字選起來`ctrl c + ctrl v`，然後就複製到了 `AIS3{This_Is_Just_A_Fake_Flag_~~}`，超難過，welcome 題就 incorrect。

![Pasted%20image%2020250529203250.png](/assets/Pre-exam2025/Pasted%20image%2020250529203250.png)

因為有時間壓力，沒有去研究其他複製方法，選擇最原始的自己把 flag 打上去，好像還打錯幾次，浪費了一點時間。

```txt
AIS3{Welcome_And_Enjoy_The_CTF_!}
```

## misc - Ramen CTF

把壓縮檔下載下來。看到這張圖片的時候有兩個想法：第一個是右手邊的發票，上面有 QRCode 以及部分資料(部分發票號碼、消費日期 2025-04-13 )。第二個是左手邊的盤子看起來蠻有特色，之前 Osint 的題目常常拿東西去 google 圖片搜尋，不過題目要求要把出題者點的品項找出來，那用盤子去搜尋顯然不太現實，就去掃 QRCode 了。

![Pasted%20image%2020250529203656.png](/assets/Pre-exam2025/Pasted%20image%2020250529203656.png)

QRCode 掃描後得到：

```txt
mf1687991111404137095000001f4000001f40000000034785923vg9sg89nfznfpnkyfrlsoa==:**********:2:2:1:蝦拉
```

我其實不知道發票的這些編號要怎麼看，但是最後的`蝦拉`兩個字顯然跟品項名稱有關係。上網搜尋`發票明細`等等關鍵字，找到`財政部電子發票整合服務平台`，可以透過發票的前 2 個英文字母+後 8 位數字去查詢發票明細，得到店名`平和溫泉拉麵店`以及地址`262宜蘭縣礁溪鄉德陽村礁溪路五段108巷1號`。

![Pre-Exam/assests/Pasted%20image%2020250524120641.png](/assets/Pre-exam2025/Pasted%20image%2020250524120641.png)

拿`平和溫泉拉麵店 262宜蘭縣礁溪鄉德陽村礁溪路五段108巷1號`去搜尋，會發現根據地址實際的店家應該是`樂山溫泉拉麵`。

![assests/Pasted%20image%2020250524120654.png](/assets/Pre-exam2025/Pasted%20image%2020250524120654.png)

打開 google map 裡面的菜單，前幾張都是幾年前的菜單。剛開始沒有注意，因為之前有出現過`蝦拉`，有試過甚麼櫻花蝦拉麵之類的品項，但是輸入 flag 都是不正確，才留意到菜單照片的年份，往後滑可以找到最近的菜單，上面的第一項就是`蝦拉麵`。

![assests/Pasted%20image%2020250524120747.png](/assets/Pre-exam2025/Pasted%20image%2020250524120747.png)

```txt
AIS3{樂山溫泉拉麵:蝦拉麵}
```

## web - Tomorin db 🐧

先把壓縮檔下載下來，可以看到原始碼：

![Pasted%20image%2020250529210040.png](/assets/Pre-exam2025/Pasted%20image%2020250529210040.png)

如果進到`/flag`就會跳轉到 youtube，不死心的試了一些`../flag`之類的，很不幸還是跳轉到 youtube。後來試了 URL 編碼：

```txt
http://chals1.ais3.org:30000/%2e%2e%2f%2e%2e%2fflag
```

跳轉後得到 flag：

![Pasted%20image%2020250524134744.png](/assets/Pre-exam2025/Pasted%20image%2020250524134744.png)

```txt
AIS3{G01ang_H2v3_a_c0O1_way!!!_Us3ing_C0NN3ct_M3Th07_L0l@T0m0r1n_1s_cute_D0_yo7_L0ve_t0MoRIN?}
```

## misc - AIS3 Tiny Server - Web / Misc

在本地嘗試，想到上一題的`Tomorin db 🐧`，就試`%2f%2f`，結果去到上層目錄。

![Pasted%20image%2020250524150853.png](/assets/Pre-exam2025/Pasted%20image%2020250524150853.png)

所以在正式環境也比照辦理 ( 比賽寫 writeup 的時候沒有截到這個畫面補一下 )：

![Pasted%20image%2020250529212532.png](/assets/Pre-exam2025/Pasted%20image%2020250529212532.png)

在網址的地方加上`/readable_flag_somerandomstring`( 比賽的時候沒有留下那一串就先不打了在圖片裡 )，找到 flag

![Pasted%20image%2020250524150722.png](/assets/Pre-exam2025/Pasted%20image%2020250524150722.png)

( 賽後寫 writeup 進去 flag 看起來好像不太一樣 ⬇️ )

![Pasted%20image%2020250529212940.png](/assets/Pre-exam2025/Pasted%20image%2020250529212940.png)

```txt
AIS3{tInY_We8_$eRv3R_w17H_FIle_8R0Ws1ng_As_@_Fe@Tur3}
```

# Pre-exam

## rev - AIS3 Tiny Server - Reverse

打開 Ghidra 之後，可以找到一個 function 判斷 flag 正確與否：
![Pasted%20image%2020250525145719.png](/assets/Pre-exam2025/Pasted%20image%2020250525145719.png)

把 function 的內容拿出來按照邏輯去還原。

```python
local_3e = [
    0x33,
    0x20,
    0x38,
    0x58,
    0x12,
    0x28,
    0x5C,
    0x47,
    0x29,
    0x52,
    0x2D,
    0x0F,
    0x5A,
    0x0A,
    0x0E,
    0x00,
    0x0F,
    0x58,
    0x13,
    0x50,
    0x19,
    0x5A,
    0x19,
    0x34,
    0x58,
    0x31,
    0x33,
    0x43,
    0x13,
    0x41,
    0x04,
    0x5A,
    0x19,
    0x34,
    0x58,
    0x2C,
    0x33,
    0x53,
    0x46,
    0x03,
    0x1E,
    0x48,
    0x4A,
    0x4A,
    0x14,
]

local_49 = [0x72, 0x69, 0x6B, 0x6B, 0x69, 0x5F, 0x6C, 0x30, 0x76, 0x33]

bVar5 = 0x33
result = []

for i in range(45):
    bVar1 = local_49[i % 10]
    decoded_byte = bVar1 ^ bVar5
    result.append(chr(decoded_byte))
    bVar5 = local_3e[i + 1] if i + 1 < len(local_3e) else 0

flag = "".join(result)
print(flag)
```

執行之後找到 flag：

![Pasted%20image%2020250525150039.png](/assets/Pre-exam2025/Pasted%20image%2020250525150039.png)

```txt
AIS3{w0w_a_f1ag_check3r_1n_serv3r_1s_c00l!!!}
```

## rev - web flag checker

打開網頁之後沒有看到甚麼特別的，先開 F12 看到原始碼是 wasm。

![Pasted%20image%2020250526032308.png](/assets/Pre-exam2025/Pasted%20image%2020250526032308.png)

基本沒有看過 wasm 的題目， 先把重要的`$func8`、`flagchecker`丟給 chatgpt 分析一下具體在做甚麼，然後把 script 調整成可以去判斷 rotations 多少是可以生成正確可顯示字串：

```python
import struct
import itertools

signed_values = [
    7577352992956835434,
    7148661717033493303,
    -7081446828746089091,
    -7479441386887439825,
    8046961146294847270,
]

rotations = [45, 28, 42, 39, 61]

def to_unsigned64(s):
    return s & 0xFFFFFFFFFFFFFFFF

values = [to_unsigned64(s) for s in signed_values]

def rotate_right(n, d, bits=64):
    d %= bits
    return ((n >> d) | (n << (bits - d))) & ((1 << bits) - 1)

def is_printable(s):
    return all(32 <= ord(c) < 127 for c in s)

all_candidates = []

print("🔍 Candidate strings per value:\n")

for idx, val in enumerate(values):
    candidates = []
    for rot in range(64):
        rotated = rotate_right(val, rot)
        try:
            s = struct.pack("<Q", rotated).decode("utf-8")
            if "AIS3{" in s or is_printable(s):
                candidates.append((rot, s))
        except:
            continue

    all_candidates.append(candidates)
    print(f"Value #{idx + 1}:")
    for rot, s in candidates:
        print(f"  ROT: {rot:2}, DECODED: {s}")
    print()

print("🔎 Searching for valid flag combinations...\n")

for combo in itertools.product(*all_candidates):
    strings = [s for _, s in combo]
    full_string = "".join(strings)
    if "AIS3{" in full_string and "}" in full_string:
        start = full_string.find("AIS3{")
        end = full_string.find("}", start)
        if end > start:
            flag = full_string[start : end + 1]
            print("✅ Found potential flag:")
            print("ROT sequence:", [r for r, _ in combo])
            print("Flag:", flag)
            break




flag_bytes = bytearray()
for val, rot in zip(values, rotations):
    rotated = rotate_right(val, rot)
    flag_bytes.extend(struct.pack("<Q", rotated))



flag = flag_bytes.decode("utf-8")
print("Flag:", flag)
print("Rotations:", rotations)
```

執行後去檢查前面的字串是否正確，調整 rotations ，得到 flag：

![Pasted%20image%2020250526032459.png](/assets/Pre-exam2025/Pasted%20image%2020250526032459.png)

```txt
AIS3{W4SM_R3v3rsing_w17h_g0_4pp_39229dd}
```
