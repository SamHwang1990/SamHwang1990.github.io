---
title: PassportJS 使用：登出功能
category: webbuild
tags: ['PassportJS', 'Session']
---


代码环境：ExpressJS + PassportJS

在完成Logout 功能之前，先来看看，配合PassportJS 做登录认证会给req、res 带来哪些变化。

当配合PassportJS 登录认证成功后，主要会增加以下几个关键数据：
	
	req.user
	req.session
	req.session.cookie
	req.session.passport
	req.session.passport.user
	res.cookie
	
所以，要想完成Logout 功能，只需把以上的数据都清楚掉。当然，并不是直接用`delete` 就完事的，而是按下面的步骤来大扫除：

## 1. req.logout()
调用passportjs 附加到req 对象上的`logout()` 方法，把`req.user`、`req.session.passport`、`req.session.passport.user` 都删掉。

## 2. req.session.destroy()
调用`req.session.destroy()` 方法，把`req.session`、`req.session.cookie` 删掉。

## 3. res.clearCookie()
调用`res.clearCookie()` 方法，把`res.cookie` 删掉。

## 4. 完！
最后，把全部代码贴出来，好来个整体把握：

	exports.logout = function(req, res, next){
  	  req.logout();	    // to remove the influence of passportjs
  	  req.session.destroy();    //to remove session relative data
  	  res.clearCookie(config.session_name, { path: '/' });    // to remove res.cookie
  	  res.status(200).json({
    	message:'UserLogOutSuccess'
  	  });
  	  res.end();
  	  return;
	};
	
完。