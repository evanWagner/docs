## 构建基于 war 包的 Maven 和 Tomcat 的基础镜像     
> 目标：构建基于 Maven 和 Tomcat 的基础镜像     

#### 前言
在 Java 开发的世界中，有很大一部分应用是基于 Maven 构建的，而最终的交付结果也是一个 war 包，所以，构建一个基于 Maven 和 Tomcat 的基础镜像很有必要，可以在一定程度减少应用 Dockerfile 的复杂度，也能提升交付效率。

#### 镜像与 Dockerfile 简介
+ 镜像是 Docker 应用的静态表示，是应用的交付件，镜像中包含了应用运行所需的所有依赖：包括应用代码、应用依赖库、应用运行时和操作系统。       
+ Dockerfile 是一个描述文件，描述了产生 Docker 镜像的过程。详细文档请参见 [Dockerfile文档](https://docs.docker.com/engine/reference/builder/)    
+ 容器是镜像运行时的动态表示，如果把镜像想象为一个 Class 那么容器就是这个 Class 的 instance 实例。        

一个应用 Docker 化的第一步就是通过 Dockerfile 产生应用镜像。

#### 编写 Dockerfile
此处先给出完整 Dockerfile 文件，方便后面说明   
```
FROM maven:3.3.3

ENV CATALINA_HOME /usr/local/tomcat
ENV PATH $CATALINA_HOME/bin:$PATH
RUN mkdir -p "$CATALINA_HOME"
WORKDIR $CATALINA_HOME

RUN gpg --keyserver pool.sks-keyservers.net --recv-keys 05AB33110949707C93A279E3D3EFE6B686867BA6 07E48665A34DCAFAE522E5E6266191C37C037D42 47309207D818FFD8DCD3F83F1931D684307A10A5 541FBE7D8F78B25E055DDEE13C370389288584E7 61B832AC2F1C5A90F0F9B00A1C506407564C17A3 713DA88BE50911535FE716F5208B0AB1D63011C7 79F7026C690BAA50B92CD8B66A3AD3F4F22C4FED 9BA44C2621385CB966EBA586F72C284D731FABEE A27677289986DB50844682F8ACB77FC2E86E29AC A9C5DF4D22E99998D9875A5110C01C5A2F6059E7 DCFD35E0BF8CA7344752DE8B6FB21E8933C60243 F3A04C595DB5B6A5F1ECA43E3B7BBB100D811BBE F7DA48BB64BCB84ECBA7EE6935CD23C10D498E23

ENV TOMCAT_VERSION 8.0.53
ENV TOMCAT_TGZ_URL https://www.apache.org/dist/tomcat/tomcat-8/v$TOMCAT_VERSION/bin/apache-tomcat-$TOMCAT_VERSION.tar.gz

RUN set -x \
    && curl -fSL "$TOMCAT_TGZ_URL" -o tomcat.tar.gz \
    && curl -fSL "$TOMCAT_TGZ_URL.asc" -o tomcat.tar.gz.asc \
    && gpg --verify tomcat.tar.gz.asc \
    && tar -xvf tomcat.tar.gz --strip-components=1 \
    && rm bin/*.bat \
    && rm tomcat.tar.gz*

EXPOSE 8080
CMD ["catalina.sh", "run"]   
```

#### Dockerfile 文件说明
```
FROM maven:3.3.3 
```
此处选择了官方维护的 maven:3.3.3 镜像作为基础镜像，之后在此基础上添加 Tomcat 支持。     
      
```
ENV CATALINA_HOME /usr/local/tomcat
ENV PATH $CATALINA_HOME/bin:$PATH
RUN mkdir -p "$CATALINA_HOME"
WORKDIR $CATALINA_HOME
```
设置 Tomcat 相关的环境变量，并添加到系统 PATH 变量中，使 Tomcat 的启动脚本可以在 Shell 中直接访问。    
     
```
RUN gpg --keyserver pool.sks-keyservers.net --recv-keys 05AB331109....
```
添加 Tomcat GPG-KEY，用于 Tomcat 下载完后校验文件是否正确，该一长串数据来自 [Tomcat](https://www.apache.org/dist/tomcat/tomcat-8/KEYS)。    
     
```
ENV TOMCAT_VERSION 8.0.53
ENV TOMCAT_TGZ_URL https://www.apache.org/dist/tomcat/tomcat-8/v$TOMCAT_VERSION/bin/apache-tomcat-$TOMCAT_VERSION.tar.gz

RUN set -x \
    && curl -fSL "$TOMCAT_TGZ_URL" -o tomcat.tar.gz \
    && curl -fSL "$TOMCAT_TGZ_URL.asc" -o tomcat.tar.gz.asc \
    && gpg --verify tomcat.tar.gz.asc \
    && tar -xvf tomcat.tar.gz --strip-components=1 \
    && rm bin/*.bat \
    && rm tomcat.tar.gz*
```
设置 Tomcat 版本变量，构建时可以传入相应参数更改 Tomcat 版本，随后使用 curl 执行下载，并且验证后解压，同时删除多余的 bat 脚本。这些bat脚本是用于 windows 的，在 linux 环境中无用。    
    
```
EXPOSE 8080
CMD ["catalina.sh", "run"]   
```

暴露 Tomcat 默认的 8080 端口，并指定基于该镜像的容器启动时执行的脚本 catalina.sh ，该脚本为 Tomcat 启动脚本。    

---
**PS**   
因为 maven:3.3.3  镜像依赖的 Java 版本是 1.8, 所以我们的 Tomcat 版本也选择 8.0 版本，保持一致可以最大化 Tomcat 的性能。         

tomcat8.0 现在的 release 版本是8.0.53，后续的最新版本可以在[tomcat](https://www.apache.org/dist/tomcat/tomcat-8/)中查看          

此镜像属于基础镜像，不包含任何应用，若需要构建部署应用镜像，可以以此镜像为基础编写 dockerfile ，然后将对应的 war 包放入，以此构建部署应用。      

---
#### 镜像构建与上传
镜像构建与上传有两种方式，一种是借助云平台构建与上传，另一种是使用本地的 docker 环境中进行镜像构建和上传。          
###### PaaS 平台镜像构建与上传
PaaS 平台镜像构建与上传请看教程 [PaaS 平台应用镜像构建](../PaaS平台使用指南/PaaS平台应用镜像构建.md)      
###### docker环境中构建与上传    
在本地 Docker 环境中打开控制台，上传 Dockerfile ,然后在 Dockerfile 所在目录执行命令                    
```
docker build -t test/tomcat-maven:1.0.0 .  #tomcat_maven 是镜像名称
```
等待构建完成,控制台显示 `Successfully built` 后，修改镜像标签，标签格式应该为 `registry.cosmoplat.com/镜像空间名称/镜像名称:版本号` ,这里镜像空间使用 test         
```
docker tag test/tomcat-maven:1.0.0 registry.cosmoplat.com/test/tomcat-maven:1.0.0
```
修改好标签之后再进行 login ，输入账号密码后，登陆到平台的镜像工厂         
```
docker login registry.cosmoplat.com
```
登陆完成后，将镜像上传到镜像工厂中即可         
```
docker push registry.cosmoplat.com/test/tomcat-maven:1.0.0
```
完成后打开 PaaS 平台即可看到上传的镜像            
 
