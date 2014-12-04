---
layout: post
title: Jekyll 简介
category: jekyll
tags: ['jekyll']
---

>GitHub Pages为了提供对HTML内容的支持，选择了[Jekyll](https://github.com/jekyll/jekyll "Jekyll GitHub 库") 作为模板系统，Jekyll是一个强大的静态模板系统，作为个人博客使用，基本上可以满足要求，也能保持管理的方便，你可以查看[Jekyll官方文档](http://jekyllrb.com/ "Jekyll 官方文档")。
> 
>From <https://help.github.com/articles/what-are-github-pages/>

把握下面几点，基本可以对Jekyll 能做什么以及怎么做到的，能有个大体的了解了：

##Jekyll，一个静态站点生成器
Jekyll 是用Ruby 写的，所以，了解一点Ruby 的话，对后期的各种折腾会很有帮助估计！鄙人不才，所以很少折腾，2333！

虽然使用Ruby 来写，但Jekyll 下的蛋并没有什么动态功能，完全就是一静态网站！Jekyll 下的蛋被放置在一个叫 `_site` 的目录中，在目录中基本就只有html、css、js、img 等等，反正就是静态内容了

所谓的动态功能，都只存在于给网站编码的阶段！

##Jekyll 写博客为什么爽YY？
Jekyll的核心其实就是一个文本的转换引擎，用你最喜欢的标记语言写文档，所以说，你能使用Markdown 或者Textile 来写，如果你不知道G 点在哪，看下[Markdown 的API](http://wowubuntu.com/markdown/ "Markdown 语法说明 (简体中文版) ") 吧！

##Jekyll 的网站能有什么功能？
Jekyll 提供模板、变量、插件等功能，基本能满足一个博客网站的基础功能，比如：

* 模板、模板组件解耦；
* 文章发布，有两种类型（Post 和 Page）；
* 文章Meta 信息；
* 文章列表页，或者叫Archive Pages；
* 标签云，或者叫Tag Cloud；
* 文章分类列表，或者叫Category List；
* 最新文章；
* 列表分页；

另外，还有两个常用的功能的实现不能通过Jekyll 自身实现，但只需要敲写JS 代码即可完成：

* 文章评论，调用使用Disqus 或者 多说 等等；
* 社交化平台分享，调用现成的JS 库或者自己调用各种平台的API；

当然，如果还有某些你需要的功能不能通过Jekyll 已有的API 或者 JS 来实现的话，可能需要自己写Plugin 或者 调用现成的Plugin。

> 这里要提醒，GitHub Pages 由于安全原因，Pages 的编译器不允许网站调用Plugin，但如果你非要调用Plugin，可以自己本地调用好，然后本地编译好所有资源，还记得吗，这些资源会放置在 `_site` 目录下。编译好后，把 `_site` 目录push 到 [Pages 项目](https://github.com/SamHwang1990/SamHwang1990.github.io) 中，此时Pages 的编译器会检查 `_site` 下的内容，如果不为空，则不会使用自身的编译器去编译，而会直接把 `_site` 目录的内容发布到网站上。

## 全文 &bull; 终
看完上文，对Jekyll 的细节如果还有很强兴趣，可以等我更新[系列教程]({{site.url}}/blog/jekyll/build-github-pages-by-jekyll.html "使用Jekyll 搭建Github 个人博客 系列教程")，或者直接看Jekyll 的[官方文档](http://jekyllrb.com/ "Jekyll 官方文档")（[中文版](http://jekyllcn.com/ "Jekyll 官方文档中文版")）

**Jekyll 的简单介绍到这里 &bull; 完！**

