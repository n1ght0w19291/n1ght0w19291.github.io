---
title: vault-door
published: 2025-12-26
description: "picoCTF"
image: "/assets/picoCTF/vault-door/cover.png"
tags: ["CTF Writeup", "picoCTF", "Reverse"]
category: "picoCTF"
draft: true
---

# picoCTF: vault-door

## Reverse Engineering

### \[Medium\] vault-door-1

`VaultDoor1.java` 會逐一檢查輸入密碼中各個 index 是否等於指定字元，  
且密碼長度固定為 32。由於驗證條件完全寫死在程式碼中，  
因此只要根據 index 將對應字元重新排列，即可還原原始密碼。

![](/assets/picoCTF/vault-door/IMG-20251226195429998.png)

由於驗證邏輯僅依據 index 對應字元進行比較，  
因此可以將所有條件整理後，透過腳本一次性還原完整密碼。

以下為還原密碼的 Python 腳本：

```python
password = [''] * 32

password[0]  = 'd'
password[29] = 'c'
password[4]  = 'r'
password[2]  = '5'
password[23] = 'r'
password[3]  = 'c'
password[17] = '4'
password[1]  = '3'
password[7]  = 'b'
password[10] = '_'
password[5]  = '4'
password[9]  = '3'
password[11] = 't'
password[15] = 'c'
password[8]  = 'l'
password[12] = 'H'
password[20] = 'c'
password[14] = '_'
password[6]  = 'm'
password[24] = '5'
password[18] = 'r'
password[13] = '3'
password[19] = '4'
password[21] = 'T'
password[16] = 'H'
password[27] = '7'
password[30] = '3'
password[25] = '_'
password[22] = '3'
password[28] = '9'
password[26] = 'e'
password[31] = '8'

print(''.join(password))
```

![](/assets/picoCTF/vault-door/IMG-20251226200213269.png)

### \[Medium\] vault-door-3

`VaultDoor3.java` 會先對輸入的字串進行多段索引重排，  
再將重排後的結果與寫死的字串進行比對。  
由於整個驗證過程僅涉及索引位置的交換，並未對字元本身做任何轉換，  
因此此題可以透過逆向還原索引關係，將重排後的字串還原為原始密碼。

![](/assets/picoCTF/vault-door/IMG-20251226200910414.png)

以下為還原密碼的 Python 腳本：

```python
buffer = "jU5t_a_sna_3lpm18gb4c_u_4_m2r640"

password = [''] * 32

for i in range(0, 8):
    password[i] = buffer[i]

for i in range(8, 16):
    password[23 - i] = buffer[i]

for i in range(16, 32, 2):
    password[46 - i] = buffer[i]

for i in range(17, 32, 2):
    password[i] = buffer[i]

print("".join(password))
```

![](/assets/picoCTF/vault-door/IMG-20251226200818342.png)

### \[Medium\] vault-door-4

此題刻意混用十進位、十六進位、八進位與字元常數，  
但在 Java 中最終都會轉為 byte 進行比較。  
因此只需將所有數值轉換為對應的 ASCII 字元並重新排列即可。

![](/assets/picoCTF/vault-door/IMG-20251226202427341.png)

以下為還原密碼的 Python 腳本：

```python
cmp = [
    106 , 85  , 53  , 116 , 95  , 52  , 95  , 98  ,
    0x55, 0x6e, 0x43, 0x68, 0x5f, 0x30, 0x66, 0x5f,
    0o142, 0o131, 0o164, 0o63 , 0o163, 0o137, 0o66 , 0o64 ,
    ord('e'), ord('1'), ord('3'), ord('d'), ord('0'), ord('0'), ord('b'), ord('2')
]

password = [''] * 32

for i in range(8):
    password[i * 4 + 0] = chr(cmp[i])
    password[i * 4 + 1] = chr(cmp[i + 8])
    password[i * 4 + 2] = chr(cmp[i + 16])
    password[i * 4 + 3] = chr(cmp[i + 24])

print("".join(password))
```

![](/assets/picoCTF/vault-door/IMG-20251226202402327.png)

### \[Medium\] vault-door-5

此題的驗證流程包含兩個階段：  
首先將原始密碼進行自製的 URL encoding，  
再將編碼後的結果轉為 Base64 字串，最後與預期值比較。

需要注意的是，程式中使用的 URL encoding 並非標準實作，  
而是直接以 `%xx` 格式輸出 byte 的十六進位表示，  
因此無法直接使用一般的 URL decode 函式處理，  
必須手動解析每一段十六進位數值後才能正確還原原始字串。

![](/assets/picoCTF/vault-door/IMG-20251226204100673.png)

以下為還原密碼的 Python 腳本：

```python
import base64

expected = (
    "JTYzJTMwJTZlJTc2JTMzJTcyJTc0JTMxJTZlJTY3JTVm"
    "JTY2JTcyJTMwJTZkJTVmJTYyJTYxJTM1JTY1JTVmJTM2"
    "JTM0JTVmJTYyJTY1JTM5JTY2JTMxJTMwJTYxJTM0"
)

step1 = base64.b64decode(expected).decode()
result = ""

i = 0
while i < len(step1):
    if step1[i] == '%':
        hex_part = step1[i+1:i+3]
        result += chr(int(hex_part, 16))
        i += 3
    else:
        result += step1[i]
        i += 1

print(result)
```

![](/assets/picoCTF/vault-door/IMG-20251226204028272.png)

### \[Medium\] vault-door-6

此題對密碼的每一個 byte 進行 XOR，  
並將結果與預先定義的 byte 陣列進行比較。  
由於 XOR 屬於可逆運算，且使用的 key 為固定值 `0x55`，  
因此只需再次對每個 byte 進行相同的 XOR 操作，  
即可還原出原始的 ASCII 字元。

![](/assets/picoCTF/vault-door/IMG-20251226204545819.png)

以下為還原密碼的 Python 腳本：

```python
cmp = [
    0x3b, 0x65, 0x21, 0xa , 0x38, 0x0 , 0x36, 0x1d,
    0xa , 0x3d, 0x61, 0x27, 0x11, 0x66, 0x27, 0xa ,
    0x21, 0x1d, 0x61, 0x3b, 0xa , 0x2d, 0x65, 0x27,
    0xa , 0x67, 0x65, 0x67, 0x62, 0x6c, 0x6d, 0x66,
]

password = [''] * 32

for i in range(32):
    password[i] = cmp[i] ^ 0x55

print(''.join(map(chr, password)))
```

![](/assets/picoCTF/vault-door/IMG-20251226204528771.png)

### \[Hard\] vault-door-7

此題利用位元左移與 OR 將 4 個 ASCII byte 打包成一個 32-bit int。  
由於此操作不涉及任何不可逆轉換，  
因此可透過右移並搭配 AND `0xFF` 將每個 byte 還原。

![](/assets/picoCTF/vault-door/IMG-20251226204657409.png)

以下為還原密碼的 Python 腳本：

```python
x = [0] * 8

x[0] = 1096770097
x[1] = 1952395366
x[2] = 1600270708
x[3] = 1601398833
x[4] = 1716808014
x[5] = 1734292070
x[6] = 825440356
x[7] = 858796849

password = [''] * 32

for i in range(8):
    for j in range(4):
        password[i * 4 + j] = chr((x[i] >> ((3 - j) * 8)) & 0xFF)

print(''.join(password))
```

![](/assets/picoCTF/vault-door/IMG-20251226210823233.png)

### \[Hard\] vault-door-8

此題會對每個字元的 bit 位置進行多次交換（bit permutation），  
整個過程不涉及任何加密或雜湊，  
而是透過一系列固定的 bit swap 操作來混淆原始字元。

![](/assets/picoCTF/vault-door/IMG-20251226224000492.png)

![](/assets/picoCTF/vault-door/IMG-20251226224033241.png)

![](/assets/picoCTF/vault-door/IMG-20251226224056203.png)

由於 bit swap 本身是可逆的，  
只要按照相反順序套用相同的交換邏輯，  
即可將每個 byte 還原回原始的 ASCII 值，  
進而復原完整的密碼字串。

以下為還原密碼的 Python 腳本：

```python
def switchBits(c: chr, p1: int, p2: int):
    mask1 = (1 << p1)
    mask2 = (1 << p2)
    bit1 = (c & mask1)
    bit2 = (c & mask2)
    shift = (p2 - p1)
    rest = (~(mask1 | mask2) & c)
    result = ((bit1 << shift) | (bit2 >> shift) | rest) & 0xFF
    return result

def reverse(password: str) -> str:
    a = []
    for i in range(32):
        c = ord(password[i])
        c = switchBits(c, 6, 7)
        c = switchBits(c, 2, 5)
        c = switchBits(c, 3, 4)
        c = switchBits(c, 0, 1)
        c = switchBits(c, 4, 7)
        c = switchBits(c, 5, 6)
        c = switchBits(c, 0, 3)
        c = switchBits(c, 1, 2)
        a.append(chr(c))
    return "".join(a)

if __name__ == "__main__":
    expected = [
      0xF4,
      0xC0,
      0x97,
      0xF0,
      0x77,
      0x97,
      0xC0,
      0xE4,
      0xF0,
      0x77,
      0xA4,
      0xD0,
      0xC5,
      0x77,
      0xF4,
      0x86,
      0xD0,
      0xA5,
      0x45,
      0x96,
      0x27,
      0xB5,
      0x77,
      0xA4,
      0xA4,
      0xA4,
      0xD1,
      0xE1,
      0xC2,
      0xB4,
      0xA4,
      0xF1
    ]
    password = "".join([chr(x) for x in expected])
    result = reverse(password)
    print("Recovered password: " + result)
```

![](/assets/picoCTF/vault-door/IMG-20251226223139115.png)
