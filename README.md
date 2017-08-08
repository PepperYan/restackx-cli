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


#### 配置

```

const development = {

  staticUrl: "",

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
