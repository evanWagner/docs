## 制作一个静态的 HTML 应用镜像
> 目标：基于 nginx 的 Docker 基础镜像，开发一个静态的 HTML 示例应用(hello world) 。

#### 一个简单的静态 HTML 应用
以下是 html 的 hello,world:
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>hello,world</title>
	</head>
	<body>
		<h1>hello, world</h1>
		<p>这是一个静态 html 页面</p>
	</body>
</html>

```

#### 编写 Dockerfile
具体 Dockerfile 内容如下:
```
# 使用最小nginx镜像
FROM nginx:1.15-alpine

# 复制当前目录所有文件到 nginx 服务器中
COPY . /usr/share/nginx/html

# 设定访问端口
EXPOSE 80

# 启动 nginx 服务并在后台运行
CMD nginx -g "daemon off;"

```

#### 镜像编译
以下是本地编译主机上的相关文件路径:
```
$ tree ..
..
└── my_project
    ├── dockerfile
    └── index.html
    
```
所在目录执行镜像编译命令:
```
$ docker build -t registry.cosmoplat.com/test/helloworld_html:v0.0.1 .

```
看到执行成功:
```
Successfully built 3cbdd3a541c4
Successfully tagged registry.cosmoplat.com/test/helloworld_html:v0.0.1

```
#### 测试运行
镜像构建完毕后, 在上传镜像仓库前先在本地环境上做下测试:
```
$ docker run -d --name test_html -p 20080:80 registry.cosmoplat.com/test/helloworld_html:v0.0.1
```

参数说明 

* -d ： 后台运行     
* --name： 指定容器的名字          
* -p： 指定端口(将容器80端口映射到主机20080端口) 
---

打开浏览器, 访问 127.0.0.1:20080, 成功显示 hello, world
![](../../images/html_01.png)  
