---
title: Carbon Diary
published: 2025-08-25
updated: 2025-08-28
description: "減碳系統團隊專案紀錄"
image: "/assets/project/utaipei_carbon_diary/carbon_img.png"
tags: ["Project", "UTaipei"]
category: "Project"
draft: false
---

# Carbon Diary

## 介紹

減碳系統開發團隊  
2024/08 - 2025/07

> 學生用餐時若有攜帶環保餐具，可掃描店家 QRCode，並於本系統紀錄減碳次數，管理員可於管理者介面檢視減碳紀錄、抽獎名單及下載.csv。

負責前端開發，並且參與後續維護。

因學校政策，減碳系統無後續使用規劃，於 2025 年 7 月停止維護。

`React` | `Next.js` | `TypeScript` | `CSS`

![about team](/assets/project/utaipei_carbon_diary/about_team.png)

![Contributor](/assets/project/utaipei_carbon_diary/contributor.png)

[查看專案 > Carbon Diary](https://portal.utaipei.edu.tw/)  
因專案已停止維護，可能會有憑證過期等相關錯誤，導致無法進入網頁或無法顯示。

### 期間在前端的貢獻

- 串接並改寫 Login API 為 TypeScript
- 設定 middleware 權限控管
- 新增月曆搜尋功能
- 新增關於團隊頁面
- 新增使用者浮動按鈕（floating button）
- 新增使用者區間紀錄查詢功能
- 新增設定選單（setting menu）
- 串接 Summarize API
- 建立管理者頁面基本排版
- 建立管理者公告列表與公告表單 UI
- 建立使用者公告列表
- 串接管理者公告 API
- 在登入頁面 Footer 新增版號顯示
- 為所有頁面撰寫 Playwright E2E 測試
- 持續除錯與修復前端問題

## 心得

### 開端

這個專案的開始，是因為學校政策，才有機會參與這個新的挑戰。  
[Portal](/posts/project/utaipei_portal/) 目前還是用 `.jsx` 居多，所以這應該算是我第一次完整以 TypeScript 開發的專案。同時，這也是我初次接觸 `Next.js`。  
經過開會決議，減碳系統有了自己的名字 —— Carbon Diary。

從找設計師到上版到在測試環境進行驗證，我們趕在九月初完成了第一次的 demo，確保功能沒有錯誤。  
然後，第一次的活動期間就開始了，同時我們也在準備第二次的上版，新增了更多頁面，甚至後來的管理者頁面。

### 從學生減碳系統到減碳系統

最初，系統的使用者僅限學生，但隨著需求擴展，也有部分教職員開始使用。這導致我們必須調整 middleware 的設定，以符合不同角色的需求。  
後來我們還對專案進行了重構，並且 SA 大神 Brian 加上了 Playwright 的 e2e 測試，讓系統更加穩定。

然而，隨著學校政策的改變，減碳系統最終沒有後續的使用規劃，並於 2025 年 7 月正式停止維護，走向了故事的終點。

### 總結

老實說，看到一個自己投入了將近兩百小時的專案走到終點，心情確實難免有些失落。畢竟在這段時間裡，花了許多心力去學習、開發與維護。  
但同時，這也是一次完整的經歷：從零開始建立一個系統，到隨著需求成長進行重構，再到最後的收尾。這些經驗都成為未來的重要養分。

雖然 Carbon Diary 停止了，但我相信在這裡練習過的技術與解決問題的能力，會繼續延伸到接下來的專案與挑戰中。
