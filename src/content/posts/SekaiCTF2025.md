---
title: SekaiCTF 2025
published: 2025-08-18
updated: 2025-08-18
description: "SekaiCTF 2025 writeup"
image: "/assets/SekaiCTF2025/cover.png"
tags: ["CTF Writeup"]
category: "CTF Writeup"
draft: false
---

![score](/assets/SekaiCTF2025/image.png)

排名：441 / 1060

這次寫出來的題目不多 QAQ，因為 HITCON 出門了兩天，之後回家只想睡覺 w

這次主辦方的網站有機器人驗證，但需要一直過機器人驗證就有點煩，而且每個題目 launch 的時間只有五分鐘  
除了解出來的兩題之外，還有嘗試 Reverse 的 `Sekai Bank - Signature`  
`Sekai Bank - Signature` 要逆向 .apk，有看到 api 的部分，可以註冊帳號拿到有效的 token，不過剩下的好像需要簽章，不確定簽章的部分要怎麼處理

過幾天再去看電神們的 writeup

---

# SekaiCTF 2025

## Web

### My Flask App

![](/assets/SekaiCTF2025/IMG-20250816122257236.png)

這一題在 `Dockerfile` 可以看到 flag 的檔名後面有隨機的英文數字，不能直接猜

![](/assets/SekaiCTF2025/IMG-20250816125529384.png)

`app.py` 裡面有使用 `filename` 讀檔功能，但是又不確定檔案名稱是甚麼，只能先去常見目錄查找

![](/assets/SekaiCTF2025/IMG-20250816125551123.png)

最後在 `/proc/self/mounts` 裡面找到 flag.txt 的名稱

![](/assets/SekaiCTF2025/IMG-20250816125026406.png)

就找到 flag 了

![](/assets/SekaiCTF2025/IMG-20250816125128034.png)

```txt
SEKAI{15-7H1s-3VEN-(all3d_a_cv3}
```

## Misc

### Sanity Check

這題純粹的簽到題，只要加入 Discord 就可以在 `#announcement` 上方看到 flag

![](/assets/SekaiCTF2025/IMG-20250816125313918.png)

```txt
SEKAI{The_Fragmented_SEKAI_and_The_MIKU_Who_Can't_Sing}
```
