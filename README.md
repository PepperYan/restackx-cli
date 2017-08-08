# Restackx-cli

## 简介
restackx-cli是结合前端框架`restackx-core` 的脚手架


## 快速开始

```
cd /项目存放目录
restackx create
cd /项目存放目录/restackx-prototype
restackx run

#现在你可以尽情开发你的项目了!
```


## 详细使用方法

### 创建项目

使用指令创建项目

```
cd /path/
#在/path/目录下新建项目, 名为restackx-prototype
restackx create  

#在/path/目录下新建项目, 名为helloworld
restackx create -n helloworld 
```

### 运行项目

#### 运行

```
#到项目目录下
cd /path/restackx-prototype

#开发模式启动
restackx run

#生产模式启动(可指定运行环境)
restackx run -e prod
```



### 命令
安装 `restackx-cli` 后, 输入restackx可以查看restackx-cli支持的命令


```
Usage: restackx [options] [command]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    create      create a restackx project
    run         run integrated restackx application
    build       builds a restackx application
    help [cmd]  display help for [cmd]
  Examples:

   1.create project
    $ restackx create  #使用默认目录名创建项目
    $ restackx create -n prjectname #指定项目目录名

   2.build project under project dir
    $ restackx build  #构建项目

   3.run dev mode under project dir
    $ restackx run #开发环境运行

   4.run prod mode after project was built
    $ restackx run -e prod #生产模式运行,也可使用其他自定义配置, 输入config目录下的配置js的文件名即可(不包含后缀)
```



### 配置

#### 默认项配置
以下是配置说明

```

const development = {

  staticUrl: "",   //指定public path

  // 描述前端有多少个entry
  entries: {
    'index': `./src/js/app/index.jsx`,
  },
   proxies: [
    // {
    //   api: '/api',
    //   target: 'http://localhost:3001'
    // }
  ]

}

```

#### 默认配置支持项

##### 默认语言/语法支持

默认支持es6特性以及部分es7特性
以下是支持babel特性列表, 详情参考babel文档

```
es2015
react
stage-1
decorators
class properties
rest spread 
aync/await
generator
assign
```

##### 样式支持
默认支持 `css` 以及 `less`. 用户若需要使用`sass`, 可以通过安装`sass`与`webpack`的相关依赖, 默认可识别`sass`.




#### 自定义webpack配置

`restack-cli`提供默认的webpack配置, 以让用户快速上手, 若用户的业务需求,需要定制webpack配置,可以遵循以下规则添加

**注意** *若使用自定义webpack配置, 默认项配置的staticUrl以及entries将不起作用*


```
  project-dir
  	|__config
  	.    |__webpack
  	.          |_ webpack.dev.config.js #开发配置(必需)
  	.          |_ webpack.prod.config.js #开发配置(必需)
	.
	.
```

