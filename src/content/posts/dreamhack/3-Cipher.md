---
title: 3-Cipher
published: 2025-01-30
updated: 2025-07-09
description: "Dreamhack Blitz CTF#2"
image: ""
tags: ["CTF Writeup", "Dreamhack", "Crypto"]
category: "Dreamhack"
draft: false
---

# 3-Cipher

題目

> 3-cipher.py는 Key1, Key2, AES_iv, AES_cipher_text를 출력하는 암호화 프로그램입니다.  
> AES_cipher_text는 플래그를 암호화한 문자열이고, Key1, Key2, AES_iv는 플래그 복호화에 필요한 값입니다.  
> AES_cipher_text를 복호화하여 플래그를 구하세요. 플래그는 FLAG 변수에 있습니다.  
> 플래그 형식은 DH{...} 입니다.

3-cipher.py

```py
#!/usr/bin/env python3

from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from base64 import b64encode
from Crypto.Util.Padding import pad
import string

try:
    FLAG = open("flag", "rb").read()        # flag is here!
except:
    FLAG = b'[**FLAG**]'

class AES_Cipher:
    def __init__(self):
        self.key = get_random_bytes(16)
    def encrypt(self, data: bytes):
        cipher = AES.new(self.key, AES.MODE_CBC)
        self.iv = b64encode(cipher.iv).decode('utf-8')
        self.cipher_t = b64encode(cipher.encrypt(pad(data, AES.block_size))).decode('utf-8')
        return 'AES_iv: ' + self.iv + '\nAES_cipher_text: ' + self.cipher_t

class RSA_Cipher:
    def __init__(self):
        self.e = 65537
        self.n = 13119132709177697801
    def encrypt(self, data: int):
        cipher_n = pow(data, self.e, self.n)
        return cipher_n

class Caesar_Cipher:
    def __init__(self):
        self.alpha = list(string.ascii_lowercase)
    def encrypt(self, data: str):
        cipher_t = [i for i in range(len(data))]
        for i in range(len(data)):
            ch = data[i]
            if(ch in self.alpha):
                idx = self.alpha.index(ch)
                cipher_t[i] = self.alpha[(idx + 13) % 26]
            else:
                cipher_t[i] = ch
        return ''.join(cipher_t)


ac = AES_Cipher()
rc = RSA_Cipher()
cc = Caesar_Cipher()

ac_key = int.from_bytes(ac.key, 'big')

# Key 1
rc_p = hex(ac_key)[2:16]
rc_c = rc.encrypt(int(rc_p, 16))
print('Key1:', hex(rc_c)[2:])

# Key 2
cc_p = hex(ac_key)[16:]
cc_c = cc.encrypt(cc_p)
print('Key2:', cc_c)

# Result
print(ac.encrypt(FLAG))
```

輸出

```
Key1: a2261df72c92c922
Key2: 26278o6415949oqn06
AES_iv: 0FVXK8rOgrGWpXSrTAhDYg==
AES_cipher_text: qqD5QHpddaV0QxWsfeTa3A==
```

`Key1` 是 `ac_key` 的前 14 個字符，用 RSA 加密過

`Key2` 是 `ac_key` 後半部分，用 ROT13 (Caesar Cipher) 加密過

Key1 + Key2 會獲得完整 ac_key

用 `AES.new(ac.key, AES.MODE_CBC, iv)` 進行 AES 解密

用 unpad 移除填充，取得 FLAG

把 n 拿去 factordb

![factorDB](/assets/dreamhack/3-Cipher/image.png)

```
p = 3573716833
q = 3671005097
```

script

```py
from base64 import b64decode
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from Crypto.Util.number import long_to_bytes
import string

KEY1 = "a2261df72c92c922"
KEY2 = "26278o6415949oqn06"
AES_IV = b64decode("0FVXK8rOgrGWpXSrTAhDYg==")
AES_CIPHER_TEXT = b64decode("qqD5QHpddaV0QxWsfeTa3A==")

e = 65537
n = 13119132709177697801
p = 3573716833
q = 3671005097

def decrypt_rsa(cipher_text_hex):
    cipher_text = int(cipher_text_hex, 16)
    d = pow(e, -1, (p - 1) * (q - 1))
    decrypted_int = pow(cipher_text, d, n)
    return long_to_bytes(decrypted_int)

def rot13_decrypt(cipher_text):
    alpha = string.ascii_lowercase
    decrypted = []
    for ch in cipher_text:
        if ch in alpha:
            idx = alpha.index(ch)
            decrypted.append(alpha[(idx - 13) % 26])
        else:
            decrypted.append(ch)
    return ''.join(decrypted)

Key1_decrypted = decrypt_rsa(KEY1).hex()

Key2_decrypted = rot13_decrypt(KEY2)

aes_key_hex = Key1_decrypted + Key2_decrypted
aes_key = bytes.fromhex(aes_key_hex)

cipher = AES.new(aes_key, AES.MODE_CBC, iv=AES_IV)
flag = unpad(cipher.decrypt(AES_CIPHER_TEXT), AES.block_size)

print("FLAG:", flag.decode())
```

執行結果

![test result](/assets/dreamhack/3-Cipher/image-2.png)

開虛擬機後得到的題目是

```
Key1: 5dcf8df268608c3
Key2: s380r0p091qs7q9sos
AES_iv: eSnk/TTlXp4ZgHxIKEXmYw==
AES_cipher_text: q5olGh0B/7TloXWgZqtfvjF85AY1wA08Seq/+arA2DDzF7BhFRMrlpowvZJcfNBfR9oj3bnd6nqMwy2woe56EwlNpBNkcdQEzhfn+RCPWp8=
```

執行 script 結果

![flag](/assets/dreamhack/3-Cipher/image-1.png)
