---
title: Micro-CMS v1
published: 2025-07-22
updated: 2025-07-22
description: "hacker101"
image: ""
tags: ["CTF Writeup", "hacker101", "Web"]
category: "hacker101"
draft: false
---

不想做正事，練一下

# Micro-CMS v1

在 `Create a new page` 裡面發現支援 markdown 但是不支援 script，第一個想法是 XSS，第二個是不能用 js 就試試看 img 標籤加 onerror

![alt text](/assets/hacker101/Micro-CMS_v1/image.png)

結果是可以做到 XSS

![alt text](/assets/hacker101/Micro-CMS_v1/image-1.png)

然後在 source code 這邊看到 flag

![alt text](/assets/hacker101/Micro-CMS_v1/image-5.png)

接下來在 Title 中輸入 xss payload 成功拿到 flag

![alt text](/assets/hacker101/Micro-CMS_v1/image-3.png)

發現剛剛建立的新頁面是 `page/8` 猜測前面 `3-7` 都不是空著的，檢查了一下發現 `page/6` 是 forbidden，其他頁面是 404

![alt text](/assets/hacker101/Micro-CMS_v1/image-2.png)

最後從 `/page/edit/6` 看到 flag

![alt text](/assets/hacker101/Micro-CMS_v1/image-4.png)

然後真的沒有想法了，去開提示，真心不喜歡這個提示設計，一定要從第一個 flag0 的提示開始開，每個 flag 之間還要等一個小時 www

等了 n 個小時終於等到一條提示：

> Have you tested for the usual culprits? XSS, SQL injection, path injection

那就先試試 SQL injection 吧，因為 page 的跳轉是靠數字去做查詢，先試試`' OR '1'=='1`，在 `/page/1` 沒有反應，但在 `/page/edit/1` 成功了

![alt text](/assets/hacker101/Micro-CMS_v1/image-6.png)

下班 xddd

![alt text](/assets/hacker101/Micro-CMS_v1/image-7.png)
