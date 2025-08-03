---
title: Micro-CMS v2
published: 2025-07-22
updated: 2025-07-22
description: "hacker101"
image: ""
tags: ["CTF Writeup", "hacker101", "Web"]
category: "hacker101"
draft: false
---

# Micro-CMS v2

![index](/assets/hacker101/Micro-CMS_v2/image.png)

`changelog` 說已經修正了 v1 的眾多安全漏洞和常規功能錯誤，並且加了身分驗證

![changelog](/assets/hacker101/Micro-CMS_v2/image-1.png)

`create a new page` 按下去之後會是到 `/login`

![login](/assets/hacker101/Micro-CMS_v2/image-2.png)

看到 input 猜一下是不是 sql injection，先試試看帳號 `admin' or '1'=='1'--` 密碼 `123`，遇到 internal server error

![internal server error](/assets/hacker101/Micro-CMS_v2/image-3.png)

試了帳號 `' OR 1=1 #` 然後密碼隨便打，但結果出現 invalid password，猜應該是會拿帳號去取得密碼，然後看使用者輸入的密碼是否一致，所以應該不能這樣繞過去，去看看提示

> - Regular users can only see public pages
> - Getting admin access might require a more perfect union
> - Knowing the password is cool, but there are other approaches that might be easier

依照提示用 UNION 處理，用帳號 `' UNION SELECT 'mypassword' -- ` 以及密碼 `mypassword`

前面會找不到空字串的帳號，所以也找不到密碼，這時候用 `UNION SELECT 'mypassword'` 去強制塞入自己指定的密碼，然後密碼欄位輸入相同的密碼，就能成功登入

![login success](/assets/hacker101/Micro-CMS_v2/image-4.png)

接著到 `Private Page` 就可以得到第一個 flag

![flag0](/assets/hacker101/Micro-CMS_v2/image-5.png)

先試試看還有沒有上一題的 xss 漏洞，但是都沒有成功

![test xss](/assets/hacker101/Micro-CMS_v2/image-6.png)

去看看提示

> - What actions could you perform as a regular user on the last level, which you can't now?
> - Just because request fails with one method doesn't mean it will fail with a different method
> - Different requests often have different required authorization

還是有點沒想法，登出在登入之後看到註解裡面有提示

![hint](/assets/hacker101/Micro-CMS_v2/image-7.png)

居然讓我拿真的帳號密碼，呃...我想想

先試試看用其他 method 去請求看看，開 postman

試試看幾個網址之後發現 `/page/edit/1` 以及 `/page/create` 都有四種

![test edit page](/assets/hacker101/Micro-CMS_v2/image-8.png)  
![test create page](/assets/hacker101/Micro-CMS_v2/image-9.png)

都試過之後，在 拿到 flag

![flag1](/assets/hacker101/Micro-CMS_v2/image-10.png)

那就剩下剛剛瞄到的註解提示了，再去開 flag2 的提示

> - Credentials are secret, flags are secret. Coincidence?

我猜這是帳號或密碼本身就是 flag 的意思???

不知道，用 sqlmap 處理好了

```bash
sqlmap -u "https://c9abfc5faea5761b54be7a2783b08a17.ctf.hacker101.com/login" \
--data="username=admin&password=admin" \
--forms --risk=3 --level=5 --dump --batch
```

測試結果是這是一個名稱為 `level2` 的 database，有兩個 table ，分別是 `admins` 以及 `pages`

得到 username 是 `rebecka`，密碼是 `jeannette`

![sqlmap result](/assets/hacker101/Micro-CMS_v2/image-11.png)

得到 flag2

![flag2](/assets/hacker101/Micro-CMS_v2/image-12.png)

---

![end](/assets/hacker101/Micro-CMS_v2/image-13.png)

我還是太菜了，有些提示沒有可能會讓我通靈一輩子 www
