---
title: d
published: 2025-02-20
updated: 2025-07-09
description: "Dreamhack"
image: ""
tags: ["CTF Writeup", "Dreamhack", "Crypto"]
category: "Dreamhack"
draft: false
---

# d

題目給了一個 script

```py
from Crypto.Util.number import *
from flag import flag

p = bytes_to_long(flag)
assert isPrime(p)
q = getPrime(256)
d = pow(65537, -1, (p - 1) * (q - 1))
print(d)
# 22800184635336356769510601710348610828272762269559262549105379768650621669527077640437441133467920490241918976205665073
```

已知 d 跟 e

查了一下要怎麼由 e 跟 d 反推

文章連結：[密碼學 - RSA 與 PKCS#1](https://codingman.cc/cryptography-rsa-and-pkcs1/)

> ed ≡ 1 (mod φ(n)) --> ed - 1 = k(p - 1)

先找出 ed - 1 的倍數

```py
from Crypto.Util.number import *
from sympy import mod_inverse

e = 65537
d = 22800184635336356769510601710348610828272762269559262549105379768650621669527077640437441133467920490241918976205665073


k = e * d - 1

print(k)
```

得到 k

```
1494255700446038813603416304291116907852512020860105389680719273898055792355796087321348579564087105168984643943590671889200
```

用 factorDB 去得到質數

```py
prime_factors = {
    2: 4,
    3: 1,
    5: 2,
    37: 1,
    1117: 1,
    4029461: 1,
    1403014978139: 1,
    284368748316481195117: 1,
    18741210882440665187461519398960291465361283084482741278982029639876282810203: 1
}

def find_factors(prime_factors):
    factors = {1}
    for prime, exponent in prime_factors.items():
        current_factors = set(factor * (prime ** i) for factor in factors for i in range(exponent + 1))
        factors.update(current_factors)
    return sorted(factors)

f = find_factors(prime_factors)
print(f)

for i in f:
    n = i + 1
    print(n)
    if isPrime(n):
        flag = long_to_bytes(n)
        if b'DH{' in flag:
            print(flag)
            break
```
