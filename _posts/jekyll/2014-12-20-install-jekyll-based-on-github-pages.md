---
layout: post
title: 基于GitHub Pages 安装Jekyll
category: jekyll
tags: ['jekyll', 'github-pages']
---

> 本文基本上是从GitHub 上翻译过来的，讲究看看？把握好关键点就好！

> 原文：[Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages/ 'Using Jekyll with Pages')

##0. 安装Jekyll
强烈建议在您的电脑上安装Jekyll，以便在把博客更新到GitHub Pages 仓库前，能够先预览一下网站，找出内容上可能的错误或者因程序出错引起的编译错误等问题。

幸运的是，可以通过使用 [the GitHub Pages Gem](https://github.com/github/pages-gem) 以及 GitHub Pages 的依赖组件系统，我们可以很简单的在电脑上安装Jekyll 并很大程度上匹配GitHub Pages 的设置。

安装Jekyll 能简单到什么程度？其实，你只需完成下面的几个步骤就OK了：

###0.1. 安装Ruby
Jekyll 运行在Ruby 上，所以，你懂的！如果你使用Mac，你电脑分分钟已经安装了Ruby。

打开终端，运行一下命令即可知道有没有安装Ruby，以及Ruby 的版本：`ruby --version`。

GitHub Pages 需要Ruby 的版本至少是 `1.9.3` 或者 `2.0.0`。如果你已经满足上面Ruby 的条件，可以直接跳到第二个步骤了，否则，看看[这些文章](https://www.ruby-lang.org/en/downloads/)去安装Ruby 吧!

###0.2. 安装Bundler
Bundler 是Ruby 上一个组件包版本管理的利器。你想在本地上安装 GitHub Pages 的环境，安装Bundler 就很有必要了！可以通过以下命令完成安装：

`gem install bundler`。

###0.3. 安装Jekyll
好，高潮来了，终于要装Jekyll 了。

你需要在网站的根目录创建一个名为`Gemfile`的文件，并在里面添加一行命令：

`gem 'github-pages'`

然后，打开终端，切换到网站根目录，运行以下命令：

`bundle install`

然后，然后没有然后了，github-pages 顺利安装好了~~~

> github-pages 安装好了，就等于Jekyll 安装好了亲！ 

> 再来一个高潮：如果嫌安装github-pages 的速度有点慢，不妨在Gemfile 的顶部加多一行：http://ruby.taobao.org/。把这次安装的源改为淘宝的源，那速度杠杠滴。

> 最后，更详细介绍更改Ruby gem 源的文章见下面的链接：[修改ruby gem源为ruby.taobao.org](http://www.cnblogs.com/andycnzh/p/3627824.html)。

##1. 运行Jekyll
为了更好的模拟GitHub Pages 的编译环境，最好使用Bundler 来运行Jekyll。在网站的根目录下运行以下命令来运行Jekyll：

`bundle exec jekyll serve`

默认下，能通过 `http://localhost:4000`来访问本地的Pages 网站。

##2. 更新 Jekyll
由于Jekyll 是一个开源项目，而且经常会有更新，影响是，如果GitHub Pages 的编译器更新了jekyll，而我们本地的jekyll 还是在旧的版本，就很有可能会导致网站在本地的表现与线上Github Pages 网站不一样。所以，保持Jekyll 与Github Pages 编译器用的一样是超级超级重要的，运行下面的命令就很好的达到目的：

`bundle update`。

这里更加体现了，使用github-pages 来安装Jekyll 是多么的好呀~~~