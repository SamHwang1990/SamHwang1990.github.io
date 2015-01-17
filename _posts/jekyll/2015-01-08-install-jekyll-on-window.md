---
layout: post
title: Windows 下的配置
category: jekyll
tags: ['jekyll', 'github-pages']
---

由于Jekyll 依赖于Ruby 等软件或者库，所以在Windows 下安装Jekyll 的注意事项更多要参照各个[依赖项]({{site.url}}/blog/jekyll/install-jekyll-intro.html#article_nav_0 "安装Jekyll 的依赖项")来整，比如windows 下要怎么安装ruby等等。

本文介绍的是我一开始在win7 下使用Jekyll 时遇到的一个问题以及其解决办法：使用命令 `jekyll serve` 来本地浏览jekyll blog 时auto-regeneration 出错。

## 使用--watch 参数

本地预览Jekyll blog 时，一般会使用命令：`jekyll serve`，然后默认运行在 `localhost:4000` 上。

这里涉及一个很有用的选项：`--watch`。这个选项的作用是，当调用 `serve` 命令成功把网站跑起来后，我们可以修改源码，然后网站会自动重新编译，保持更新，然后我们刷新浏览器就能看到变化了，是不是很爽！熟悉Nodejs 的朋友，可以把这个选项理解成 `supervisor`。

> 友情一顶：`jekyll serve` 命令默认包含 `--watch` 选项。
>
> 友情再顶：`--watch` 选项还可以用在其他命令中，比如 `jekyll build`，效果就是简单的自动编译代码，但并不能把网站挂到`localhost:4000` 上，详细的请查阅：《[运行Jekyll]({{site.url}}/blog/jekyll/run-jekyll.html)》，里面介绍了相关命令。

那么，问题来了，在windows 下使用 `--watch` 选项时的效果并没有和我们想象的一样，这里并不是说它不会自动编译，而是它不总会自动编译，哈哈，这里的区别很拗口吧！

简单说来，`--watch` 是否生效很看它心情，有的时候它能自动编译，有的时候是隔很久时间才会自动编译，甚至它会罢工。没错，这货的脾性比女性同胞还复杂。

哈，在程序的世界里，只要你能发现问题所在，就不会找不到解决方案，谢谢谷哥同学鼎力帮助！详细方法见下节！

## 安装wdm
解决方法很简单，就是安装 `wdm` 这个ruby 的库，命令如下：

	gem install wdm

另外，也可以用 `bundle` 一步安装哈，把下面的语句添加到根目录的 `Gemfile` 文件中，记得要以独立的一行来添加哦：

	gem 'wdm', '~> 0.1.0' if Gem.win_platform?

然后运行 `bundle install` 命令来安装！

## 测试成果
好了，安装完成后，再次运行 `jekyll serve` 来预览网站，然后修改下源码，神奇的事情就这样马上花生了，永不落后，keep walking~~~

![after install wdm on windows]({{site.url}}/image/2015-01/windows-wdm-auto-regeneration.png)

全文终！