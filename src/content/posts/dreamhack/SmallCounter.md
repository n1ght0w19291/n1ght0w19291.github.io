---
title: Small Counter
published: 2025-02-20
updated: 2025-07-09
description: "Dreamhack Blitz CTF #12"
image: ""
tags: ["CTF Writeup", "Dreamhack", "Reverse"]
category: "Dreamhack"
draft: false
---

# Small Counter

題目：

> 플래그를 생성하는 함수 flag_gen()을 호출하고 플래그를 출력하세요.  
> 플래그 형식은 DH{...} 입니다.

開 Ghidra

![main](/assets/dreamhack/SmallCounter/image.png)

![flag_gen](/assets/dreamhack/SmallCounter/image-1.png)

把這兩個函式轉成 cpp

```cpp
#include <stdio.h>
#include <string.h>
#include <ctype.h>

void flag_gen(char *param_1, char *param_2, int param_3){
    char lowercase[27] = "abcdefghijklmnopqrstuvwxyz";
    char uppercase[27] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    char shifted_lowercase[27] = {0};
    char shifted_uppercase[27] = {0};
    int local_24, local_1c, local_20;
    char local_25;

    for (local_20 = 0; local_20 < 26; local_20++){
        shifted_lowercase[(local_20 + param_3) % 26] = lowercase[local_20];
        shifted_uppercase[(local_20 + param_3) % 26] = uppercase[local_20];
    }

    shifted_lowercase[26] = '\0';
    shifted_uppercase[26] = '\0';

    printf("Shifted Lowercase: %s\n", shifted_lowercase);
    printf("Shifted Uppercase: %s\n", shifted_uppercase);

    local_24 = 0;
    while (local_24 < strlen(param_1)){
        local_25 = param_1[local_24];

        if (islower(local_25)){
            param_2[local_24] = shifted_lowercase[local_25 - 'a'];
        }
        else if (isupper(local_25)){
            param_2[local_24] = shifted_uppercase[local_25 - 'A'];
        }
        else if (isdigit(local_25)){
            local_1c = ((int)local_25 * (param_3 + 3)) % 9;
            if (local_1c < 8 || local_1c > 9){
                local_1c += 0x32;
            }
            else{
                local_1c += 0x28;
            }
            param_2[local_24] = (char)local_1c;
        }
        else{
            param_2[local_24] = local_25;
        }
        local_24++;
    }
    param_2[local_24] = '\0';
}

int main(void){
    char local_a8[80];
    char flag_part[] = {
        0x49, 0x4d, 0x7b, 0x35, 0x30, 0x38, 0x38, 0x38,
        0x39, 0x6a, 0x33, 0x32, 0x6a, 0x38, 0x37, 0x6a,
        0x39, 0x6a, 0x67, 0x35, 0x34, 0x36, 0x35, 0x30,
        0x38, 0x34, 0x30, 0x34, 0x32, 0x38, 0x68, 0x6a,
        0x68, 0x69, 0x32, 0x69, 0x69, 0x30, 0x38, 0x68,
        0x37, 0x34, 0x69, 0x68, 0x6a, 0x35, 0x33, 0x38,
        0x68, 0x35, 0x34, 0x33, 0x6a, 0x37, 0x67, 0x36,
        0x6b, 0x35, 0x6a, 0x6b, 0x38, 0x6a, 0x69, 0x68,
        0x32, 0x32, 0x66, 0x7d, 0x00};
    for (auto const &x : flag_part){
        printf("%c", x);
    }
    printf("\n");
    puts("Nice!");
    flag_gen(flag_part, local_a8, 5);
    printf("\n%s\n", local_a8);
    return 0;
}
```

執行結果

```bash
IM{508889j32j87j9jg54650840428hjhi2ii08h74ihj538h543j7g6k5jk8jih22f}
Nice!
Shifted Lowercase: vwxyzabcdefghijklmnopqrstu
Shifted Uppercase: VWXYZABCDEFGHIJKLMNOPQRSTU

DH{}
```
