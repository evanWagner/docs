## 制作一个 PHP 的 Docker 化应用镜像
> 目标：基于 PHP 的 Docker 基础镜像，开发一个 Docker 化的示例 PHP 应用(hello world) 。

#### Docker 化应用的关键元素
+ 镜像是 Docker 应用的静态表示，是应用的交付件，镜像中包含了应用运行所需的所有依赖，包括应用代码、应用依赖库、应用运行时和操作系统。      
+ Dockerfile 是一个描述文件，描述了产生 Docker 镜像的过程。详细文档请参见 Dockerfile 文档        
+ 容器是镜像运行时的动态表示，如果把镜像想象为一个 Class 那么容器就是这个 Class 的 instance 实例。           

一个应用 Docker 化的第一步就是通过 Dockerfile 产生应用镜像。      

#### 编写 Dockerfile
制作的应用镜像是一个基于 apache 的 helloworld 网页应用，需要的是将此应用放入 docker 容器中运行。    
具体 Dockerfile 内容如下：    
```
FROM registry.cosmoplat.com/test/php-base:1.0.0

COPY . /app
WORKDIR /app
RUN chmod 755 ./start.sh

EXPOSE 80
CMD [ "./start.sh" ]
```

#### Dockerfile 文件说明
```
FROM registry.cosmoplat.com/test/php:1.0.0
```
选择上篇教程所制作的基础镜像，当然也可以选择官方的镜像。镜像的选择与制作很大程度取决于应用需求。
```
COPY . /app
WORKDIR /app
```
将 Dockerfile 所在目录的所有文件复制到容器的 /app 文件夹中，我们需要把 `index.php` 文件和启动脚本 `start.sh` 放到 dockerfile 所在目录下。然后设置容器工作目录为 /app 文件夹。   
```
RUN chmod 755 ./start.sh
```
设置启动脚本的执行权限，保证脚本可以执行
```
EXPOSE 80
CMD [ "php","hellp.php" ]
```
暴露端口，启动脚本。

#### 启动脚本介绍
启动脚本 `start.sh` 内容如下
```
#!/bin/bash

source /etc/apache2/envvars
tail -F /var/log/apache2/* &
exec apache2 -D FOREGROUND
```
对应的 php 文件 `index.php` 内容如下
```
<?php
echo "Hello World";
```
部署后页面显示的也是 index.php 的输出内容    

#### 应用部署
镜像应用部署可以看教程 [PaaS 平台应用的部署](../PaaS平台使用指南/PaaS平台应用的部署.md)       
镜像部署好之后，打开浏览器页面，输入地址，可以看到一个 HelloWorld 的页面。    
至此，一个简单的 PHP 应用镜像部署完毕！   