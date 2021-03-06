---
layout: post
title: 在Ubuntu 上安装 oh-my-zsh
category: linux
tags: ['Linux','zsh']
---

## 0. 依赖软件（Dependencies） ##
oh-my-zsh 的安装依赖于以下两个软件：`git`、`zsh`。

这两个软件都可以通过软件包来安装：

``sudo apt-get update``

``sudo apt-get git``

``sudo apt-get zsh``

安装完之后，可以在Bash 里面输入 `zsh`，来创建一个新的Shell，并体验 `zsh`。

## 1. 手动安装

### 1.1. 克隆代码库(Clone the repository)

	git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh

最后面的`~/.oh-my-zsh` 可以更改为你的心水目录的路径。

###1.2. 备份已存在的 `~/.zshrc` 文件【可选操作】
	cp ~/.zshrc ~/.zshrc.bak

这里的`~/.zshrc` 文件是 `zsh shell` 的原始配置文件。

###1.3. 使用 oh-my-zsh 的配置文件
通过复制 `oh-my-zsh` 的配置文件模板，来创建新的`Zsh` 配置文件：

	cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc

###1.4. 使用 `Zsh` 为默认的 shell
`chsh -s /bin/zsh`

> 秘密告诉你吧。chsh -s其实修改的就是/etc/passwd文件里和你的用户名相对应的那一行。现在我来查看下：
>
> From: [《用chsh选择shell》](http://roclinux.cn/?p=739 "《用chsh选择shell》")

###1.5. 重启系统，完成配置
`sudo shutdown -r now`