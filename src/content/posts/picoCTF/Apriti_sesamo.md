---
title: Apriti sesamo
published: 2025-07-13
updated: 2025-07-14
description: "picoCTF"
image: ""
tags: ["CTF Writeup", "picoCTF", "Web"]
category: "picoCTF"
draft: false
---

# Apriti sesamo

首頁按下 `login` 之後會被導到 `/impossibleLogin.php`

![index](/assets/picoCTF/Apriti_sesamo/image.png)

有先試試看是不是 sql injection ，但是沒有甚麼反應

![login](/assets/picoCTF/Apriti_sesamo/image-1.png)

嘗試 `username=admin&pwd[0]=admin` ，出現 error message，推測與 PHP 的 array input 特性有關

![alt text](/assets/picoCTF/Apriti_sesamo/image-2.png)

從 error message 可以知道有用 `sha1()` 去驗證

之後沒有甚麼想法就去看題目給的提示，提示是 `Backup file` ，檢查出存在 `/impossibleLogin.php~`，程式註解中有判斷的邏輯

![alt text](/assets/picoCTF/Apriti_sesamo/image-3.png)

總之就是 username 跟 password 的內容要不一樣，但是他們的 sha1 必須要是一樣的內容

```php
<!--?php
 if(isset($_POST[base64_decode("\144\130\x4e\154\x63\155\x35\x68\142\127\125\x3d")])&& isset($_POST[base64_decode("\143\x48\x64\x6b")])){$yuf85e0677=$_POST[base64_decode("\144\x58\x4e\154\x63\x6d\65\150\x62\127\x55\75")];$rs35c246d5=$_POST[base64_decode("\143\x48\144\153")];if($yuf85e0677==$rs35c246d5){echo base64_decode("\x50\x47\112\x79\x4c\172\x35\x47\x59\127\154\163\132\127\x51\x68\111\x45\x35\166\x49\x47\132\163\131\127\x63\x67\x5a\155\71\171\111\x48\x6c\166\x64\x51\x3d\x3d");}else{if(sha1($yuf85e0677)===sha1($rs35c246d5)){echo file_get_contents(base64_decode("\x4c\151\64\166\x5a\x6d\x78\x68\x5a\x79\65\60\145\110\x51\75"));}else{echo base64_decode("\x50\107\112\171\x4c\x7a\65\107\x59\x57\154\x73\x5a\127\x51\x68\x49\105\x35\x76\111\x47\132\x73\131\127\x63\x67\x5a\155\71\x79\x49\110\154\x76\x64\x51\x3d\75");}}}?-->
```

根據 PHP 特性，當傳入 username[]=A 與 password[]=B 時

- `$_POST['username']` 與 `$_POST['password']` 會是陣列
- $a == $b：當兩個陣列內容不相等時，`==` 會回傳 false
- sha1(array)：在 PHP 中，sha1(array) 會觸發 warning 並回傳 NULL

用 `Burp Suite` 去改成 `username[]=0&password[]=1`

![alt text](/assets/picoCTF/Apriti_sesamo/image-5.png)

得到 flag

![alt text](/assets/picoCTF/Apriti_sesamo/image-4.png)
