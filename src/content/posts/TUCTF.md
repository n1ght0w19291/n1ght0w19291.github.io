---
title: TUCTF
published: 2025-01-25
updated: 2025-07-09
description: "TUCTF Writeup"
image: ""
tags: ["CTF Writeup"]
category: "CTF Writeup"
draft: false
---

# TUCTF

## Forensics

### Mystery Presentation

拿到一個 pptx

![pptx](/assets/TUCTF/MysteryPresentation/image-1.png)

![openPPTX](/assets/TUCTF/MysteryPresentation/image.png)

透過開頭的`pk`以及`docMetadata/LabelInfo.xml`判斷這個 pptx 是壓縮檔，所以對 pptx 解壓縮

![secret_data](/assets/TUCTF/MysteryPresentation/image-2.png)

解壓縮後可以看到一個`secret_data.7z`，解壓縮後得到 flag.txt

![flag](/assets/TUCTF/MysteryPresentation/image-3.png)

```
TUCTF{p01yg10+_fi1e5_hiddin9_in_p1@in_5i9h+}
```

### Packet Detective

![pcap](/assets/TUCTF/PacketDetective/image.png)

flag 在最後一筆

![flag](/assets/TUCTF/PacketDetective/image-1.png)

```
TUCTF{N3tw0rk_M4st3r}
```
