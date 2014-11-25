---
layout: post
title: GitHub Pages 简介
category: Jekyll
tags: ['jekyll', 'github-pages']
---

整体来说，这里的简介是翻译 [GitHub Pages](https://help.github.com/categories/github-pages-basics/ "github-pages") 的官网说明。

##GitHub Pages 是什么
>GitHub Pages are public webpages freely hosted and easily published through our site.
>
>From <https://help.github.com/articles/what-are-github-pages/>

官网的说明果然深刻直接，翻译过来就是：*GitHub Pages 就是能让你通过一些很简单的方式，通过GitHub 发布一些网页，免费的哦！*

什么叫*很简单的方式*？就是利用Git 日常的代码管理命令！

##User, Organization, and Project Pages
>There are two basic types of GitHub Pages: User/Organization Pages and Project Pages. They are nearly identical, but there are a few important differences between them.
>
>From <https://help.github.com/articles/user-organization-and-project-pages/>

关键语句还是要看原话的，上面的原话说明，有三种类型的 Pages（User、Organization 和 Project），其中 User 和 Organization 这两种类型的运作方式其实是一样的，差异就是在你这个GitHub 账号的类型。

这三种类型的 Pages 都是基于 HTTP 协议，而不是 HTTPS 协议。所以，你不要用 Pages 来处理一些敏感的业务，比如发送密码或者银行卡卡号等等。

>PS：当 Pages 项目建立，并 push 到 GitHub 后，这个项目无论是不是 private，都能被人公开访问到 Pages 网站。
>
>注意，这里要知道 Pages 的项目和 Pages 的网站，这两个短语的意思是不一样的！假如 Pages 这个项目是 private 的话，这里所说的能公开访问到 Pages 网站，不是指别人能看到你 GitHub 上的Pages 项目源码，而是能通过域名，访问到挂载到 github server 上的网站。 

###User & Organization Pages
User & Organization Pages 是一个很特别的 Repository，特别在以下两点：

* 项目的名称的命名方式只能是：`username.github.io`，而其中的 *username* 是创建这个项目的 GitHub 账户名；
* 项目`master` 分支的内容将会被编译并发布到 GitHub Pages 的网站上。

当 User & Organization Pages 被编译完后，能通过 `http(s)://<username>.github.io` 访问。

###Project Pages
> Both personal accounts and organizations can create Project Pages.
>
> From: <https://help.github.com/articles/user-organization-and-project-pages/#project-pages>

个人或者组织机构的 GitHub 账户都能创建 Project Pages。

个人账户的 Project Pages 的URL 策略是：`http(s)://<username>.github.io/<projectname>`，

组织机构账户的 Project Pages 的 URL 策略是：`http(s)://<orgname>.github.io/<projectname>`。

而创建 Project Pages 的步骤大致上和 User/Organization Pages 是一样的，只有以下几点要注意下：

* 项目 `gh-pages` 分支的内容会被编译并发布到 Project Pages 的网站上； 
* 如果没有对 Project Pages 使用自定义域名，Pages 的网站将通过 User Pages 网站的子路径来访问：`username.github.io/projectname`。组织机构的 Project Pages 命名策略类似；

另外，官网有以下两段话，是关于 Project Pages 自定义域名的问题，因为我还没整过 Project Pages，所以没完全领悟好，这里仅作展示，不做解读：

> A custom domain on User and Organization Pages sites applies the same domain redirect to all Project Pages sites hosted under that account. Project Pages sites that use a custom domain are also available at `username.github.io/projectname` for personal accounts, and `orgname.github.io/projectname` for organizations.
> 
> Custom 404s will only work if a custom domain is used. Otherwise, the User Page 404 is used.

##自定义GitHub Pages 域名
GitHub Pages 允许自定义网站的域名，如果是你觉得 `username.github.io` 这个域名很2333。

<!--more-->

###创建并提交 *CNAME* 文件
为了重定向 Pages 网站到自定义的域名，需要在项目根目录下创建一个 *CNAME* 文件，文件中的内容是目标域名。具体步骤如下：

1. 切换到项目的 Pages 分支：
	* User & Organization Pages 网站为 `master` 分支。
	* Project Pages 网站为 `gh-pages` 分支。

2. 根目录添加文件： *CNAME*（注意要全大写的）；
3. 在 *CNAME* 文件中添加一行文字，指明自定的域名，注意，这个域名是裸的域名，即不含什么`http://` or `https://`之类的，也不含前缀的，比如这个博客网站的 *CNAME* 里面就只有一句：`blog.ssyog.com`。
	>另外要注意，一个 *CNAME* 文件只能有一个域名信息。

4. git add, git commit, git push 推送到GitHub 的远程仓库中。
5. 当添加完 *CNAME* 文件后，大概要15 mins 左右才会生效！

###确认自定义域名配置成功
1. 进入 GitHub 的项目页面，点击右边栏中的 `Settings`；

	![github-right-sidebar]({{site.url}}/image/github-pages-intro/github-right-sidebar.png "github-right-sidebar")

2. 然后滚动滚动到 `GitHub Pages` 内容块的时候，如果看到了你在 `CNAME`文件中填入的域名的话，说明你，已经成功了。

	![github-pages-cname-validation]({{site.url}}/image/github-pages-intro/github-pages-cname-validation.png "github-pages-cname-validation")

###配置域名 DNS
当确认 GitHub 上自定义域名的配置成功后进行 DNS 配置就完事了！根据你想配置的域名类型不同，要做的配置也不同。

> 这里先普及一下，裸域名就是没有 `www` 之类前缀的域名，而有这些前缀的称为子域名，比如 `blog.ssyog.com` 和 `www.ssyog.com` 就是子域名，而 `ssyog.com` 就是裸域名了。

1. 如果自定义域名是子域名，需要配置DNS 的 `CNAME` 记录
2. 如果自定义域名是裸域名，需要配置DNS 的 `A`记录

> 具体的操作因不同域名代理商的系统设定不一致而不好说步骤。

配置好 DNS 之后，要过一段时间才能同步该设定。

另外，可以通过使用 `dig` 命令来确认 DNS 是否配置正确，用法例子如下：

裸域名：`dig example.com +nostats +nocomments +nocmd`

子域名：`dig www.example.com +nostats +nocomments +nocmd`

当 `CNAME` 和 DNS 都设置好，同步好后，就能直接输入自定义域名来访问 [Pages 网站]({{site.url}}/)了。