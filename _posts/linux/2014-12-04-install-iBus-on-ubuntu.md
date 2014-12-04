---
layout: post
title: 在Ubuntu 上安装中文输入法（iBus）
category: linux
tags: ['Linux']
---

##0. 安装语言支持（Apply Language Support）

###0.1. 找到系统设置（`System Settings`）中的 `Language Support`
![Language Support]({{site.url}}/image/2014-12/find-language-support.png "find-language-support")

###0.2. 选择要安装的输入法和语言包
![choice-input-method]({{site.url}}/image/2014-12/choice-input-method.png "choice-input-method")

![install-language-support]({{site.url}}/image/2014-12/install-language-support.png "install-language-support")

###0.3. 重新登陆系统
安装完语言包和输入法后，`Log Out` 后再`Log In`。

###0.4. 添加`Chinise(Sun Pinyin)` 到`Text Entry`
![add-sunpinyin-to-textEntry]({{site.url}}/image/2014-12/add-sunpinyin-to-textEntry.png "add-sunpinyin-to-textEntry")

##1. 修复部分拼音组合不识别的问题
这里指的不识别部分拼音组合的问题，以我遇到过的来说，几乎都是包含`v` 和`ue` 这两种。比如，原始的iBus 输入法不能输入“学”、“缺”等词，修复方法如下：

`sudo apt-get install ibus-libpinyin`

上面的命令会安装一个输入法引擎：`Ibus Intelligent Pinyin engine`。然后进入`Text Entry Settings`，添加`Chinese（Intelligent Pinyin）` Input Source。