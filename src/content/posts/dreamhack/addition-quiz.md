---
title: addition-quiz
published: 2025-01-30
updated: 2025-07-09
description: "Dreamhack CTF Season 5 Round #2"
image: ""
tags: ["CTF Writeup", "Dreamhack", "Misc"]
category: "Dreamhack"
draft: false
---

# addition-quiz

題目是

> 랜덤한 2개의 숫자를 더한 결과가 입력 값과 일치하는지 확인하는 과정을 50번 반복하는 프로그램입니다. 모두 일치하면 flag 파일에 있는 플래그를 출력합니다. 알맞은 값을 입력하여 플래그를 획득하세요.  
> 플래그 형식은 DH{...} 입니다.

![chall](/assets/dreamhack/addition-quiz/image.png)

從題目給的 `chall.c` 格式是 `num1+num2=?\n`

```py

from pwn import *
from struct import *

r = remote('host1.dreamhack.games', 17403) # ip, port

for i in range(50):
    data = r.recvline().decode().strip()
    print(f"Received: {data}")
    nums = data.split(" ")[0].split("+")
    num1 = int(nums[0])
    num2 = int(nums[1].split('=')[0])
    r.sendline(str(num1 + num2))

r.interactive()

```

![flag](/assets/dreamhack/addition-quiz/image-1.png)
