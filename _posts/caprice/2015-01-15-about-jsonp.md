---
title: jsonp 工作原理短笔记
category: caprice
tags: ['js']
---

jsonp 主要是给js 提供突破浏览器同源策略的一种前后端交互数据的方式，简单理解如下：

jsonp 仅适用于HttpGet 请求方法；

前端的js 环境中声明一个函数，该函数目的是当请求返回响应后，自动对传回来的数据进行处理，然后把该函数的名称附加到目标Url 中的param 中，比如：

	http://www.foobar.com/2b.html?callback=JSON_CALLBACK&name=2333


上面的Url就把该函数名称作为`callback` 这个请求参数的值附加到url 中，并传递到目标服务器上；

服务器端代码收到请求并进行处理后，会把处理的结果和`callback` 的值，其实就是上一部定义的函数名称结合起来并返回给请求端，当然了，还要对结合出来的结果做一些修饰才能返回的。结合方式就是造出一个字符串，这个字符串看起来就是JS 环境调用callback 方法，传入的参数是处理结果，栗子见下：

	callback({"name":"Foo", "lastname:"Bar"})


前端的代码接收到服务端的相应后，会对返回的字符串做一些解析，解析结果就是一段调用给定回调函数的代码：

	callback({"name":"Foo", "lastname:"Bar"})


全文终！