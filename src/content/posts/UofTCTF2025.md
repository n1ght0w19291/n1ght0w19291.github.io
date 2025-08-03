---
title: UofTCTF 2025
published: 2025-01-11
updated: 2025-07-09
description: "UofTCTF 2025 Writeup"
image: ""
tags: ["CTF Writeup"]
category: "CTF Writeup"
draft: false
---

# UofTCTF 2025

## Misc

### Math Test

題目有 1000 題數學題，寫 script 去解題

```py
import socket
import re
import time

server_ip = "34.66.235.106"
server_port = 5000

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    sock.connect((server_ip, server_port))
    print(f"Connected to {server_ip}:{server_port}")

    time.sleep(2)

    while True:
        output = sock.recv(1024).decode()
        if output:
            print(f"Received: {output}")

            match = re.search(r"Question: (.*)", output)
            if match:
                question = match.group(1)
                print(f"Solving: {question}")

                try:
                    res = eval(question)
                    print(f"Answer: {res}")

                    sock.sendall(f"{res}\n".encode())

                    time.sleep(1)
                except Exception as e:
                    print(f"Error calculating answer: {e}")
                    break
            else:
                print("No question found, exiting.")
                break
        else:
            print("No output received.")
            break
except Exception as e:
    print(f"Error connecting to server: {e}")
finally:
    sock.close()

print("Test completed.")

```

![flag](/assets/UofTCTF/MathTest/image.png)

```
uoftctf{7h15_15_b451c_10_7357_d16u153d_45_4_m47h_7357}
```
