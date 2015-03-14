---
title: PassportJS 配置失败：req.user 未定义
category: webbuild
tags: ['PassportJS', 'Session']
---

想快速知道为什么使用PassportJS 时`req.user` 或者 `req.session.passport.user` 会未定义，请点击这里：[问题出在哪里]({{page.url}}#article_nav_1)

## PassportJS 的配置
配合Session 来使用PassportJS 时，一般的配置都会有以下几部分：

### 1. Session 配置
	var app = new require('express')();
	app.use(require('cookie-parser')('i_am_cookie_secret'));
	app.use(session({
	  secret:'i_am_session_secret',
	  name:'sid',
	  store:new redisStore({
	    host: config.database.redis.host,
	    port: config.database.redis.port
	  }),
	}));
	
上面的代码将session 存到Redis 这个NoSql 数据库中了。

> 这里要慎重的提醒一下，如果按上面的配置，用Redis 来存储Session 数据，则一定一定记得确保Redis Server 已经处于启动状态，否则你连`req.session` 都找不到，更不要说passport 神马的。


### 2. PassportJS 的初始化
	var passport = require('passport');
	app.use(passport.initialize());
	app.use(passport.session());
	
调用passport 的session() 方法，就能把用户session 的处理交由PassportJS 来做。

当用户认证成功后，就会将用户信息存储到`req.session.passport.user` 和`req.user` 中了。

### 3. PassportJS 的验证逻辑
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	passport.use(new LocalStrategy(function(username, password, done){
	  var user = {userName: "test", userPass: "testPass"};
      if(!username){
        return done(null, false, {message: "UserEmailBlank"});
      }
      if(username !== user.userName){
        return done(null, false, {message: "UserEmailUnknown"});
      }
      if(passport !== user.userPass){
        return done(null, false, {message: 'UserPasswordWrong'});
      }
      return done(null, user, {message: 'UserAuthenticateSuccess'});
    }));
    
PassportJS 就是通过以上的代码来做用户信息认证的，如果认证通过，就调用done，并把用户信息传给第二个参数。

### 4. PassportJS 的serialize 和deserialize
标题两个方法的作用也就跟单词意思一样了，分别用来序列化用户信息和解序列化。站着说话不腰疼，这两个方法其实俺还是花了一点功夫才弄懂的，先看代码：

	passport.serializeUser(function(user, done){
   	  done(null, user._id);
	});

	passport.deserializeUser(function(userId, done){
      UserInfoDal.findById(userId, function(err, user){
        if(err){
          return done(err, null);
        }
        delete  user.Passwd;
        done(null, user);
      });
	});
	
还记得第三步中说过，当PassportJS 验证成功后会把用户信息传给done() 函数，留意一下serialize() 函数，作为参数的函数自身也有两个参数，其中一个被命名为`user`，没错，这里的user 最终就是刚才传给done() 函数的那堆用户信息。而serialize 这个函数就是对该user 信息做些处理，并将处理结果传给回调函数，最终的结果是，处理结果会存储到`session.passport.user` 中的。

而deserializeUser() 函数就是根据`session.passport.user` 中的数据，从数据库中找到目标用户信息，并赋值`req.user`（一般而言）。当有请求发送给服务器端时，会调用passport.initialize 中间件，这个中间件就会调用deserializeUser() 函数。

> 下面引申一篇博客，看完对PassportJS 的工作流会清晰很多：[understanding-passportjs-authentication-flow](http://toon.io/understanding-passportjs-authentication-flow/)

### 5. 调用PassportJS 的authenticate 方法
用PassportJS 的目的估计很多为了让他托管登录认证以及session 管理等功能吧～～～俺是小菜鸟，菜鸟，鸟。

所以，我们会在Login［HttpPost］的逻辑处调用`authenticate` 方法，此时会执行第三步所写的PassportJS 验证代码，看代码：

	var loginFunc = function(req, res, next){
	  passport.authenticate('local', function(err, user, info) {
        if(err){
          return next(err);
        }
        if(!user){
          res.status(401).json(info);
          res.end();
          return;
        }
      })(req, res, next);
	};
	app.post('/login', loginFunc);
	
上面的验证中间件（loginFunc）使用了自定义回调函数来做验证结果的处理。

## 问题出在哪里？
好了，回到文章标题中提及到的，按上面的步骤配置完后，为什么在session 中找不到user 属性，也不能在`session.passport` 中找到user 属性呢？真相只有一个，那就是：

**如果我们在上面第五步中使用自定义的回调函数来处理验证结果的话，则需要手动调用PassportJS 的login() 方法，来让PassportJS 处理相关的session 数据。**

所以，我们要修改下上述第五步的代码为：

	var loginFunc = function(req, res, next){
  	  passport.authenticate('local', function(err, user, info) {
   	    if(err){
      	  return next(err);
        }
        if(!user){
          res.status(401).json(info);
          res.end();
          return;
        }
        req.login(user, {}, function(err){
          if(err){
            return next(err);
          }
          res.status(200).json(info);
          res.end();
          return;
        });
      })(req, res, next);
	};
	app.post('/login', loginFunc);
	
<!--more-->
最后的最后，把所有代码都贴出来，以示效you：

	var app = new require('express')();
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	
	app.use(require('cookie-parser')('i_am_cookie_secret'));
	app.use(session({
		secret:'i_am_session_secret',
		name:'sid',
		store:new redisStore({
			host: config.database.redis.host,
			port: config.database.redis.port
		}),
	}));
	
	app.use(passport.initialize());
	app.use(passport.session());
	
	passport.use(new LocalStrategy(function(username, password, done){
	  var user = {userName: "test", userPass: "testPass"};
      if(!username){
        return done(null, false, {message: "UserEmailBlank"});
      }
      if(username !== user.userName){
        return done(null, false, {message: "UserEmailUnknown"});
      }
      if(passport !== user.userPass){
      	return done(null, false, {message: 'UserPasswordWrong'});
      }
      return done(null, user, {message: 'UserAuthenticateSuccess'});
    }));
    
    passport.serializeUser(function(user, done){
   	  done(null, user._id);
	});

	passport.deserializeUser(function(userId, done){
      UserInfoDal.findById(userId, function(err, user){
        if(err){
          return done(err, null);
        }
        delete  user.Passwd;
        done(null, user);
      });
	});
	
	var loginFunc = function(req, res, next){
  	  passport.authenticate('local', function(err, user, info) {
   	    if(err){
      	  return next(err);
        }
        if(!user){
          res.status(401).json(info);
          res.end();
          return;
        }
       
      })(req, res, next);
	};
	app.post('/login', loginFunc);
	
	app.on('error',function(err, ctx){
	  err.url = err.url || ctx.request.url;
	  console.log(err.stack);
	});
	
完！


