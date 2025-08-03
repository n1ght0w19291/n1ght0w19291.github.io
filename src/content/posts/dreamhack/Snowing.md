---
title: Snowing
published: 2025-01-30
updated: 2025-07-09
description: "Dreamhack"
image: ""
tags: ["CTF Writeup", "Dreamhack", "Forensics"]
category: "Dreamhack"
draft: false
---

# Snowing

題目是

> 드림이 : 우와! 밖에 눈이 많이와요!  
> 드림맘 : 그렇네~  
> 드림이 : 거의 모두 하얀공간뿐이네요.

這一題是 White Space Steganography，可以在 `flag.txt` 裡面看到很多空格

```bash
sudo apt install stegsnow
stegsnow -C ./9603a472-1bde-401f-a6fb-7d5acd71e93f/DH/flag.txt
```

![flag](/assets/dreamhack/Snowing/image.png)
