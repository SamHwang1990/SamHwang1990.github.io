---
layout: post
title: 独立安装 Jekyll
category: jekyll
tags: ['jekyll']
---

## 0. 安装Jekyll
安装之前，要先知道Jekyll 的[依赖项]({{site.url}}/blog/jekyll/install-jekyll-intro.html#article_nav_0)（最主要就是Ruby了），并一一安装完毕。

> 注意了，原则上，Jekyll 是不建议在Windows 系统上运行的，如果你非要这么做（我就是这么捉急的人），不妨看看这篇文章：[Windows-specific docs page](http://jekyllrb.com/docs/windows/#installation)，如果你是个英文文盲，那就等我放大招吧（很快了）。

### 0.1. 安装Ruby
Jekyll 运行在Ruby 上，所以，你懂的！如果你使用Mac，你电脑分分钟已经安装了Ruby。

打开终端，运行一下命令即可知道有没有安装Ruby，以及Ruby 的版本：`ruby --version`。

GitHub Pages 需要Ruby 的版本至少是 `1.9.3` 或者 `2.0.0`。如果你已经满足上面Ruby 的条件，可以直接跳到第二个步骤了，否则，看看[这些文章](https://www.ruby-lang.org/en/downloads/)去安装Ruby 吧!

### 0.2. 安装Jekyll
使用Ruby 的gem 来安装Jekyll，gem 可以理解为库管理器，相当于nodejs 中的npm，一般安装Ruby 的时候已经把gem 给安装好了。在终端运行以下命令即可完成Jekyll 的安装：

	gem install jekyll 

如果嫌安装jekyll 的速度有点慢，可以运行以下命令，更改gem 的安装源改成淘宝的资源：

	gem sources -a http://ruby.taobao.org/

把这次安装的源改为淘宝的源，那速度杠杠滴。

最后，更详细介绍更改Ruby gem 源的文章见下面的链接：[修改ruby gem源为ruby.taobao.org](http://www.cnblogs.com/andycnzh/p/3627824.html)。

##1. 运行Jekyll
运行Jekyll，在网站的根目录下运行以下命令：

`jekyll serve`

默认下，能通过 `http://localhost:4000`来访问本地的Pages 网站。