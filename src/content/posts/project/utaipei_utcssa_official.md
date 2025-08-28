---
title: UTCSSA Official
published: 2025-08-28
updated: 2025-08-29
description: "系學會會網專案紀錄"
image: "/assets/project/utaipei_utcssa_official/website_index_mobile.png"
tags: ["Project", "UTaipei"]
category: "Project"
draft: false
---

# UTCSSA Official

## 介紹

北市大資科系系學會技術組 - 系學會網站開發  
2025/07 ~ present

![網站截圖](/assets/project/utaipei_utcssa_official/website_index.png)

> 系學會官方網站，提供公告與活動資訊，作為新生與在校生的資訊入口。

使用 Astro Blog Template - [Yukina](https://github.com/WhitePaper233/yukina)

`Astro` | `JavaScript` | `CSS` | `SSR` | `Supabase` | `Supabase API` | `Github Action`

[查看專案 > UTCSSA](https://utcssa.org/)

### 個人貢獻

- **前端開發**：以現成前端模板為基礎，改為 SSR 架構，並負責後續頁面功能修改與優化
- **公告與活動頁面**：實作後台公告新增功能，方便快速更新與維護，降低使用者技術門檻
- **資料存取**：建立 Supabase 資料表，並於前端串接 API
- **各股介紹**：完成各股介紹及成員名單頁面
- **自動化部署**：撰寫 GitHub Actions YAML，自動化前端部署流程

## 心得

### 故事的起點

這是第 18 屆系學會上任後，技術組接到的第一個任務：打造一個專屬於系學會的網站。  
在我的印象中，系學會好像原本就有這麼一個網站，最多改兩下，能有多難呢？很快我就發現，事情沒有這麼簡單。

上一屆留下來的只是套版的一頁式網頁，並且是設計給技術組的，不符合這次的需求。  
其次，會長提出的需求清單比我想像的龐大，並且要在新生來之前完成。原本暑假已有安排好的計畫，接下這個專案意味著需要調整原有行程，時間上相當緊湊。技術組還沒招募新人，剩下我們這些大三、大四的老人們，而大家手上都有不少事要忙。開會討論時，我得到最多的回應就是：「妳扛。」  
好吧，我扛......  
還好有 infra 大神 ErEr 出手幫忙，協助架設資料庫和處理 Cloudflare 的設定，減輕了不少壓力。

### 開發

因為無法確定之後負責維護會網的管理者是否具備足夠的技術能力，所以公告功能不能設計成「每次發公告都要重新上版」的模式，也就是不能是靜態網頁。  
由於人力有限（主要只有我和 ErEr），我先從現成的前端靜態模板 [Yukina | Astro](https://astro.build/themes/details/yukina/) 開始，將其改為 SSR 架構，並逐步依需求修改與完成各頁面功能。

此外，為了因應檔案存取大小的需求，架設了 Supabase 來解決相關問題。  
我覺得 Supabase 還蠻酷的，它可以讓欄位支援陣列，處理起來相對方便很多。而且 Supabase 本身就提供 API，不需要額外撰寫後端，前端就能直接串接。在人力有限的情況下，這真的是非常合適的解決方案。

### 總結

雖然我們才剛上任，但網站已經順利上線，專案也先告一段落。  
這次會網的開發過程，讓我深刻體會到「從零到一」不只是技術的挑戰，更是一種時間管理與資源分配的考驗。  
雖然過程中有很多壓力，但也因為這個專案，我學到了如何快速整合技術、取捨需求，並且善用工具去解決問題。

能把一個從無到有的網站交付出來，對我來說既辛苦又充滿成就感。  
最後，感謝會長在百忙之中協助確認網站功能與撰寫文案，也再次感謝 infra 大神 ErEr 協助資料庫與 Cloudflare 設定，讓我能專注於前端與開發工作！

---

最後再秀一下好看的網站 link 效果：

<img src="/assets/project/utaipei_utcssa_official/website_link.png" alt="UTCSSA website link" style="max-width: 50%"/>

真的很喜歡設計師大人設計的系學會代表小浣熊，設計師大人最棒了，超讚 ♡
