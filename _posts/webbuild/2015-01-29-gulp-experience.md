---
title: 阿Sam 的gulp 使用经验
category: webbuild
tags: ['gulp', 'web-build']
---

## 基本用法

要掌握Gulp 的使用一点不难，只要记住下面的四个接口差不多就OK 了：

	// 用来注册gulp 任务的
	.task()
	
	// 定义所要读取的原文件或所在的目录
	.src()
	
	// 管道命令，用来链接gulp 插件的，所谓管道，就是将上一个命令的输出重定向到下一个命令的输入
	.pipe()
	
	// 定义用来放置任务最后输出内容的地方
	.dest()
	
下面以一段代码来演示如何把这四个接口用上，这段代码的目的是将项目根目录下的文件“foo.js”和“bar.js”合并，然后压缩代码，最后保存在“gulpTest”目录下的“helloworld.js”中：

	// gulpfile.js
	
	var gulp = require('gulp');
	var concat = require('gulp-concat');
	var uglify = require('gulp-uglify');
	
	gulp.task('gulpDemo', function(){
		return gulp.src('/foo.js', '/bar.js')
				.pipe(concat('helloworld.js'))
				.pipe(uglify())
				.pipe(gulp.dest('/gulpTest'));
	});


接下来，先介绍下怎么执行上面的代码，换言之就是介绍如何执行gulp 任务了，然后再详细解释下代码的几个关键点。

### 执行gulp 任务
下面先把步骤给列出来：

1. 全局安装gulp ：`[sudo] npm install -g gulp`
2. 将以上代码保存到项目根目录中，文件名为：“gulpfile.js”，这个可不能随便自定义哦；
3. 安装gulpfile 中提到的所有库：`[sudo] npm install gulp gulp-concat gulp-uglify --save-dev`
4. 打开终端，切换到项目根目录，执行命令：`gulp gulpDemo`
5. where amazing happen～～～

在这四个步骤中，有几个点需要PS 以下。

第一步中，要将 gulp 安装到全局中，目的是在node 目录下的bin/ 目录中添加gulp 命令的可执行文件，而又由于bin/ 目录在node 安装的过程中被加到了$PATH 环境变量中，所以，我们可以在任意目录下运行gulp 命令了。

第二步中，gulp 的所有代码都要保存到 `gulpfile.js` 文件中，文件名可是固定的了，别乱发挥想像力。

第三步中，这里为什么还要再安装gulp 一遍呢？原因就是，这里安装的gulp 是被放到项目根目录中 `.node_modules/`，鉴于node 查找库的方式，这能加快执行代码时更快找到gulp 这个库。另外，这一步的命令最后有一个参数：`--save-dev`，目的是将这段命令安装的库的名称加到 'package.json' 的 `dev-dependencies` 中。

第四步中，这里要说明一下的是，执行gulp 命令的地方其实可以在任何地方，但正确的姿势时，切换到保存 `gulpfile.js` 文件的目录中，然后gulp，就可以执行你精心编写的gulp 任务了。

<!--more-->

### 代码解释
在上面的 gulpfile.js 的代码中，我们先声明引用了三个库：“gulp”、“gulp-concat”、“gulp-uglify”，第二个用来连接多个文件之用，第三个用来压缩文件之用。

然后，使用 `gulp.task()` 声明了一个任务，这个任务名为“gulpDemo”，留意下这里的任务名，回看下执行gulp 的命令：`gulp gulpDemo`，看到了吗，在gulp 后加上任务名，就能调用在 gulpfile 中定义的同名任务了。给 `.task()` 第二个参数传入一个函数，函数里面就是用来定义这个任务要干什么的。

继续。使用 `gulp.src()` 读取原文件，这里分别是“foo.js”和“bar.js”。

继续。然后看到的三个语句都有使用 `.pipe()` 方法来连接任务中的各个子操作，这里的理念灰常棒棒棒～～～

concat() 调用gulp 插件“gulp-concat”，效果是合并多个文件为一个文件；uglify() 调用“gulp-uglify”插件，效果是压缩代码，减少文件大小；最后一个管道中使用 `gulp.dest()` 方法，将上一步操作的输出重定向保存到给定的目录中。

> 血泪感悟：注意到上面代码“gulpDemo”任务的定义中，我使用了 `return` 来返回一个管道输出。在这里要提及一点就是，有“return”的任务在调用时是并行方式执行的，而没有“return”的任务在调用时是阻塞形式执行的。


## 更多用法
gulp 除了四个常用接口外，其实还有一个很常用的接口和一种很重要的任务执行理念，嘿嘿！

这个很常用的接口是：`gulp.watch()`，这个接口用于监控指定的文件或目录，当发生变化的时候，执行特定的任务。调用这个接口时，第一个参数要传入想要的监控的文件或目录的路径，数组形式；第二个参数是变化发生时所要执行的任务名称，数组形式。示例代码如下：

	gulp.task('default', function(){
		    return gulp.watch(['./foo/**/*','./bar/**/*'],['clean', 'copy-assets', 'html2js']);
	});
	

> 暖男提醒：在调用gulp 命令时如果不带上任务名，则默认执行“default”任务。

最后要提及的任务执行理念，其实也是一个API ，那就是我们在声明一个任务时可以传入一个数组，这个数组的元素都是任务名，作用就是声明新定义的所依赖的其他任务，换言之，就是当执行新定义的任务时，会先执行数组中列出的任务。示例代码如下：

	gulp.task('default', ['cleanDir', 'concatAssets', 'uglifyCss'], function(){
		    // To Do Something
	});

上面的代码表示执行“default” 任务时，会先执行“cleanDir”、“concatAssets”、“uglifyCss”这三个任务。


## 常用插件

这一节要介绍的是目前为止俺用过的一些gulp 插件。

-  [gulp-compass](https://www.npmjs.com/package/gulp-compass)：使用sass＋compass 写css 代码的都应该知道的啦！
-  [gulp-stylus](https://www.npmjs.com/package/gulp-stylus)：使用stylus 写css 的也应该知道，库的readme 里面有介绍如何结合nib 使用的；
-  [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)：顾名思义，压缩css 代码的；
-  [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)：压缩js 代码的；
-  [gulp-clean](https://www.npmjs.com/package/gulp-clean)：清理指定目录的内容；
-  [gulp-concat](https://www.npmjs.com/package/gulp-concat)：连结多个文件；
-  [gulp-ng-html2js](https://www.npmjs.com/package/gulp-ng-html2js)：配合angularjs 使用，用于将模版文件封装成一个module，并注册到template.cache 中；
-  [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins)：俺最喜欢这个插件了，用于实时调用指定插件，而不需要在gulpfile 一开始require，也叫lazyload 吧，具体看api。

## 为什么我会使用gulp

现阶段很多使用gulp 的童鞋都有使用grunt 的经验了（没有grunt 经验的请忽略以下这句话），相比grunt，gulp 配置任务的代码更显简洁，而grunt 就要在initConfig 里面各种配置，缺点心眼的人都会被复杂度吓尿了。

所以，个人觉得使用gulp 来做构建任务的优势就是，简洁，只需要给任务定义传入依赖，然后通过管道命令连结各个子操作，可读性简直棒到极点了，而grunt 就像是一直处于写配置的感觉。

## 为什么我会弃用gulp

那为什么我会弃用gulp 呢？其实也说不上弃用，只是想表达，在某些环境需求下，以我的精力来说，我不能用gulp 来完成任务而已。

限制我使用gulp 的情景一般是：我要执行的gulp 任务有好几个依赖任务，而这几个依赖任务的执行顺序是有要求的，必须先执行前面的再执行后面的。这个时候gulp 执行出来的结果往往不尽如人意，sad～～～

据俺的观察，gulp 对任务依赖项的执行是类似于并行方式的，也就是说，依赖项是同时执行的，不存在前后次序，这就很麻烦了，比如以下代码，我的build 任务是要先clean 下dest 目录的所有内容才开始其他操作的，但并行执行依赖操作的原因，导致clean 会出现各种奇奇怪怪的错误。官网的代码也有介绍如何做才能达到依次执行任务的效果，但代码略点冗余，几经折腾依然不能稳定编译，遂让我产生暂时弃用gulp 的想法了。

	gulp.task('build',[
	'clean',
	'compile-stylus',
	'html2js-common',
	'html2js-app',
	'concat-app',
	'copy-index',
	'copy-vendors',
	'copy-imgs']);
	
## 完
最后当然是辩证性的总结以下本文啦！

总的来说，gulp 因其简洁的api 以及构建理念，能让开发者很快上手，对某些依赖任务执行次序无太大要求的情景来说，真的是方便到不行了。

但事物两面性还是有的（嘿嘿），所以，一切一切均取决于需求，2333～～～我就是个废话的🐷！
