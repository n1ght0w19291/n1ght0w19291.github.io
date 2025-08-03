---
title: SummerFan
published: 2025-02-20
updated: 2025-07-09
description: "Dreamhack Blitz CTF #4"
image: ""
tags: ["CTF Writeup", "Dreamhack", "Reverse"]
category: "Dreamhack"
draft: false
---

# Summer Fan

題目

> 여름은 갔지만,, 열이올라요... 더울 때 이걸 사용해줘! :fan:

跟之前一樣先把 apk 拆開再說

```bash
apktool d SUMMER_FAN.apk
```

找了一圈沒有找到 flag，查一下對於 android 逆向大神都是怎麼做的

文章連結：[Android App 逆向入門之一：拆開與重組 apk](https://www.ctfiot.com/28150.html)、[開源項目精選: 手把手教你如何用 JADX 反編譯 APK](https://openingsource.org/258/zh-tw/)

先查看 `AndroidManifest.xml`

```xml
<?xml version="1.0" encoding="utf-8" standalone="no"?><manifest xmlns:android="http://schemas.android.com/apk/res/android" android:compileSdkVersion="32" android:compileSdkVersionCodename="12" package="com.example.summer" platformBuildVersionCode="32" platformBuildVersionName="12">
    <application android:allowBackup="true" android:appComponentFactory="androidx.core.app.CoreComponentFactory" android:dataExtractionRules="@xml/data_extraction_rules" android:fullBackupContent="@xml/backup_rules" android:icon="@mipmap/ic_main" android:label="@string/app_name" android:roundIcon="@mipmap/ic_main_round" android:supportsRtl="true" android:theme="@style/Theme.SUMMER">
        <activity android:exported="true" android:name="com.example.summer.MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        <service android:name="com.example.summer.TimerService"/>
    </application>
</manifest>
```

pakagename 是 `com.example.summer` ，有一個 activity `com.example.summer.MainActivity`

下載 JADX

![jadx](/assets/dreamhack/SummerFan/image.png)

在 `SUMMER_FAN\smali\com\example\summer\MainActivity.smali` 找到

```java
private final void checkTime(Intent intent) {
    Toast.makeText(this, (((int) intent.getDoubleExtra(TimerService.TIME_EXTRA, 0.0d)) % 86400) / 3600 >= 31337 ? generateFlag() : "플래그를 주기엔 아직 너무 더운걸...", 0).show();
}

private final String generateFlag() {
    ArrayList arrayList = new ArrayList();
    int size = MainActivityKt.getFLAG().size();
    for (int i = 0; i < size; i++) {
        arrayList.add(Character.valueOf((char) ((MainActivityKt.getFLAG().get(i).intValue() ^ StringsKt.first(MainActivityKt.getKEY().get(i % MainActivityKt.getKEY().size()))) - gen(i))));
    }
    return CollectionsKt.joinToString$default(arrayList, "", null, null, 0, null, null, 62, null);
}

```

把這些跟 `generateFlag` 有關的函式跟變數拿出來寫成.java

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

public class Main {
    private static final List<Integer> FLAG = Arrays.asList(
            220, 211, 180, 230, 192, 22, 341, 220, 227, 341,
            139, 163, 355, 293, 333, 196, 142, 216, 376, 133,
            248, 26, 342, 378, 231, 149, 145, 173, 185, 1, 10, 198
    );

    private static final List<String> KEY = Arrays.asList(
            "h", "o", "t", "_", "h", "o", "t", "_", "s", "u",
            "m", "m", "m", "e", "r", "r"
    );

    public static void main(String[] args) {
        Main main = new Main();
        String flag = main.generateFlag();
        System.out.println("FLAG: " + flag);
    }

    private String generateFlag() {
        ArrayList<Character> arrayList = new ArrayList<>();
        int size = FLAG.size();
        int keySize = KEY.size();

        for (int i = 0; i < size; i++) {
            char decodedChar = (char) ((FLAG.get(i) ^ KEY.get(i % keySize).charAt(0)) - gen(i));
            arrayList.add(decodedChar);
        }
        return joinToString(arrayList);
    }

    private int gen(int i) {
        int size = KEY.size();
        return (((int) Math.pow(i, 3.0)) % 256) ^ KEY.get(size - ((i % size) + 1)).charAt(0);
    }

    private String joinToString(List<Character> list) {
        StringBuilder sb = new StringBuilder();
        for (Character ch : list) {
            sb.append(ch);
        }
        return sb.toString();
    }
}

```

執行之後就拿到 flag 了

![flag](/assets/dreamhack/SummerFan/image-2.png)

中間試過很多起模擬器用 Frida 之類的，都弄不起來，耗了不少時間  
三個小時的 challenge 完成的時候只剩下八分鐘  
滿喜歡 Dreamhack 的 Blitz CTF 的，有點像 CTF 版的 Leetcode 每日  
下次繼續 ( • ̀ω•́ )
