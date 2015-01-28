# Sam's gulp experience

## 基本用法

> 注意提及return pipe 的区别

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

第三步中，这里为什么还要再安装gulp 一遍呢？原因就是，这里安装的gulp 是被放到项目根目录中 `.node_modules/`，鉴于node 查找库的方式，这能加快执行代码时更快找到gulp 这个库。另外，这一步的命令最后有一个参数：`--save-dev`，目的时将这段命令安装的库的名称加到 'package.json' 的 `dev-dependencies` 中。

第四步中，这里要说明一下的时，执行gulp 命令的地方其实可以在任何地方，但正确的姿势时，切换到保存 `gulpfile.js` 文件的目录中，然后gulp，就可以执行你精心编写的gulp 任务了。

### 代码解释
在上面的 gulpfile.js 的代码中，我们先声明引用了三个库：“gulp”、“gulp-concat”、“gulp-uglify”，第二个用来连接多个文件之用，第三个用来压缩文件之用。

然后，使用 `gulp.task()` 声明了一个任务，这个任务名为“gulpDemo”，留意下这里的任务名，回看下执行gulp 的命令：`gulp gulpDemo`，看到了吗，在gulp 后加上任务名，就能调用在 gulpfile 中定义的同名任务了。给 `.task()` 第二个参数传入一个函数，函数里面就是用来定义这个任务要干什么的。

继续。使用 `gulp.src()` 读取原文件，这里分别是“foo.js”和“bar.js”。

继续。然后看到的三个语句都有使用 `.pipe()` 方法来连接任务中的各个子操作，这里的理念灰常棒棒棒～～～

concat() 调用gulp 插件“gulp-concat”，效果是合并多个文件为一个文件；uglify() 调用“gulp-uglify”插件，效果是压缩代码，减少文件大小；最后一个管道中使用 `gulp.dest()` 方法，将以上上一步操作的输出重定向保存到给定的目录中。

> 血泪感悟：注意到上面代码“gulpDemo”任务的定义中，我使用了 `return` 来返回一个管道输出。在这里要提及一点就是，有“return”的任务在调用时是并行方式执行的，而没有“return”的任务在调用时是阻塞形式执行的。


## 更多用法
gulp 除了四个常用接口外，其实还有一个很常用的接口和一种很重要的任务执行理念，嘿嘿！

这个很常用的接口是：`gulp.watch()`，这个接口用于监控指定的文件或目录，当发生变化的时候，执行特定的任务。调用这个接口时，第一个参数要传入想要的监控的文件或目录的路径，数组形式；第二个参数是变化发生时所要执行的任务名称，数组形式。示例代码如下：

	gulp.task('default', function(){
		return gulp.watch(
				[
					'./foo/**/*',
					'./bar/**/*'],
				[
					'clean',
					'copy-assets'
					'html2js'
				]
		);
	
	})
	
> 暖男提醒：在调用gulp 命令时如果不带上任务名，则默认执行“default”任务。





## 常用插件


## 问什么我会使用gulp

## 为什么我会弃用gulp