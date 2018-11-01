## Node.js 的应用镜像部署
Node.js 官方在 Docker 成为主流容器化解决方案之后，便随即发布了官方的 Node.js Docker 镜像，并保持著与最新的 Node.js 版本同步更新，这说明了 Docker 已成为了大部份 Web 工程师中的一把利剑。  
接下来，我们以一个简单的例子，看看要如何使用 Node.js Docker 镜像，将我们的 Node.js 应用 Dockerify，走上容器化之路。

####  准备 Node.js 程序  
和以前的 Node.js 开发流程一样，我们首先要准备好 Node.js 应用的配置。
```
$ mkdir -p node-docker-example
$ cd node-docker-example
```

我们开始编写主要的程序：
```
// server.js
var http = require('http')

var server = http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.end('Hello World!')
})

server.listen(8080, function( ) {
  console.log('Docker DEMO with Node.js is running.')
}) 
```
运行这段代码，并在浏览器中打开 http://localhost:8080/  就能看到 Hello World!  字样。

#### 扩展程序内容  
这样的程序不能满足？那么我们来一段比较有意思的吧~  

为了保持程序的简洁性，我们就写一段简易的路由器吧，以实现简单的 URL 分开处理。  
```
function router(routes) {
  var paths = Object.keys(routes)
  var regexes = paths.map(function(path) {
    return new RegExp('^' + path + '$')
  })

  return function(req, res) {
    var i = 0
    while (!regexes[i].test(req.url)) i++
    return routes[paths[i]].call(null, req, res)
  }
} 
```
通过这段简单的程序，我们可以实现下面这种功能：
```
var server = http.createServer(router({
  '/': function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World!')
  },
  '/bye': function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Bye~')
  }
}))
```
然后我们可以给该项目添加 Node.js Package 配置文件了。
```
$ npm init -y
``` 

#### 编写 Dockerfile
Dockerfile 是一个 Docker 镜像的核心部件，所有的构建、运行入口、容器配置都依赖于它。

首先我们从 DockerHub 拉取一个 Node.js 的官方 Docker 镜像，作为我们的环境基础镜像。
```
FROM node:4.2.2 
```
然后创建一个位于容器内部的代码运行文件夹，并将代码复制进去，且通过 npm 来安装依赖包。
```
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app 
```
我们部署的是一个 HTTP 服务，所以为了更好地体现出功能，我们通过 Docker 的端口暴露功能，为程序提供一个 80 端口作为 HTTP 服务端口。  
```
EXPOSE 80   
```
最后通过 ENTRYPOINT  指令，让 Node.js 程序作为该 Docker 镜像的主运行入口，并将其运行起来。  

```
ENTRYPOINT ["node", "server.js"]  
```

#### 镜像构建与上传
具体构建方法可以查看教程 [PaaS 平台应用镜像构建](../PaaS平台使用指南/PaaS平台应用镜像构建.md)     
构建的镜像名称为 `registry.cosmoplat.com/test/nodejs-hellodocker:1.0.0`。       

至此，Node.js Docker 镜像构建成功！    