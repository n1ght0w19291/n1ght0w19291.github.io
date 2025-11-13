---
title: 2025 臺北秋季程式設計節 城市通微服務大黑客松
published: 2025-10-28
updated: 2025-11-12
description: "2025 臺北秋季程式設計節 參加紀錄與心得"
image: "/assets/activity/codefest-2025-fall/cover.png"
tags: ["Hackathon", "Codefest"]
category: "Event Journal"
draft: true
---

# 2025 臺北秋季程式設計節 城市通微服務大黑客松

## **TL;DR**

後面章節有詳細心得，這邊先講重點：

### 本次黑客松 feature

> 主題：運動之都  
> 應用名稱： `Jo Exercise`
>
> 前端：Flutter + Vite + Vue 3 + TypeScript + Firebase Hosting  
> 後端：Python + MQTT + PostgreSQL

<details>
<summary>Jo Exercise 應用頁面截圖</summary>

<div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;">
  <img src="/assets/activity/codefest-2025-fall/image-4.png" alt="頁面" style="width: 200px;">
  <img src="/assets/activity/codefest-2025-fall/image-5.png" alt="頁面" style="width: 200px;">
  <img src="/assets/activity/codefest-2025-fall/image-6.png" alt="頁面" style="width: 200px;">
  <img src="/assets/activity/codefest-2025-fall/image-7.png" alt="頁面" style="width: 200px;">
  <img src="/assets/activity/codefest-2025-fall/image-8.png" alt="頁面" style="width: 200px;">
  <img src="/assets/activity/codefest-2025-fall/image-9.png" alt="頁面" style="width: 200px;">
  <img src="/assets/activity/codefest-2025-fall/image-10.png" alt="頁面" style="width: 200px;">
  <img src="/assets/activity/codefest-2025-fall/image-11.png" alt="頁面" style="width: 200px;">
  <img src="/assets/activity/codefest-2025-fall/image-12.png" alt="頁面" style="width: 200px;">
</div>
</details>

<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
    <img src="/assets/activity/codefest-2025-fall/image-13.png" alt="Github Contribution" style="max-width: 50%; height: auto;" />
    <small>（圖：2025 臺北秋季程式設計節 比賽期間的前端 GitHub Contribution Graph）</small>
</div>

---

## 前言

每次參加黑客松都沒留下紀錄，覺得有點可惜。  
這次在比賽前就先把 `.md` 開好了，終於要好好記下來了。

## 賽前

### 書審

~~書審我覺得難度不大~~，關鍵是所有隊員的自我介紹要完整，內容盡量補齊。像是：

- 各自的技能（參與過哪些專案、比賽經驗、技術棧）
- 團隊職務（例：本次負責前端）

主辦方建議團隊最好包含前端、後端、資料工程與專案規劃等角色。  
我們隊的組成都不完全符合他們建議的技能組合（例如雖然有人懂後端，但不一定是 Spring Framework 或 Hibernate 專長），不過實際上影響不大。  
比賽只要求最後的 Demo 能展示在他們的 Flutter app 上（town-pass 那個 repo 一定要能跑起來），其餘前後端技術並沒有限制。

### 工作坊

> 2025/10/24 (五)

我參加的三次黑客松裡面，只有最近兩次有第二階面試的篩選。  
我參加的團隊兩次都不用面試，可以直接進初賽，所以面試內容分享不了 ฅ^•ﻌ•^ฅ

前幾次工作坊我最喜歡的是趙局長的演講，這次沒有真的是太可惜了。  
這次由架構師講解了比賽內容，整體跟上次差不多，只是他們的 repo 重新建立了一次，所以讓大家幫忙去按星星。  
我感覺這次的評分機制比之前嚴謹多了 —— 上次那個一人隊伍進決選真的太誇張，上臺根本在唬爛。

另外，主辦方把需要面試的隊伍分成兩組，數量還不一樣，猜測可能兩組問的問題也不同（？）  
信件裡原本說「面試兩分鐘，深入了解團隊技術背景」，還說可以準備簡報（但沒準備也沒關係）；結果現場又說想聽聽大家對市政的想法（就是主題方向那種想法）。  
雖然跟說好的不太一樣，但反正我們沒被叫去面試，可以安心吃午餐 😌

<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
    <img src="/assets/activity/codefest-2025-fall/workshop.jpg" alt="2025-10-24 工作坊" style="max-width: 50%; height: auto;" />
</div>

### 小插曲

有隊友要參加推甄，之前都跟我們說應該可以參加黑客松。  
主辦有規定團隊有狀況需要提前在 10/31 以前說，但他的二階公布在 10/31 以後。  
允許我們在公布當天視情況退隊。  
只是說真的，都知道自己要推甄了，能不能早點講啊 💢  
都 10/27 了還要我們主動問才知道。

## 賽中

> 2025/11/08（五） ~ 2025/11/09（六）

想看比賽成品細節可以回去 [TL;DR](/posts/activity/codefest-2025-fall/#tldr) 看，這邊就不多說了。

工作坊結束時填寫過回饋表單，我在上面寫這次沒有趙局長的演講很可惜，沒想到比賽當天局長把演講補回來了 www

一進門看到大紅色的婚宴圓桌，我感覺我來錯了地方。

<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
    <img src="/assets/activity/codefest-2025-fall/image-3.png" alt="2025-11-08 場地" style="max-width: 50%; height: auto;" />
</div>

主辦這次送了超大滑鼠墊、一件黑色薄外套、一個~~仿菜市場買菜袋子的~~提袋，其他的不說，來過兩次就知道後面熬夜的時候這個外套絕對不夠暖。  
上面有趙局長精心設計的 logo，連車輪餅上都有烙 logo，看得出局長對這設計真的超滿意w

<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
    <img src="/assets/activity/codefest-2025-fall/image-2.png" alt="車輪餅" style="max-width: 50%; height: auto;" />
</div>

前端 UI 其實刻滿快的，很快就開始跟後端的要要看有沒有 API 可以串接，沒有就開始研究看看 Flutter 的 GPS 功能要怎麼傳到 Firebase Hosting 的前端。  
不確定是 Dart 那邊沒寫好，還是前端呼叫方式錯了，邊開系學會的線上幹部會議邊 debug，最後已經花了三個小時還是沒有成功，只能先放著看看有沒有下一件事情。  
大概凌晨兩點開始串接 API。那時候後端還沒有全部完成，加上我的 WSL 又有點死了，只能他們先給規格，前端先串 API，串完再進行測試以及修改。  
凌晨四點多的時候後端部屬上去，前端開始測試，發現除了後端預計的 200 跟 422，出現了一些 403、307 之類的錯誤，開始到處 debug。

<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
    <img src="/assets/activity/codefest-2025-fall/image-1.png" alt="2025-11-09 日出" style="max-width: 50%; height: auto;" />
</div>

最後 deploy 到 Firebase Hosting 的時候，發現其他功能都是正常的，只有即時通訊的部分傳送按鈕沒有反應，剛開始以為是 BaseButton 元件的問題，後來測試完發現是 Firebase Hosting 給的網址是 HTTPS，但是 MQTT 的連線是用 WS（非加密），所以失敗了。

:::note
Firebase Hosting 僅支援 HTTPS，所以若使用 MQTT 需改為 wss://，否則會因為混合內容被瀏覽器封鎖。
:::

前面隊友 Anorak 以為沒事了，狂喝能量飲料讓自己保持清醒，桌上大概堆了八、九瓶，結果最後一刻才發現這問題，看起來快急死了，趕快在伺服器那邊加上 SSL 憑證更改一些設定，終於在開始初選前一兩分鐘成功連線，他絕對是天才。  
學弟妹要去參賽的話，記得~~出門要帶憑證，現場簽一個也行~~。

雖然沒進決選，但是還是很好奇能進決選的其他隊伍都做了甚麼，不過聽沒兩組就直接睡著了。  
喔對了，強烈譴責 BlueBoy 把我睡在地板的照片傳出去 www  
~~早知道我也拍一張你在懶骨頭有點死了的照片給佳衛~~

最後主辦還有準備蘋果糖/糖葫蘆，沒有跟上流行，沒吃懂，但這間店是從台南來的，~~怎麼不甜~~

<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
    <img src="/assets/activity/codefest-2025-fall/image.png" alt="蘋果糖" style="max-width: 50%; height: auto;" />
</div>

## 心得

coding 的同時，官方攝影師一直在到處拍，真的很不自在，尤其知道會被剪進去影片裡面 www  
然後官方會採訪隊伍，輪到我們的時候大家開始閃採訪，成功躲過去了 w  
~~我不想跟 waaaaaaaiting 還有瑪麗亞一樣變梗圖~~

### 前兩次黑客松回顧

在聊這次黑客松之前，先偷偷講一下前兩次的經驗，細節有點忘記了，就不另外開一篇了 XD  
我很喜歡臺北程式設計節的其中一個原因在於他們禁止以簡報呈現（~~禁止畫餅~~），即便是最後交出來的是屍體也得 coding，這才是屬於開發者的黑客松 🔥  
第一次參加黑客松的時候，從晚上十一點一路卡到凌晨五點，才終於把功能做出來，進入決選對我來說都是其次，feature 完成那一刻的成就感，讓我又去參加了第二次黑客松。  
這兩次之間累積了一些開發經驗，讓我發現平常開發的節奏和黑客松完全是兩回事 —— 黑客松的節奏更快，得在一天內生出新的 feature。
不過這也不是什麼大問題，做完自己的 task 沒有甚麼事情之後，就開始看隊友卡 bug、順便看 PM 抓狂( ◕‿‿◕ )

發現之前的 repo 還有人留著沒有刪掉，截個 Contribution Graph 紀念一下。

<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
    <img src="/assets/activity/codefest-2025-fall/ContributionCodefest2024Spring.png" alt="2024-05 Github Contribution Graph" style="max-width: 50%; height: auto;" />
    <small>（圖：2024 臺北春季程式設計節 比賽期間的 GitHub Contribution Graph）</small>
    <img src="/assets/activity/codefest-2025-fall/ContributionCodefest2024Fall.png" alt="2024-09 Github Contribution Graph" style="max-width: 50%; height: auto;" />
    <small>（圖：2024 臺北秋季程式設計節 比賽期間的 GitHub Contribution Graph）</small>
</div>

另外，還有四個高中同學也參加了 2024 臺北秋季程式設計節的初賽，都分別屬於不同隊伍，偶爾會去串門子，根本就是資訊班群的同學會。  
然後清晨再跟隊友出去看日出 🌅

<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
    <img src="/assets/activity/codefest-2025-fall/sunrise.jpg" alt="2024-09-09 日出" style="max-width: 50%; height: auto;" />
</div>

### 這次黑客松心得

這次我們的隊友都屬於跨領域型的工程師，不過少了一個專門負責發想與報告的人。上次學姊太全能，又發想主題又當設計師，但我們這次~~出門沒有帶 UI/UX 設計師~~，要自己想辦法。  
好消息是人人都有專題，~~拼一拼又是一個好專案~~，我的意思是分工超級明確 w

凌晨 debug 時，一個隊友打瞌睡一直點頭、另一個聽到錯誤就「啊？」  
真的讓人無法專心思考 💢  
想睡的拜託去旁邊睡，這句話是認真的 www  
我只是想好好 debug 而已，~~我想看日出~~

很感謝這次的隊友們，我們成功在二十四小時內完成一個微服務，整體來說應該算完整，我覺得大家超強的。  
感謝 Anorak，最後一小時緊急處理剛發現的 MQTT 連線問題，辛苦了。  
感謝 ErEr，infra 大神，還處理了沒有人碰過的 websocket + MQTT 問題，報告辛苦了。  
感謝 BlueBoy，古希臘掌管後端 API 的神，還有凌晨到前端支援 debug，感謝全能電神。  
感謝 ayuki，處理 DB 設計以及想辦法讓報告能順利進行的同時，還要克服你這兩天倒楣到極致的運氣，真的很不容易。  
感謝隊友們！！！

這兩天真的不想再 coding 了。  
一個黑客松讓我在 WakaTime 榜單衝到台灣第 9 名，有點太累了。

<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 16px 0;">
    <img src="/assets/activity/codefest-2025-fall/image-14.png" alt="WakaTime Leaderboard" />
    <small>（圖：2025-11-11 WakaTime）</small>
</div>

黑客松真的很消耗體力，尤其是不睡覺的，不知道之後有沒有體力再參加 (⋟﹏⋞)  
~~但反正下一次春季是雙北的暫時不考慮~~，我需要找到時間好好休息。

---

終於整理完了  
期中真的地獄，根本「期中月」。  
從 10/9 開始，撐到 11/21 才正式考完期中考。

接著還有 AICUP 初賽截止、台北探索、期末報告……  
真的每天都在被事情追著跑。

好久沒打 CTF 了，~~已經一個多月沒玩了~~。  
等寒假再看看吧 (╥﹏╥)

最後的最後再次感謝隊友們 🙏
