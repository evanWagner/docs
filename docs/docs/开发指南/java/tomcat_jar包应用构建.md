## 使用 maven 镜像运行 springboot 的 jar 包的应用
> 目标：用 Docker 的方式搭建一个 springboot 的 jar 包的应用    

#### 前言
Spring Framework 是 Java 应用开发中应用最广泛的框架，基于 AOP 及 IOC 的思想，让它能与任何 Java 第三方框架进行非常便利的集成。同时，Maven 自从公布以来，在 Java 应用构建和管理中一直处于最重要的地位，基于 Project Object Model 的概念管理项目。所以这里，将介绍如何借助 docker 运行基于 maven 镜像的 springboot 的应用。

#### 创建 maven web-app 的应用项目
访问 [http://start.spring.io](http://start.spring.io) 站点，根据需要建立自己的应用。然后将应用打包为jar包。   
假设已经打包好了一个 helloworld 的 springboot 的 web 应用包：app.jar


#### 编写 Dockerfile 文件
将 Dockerfile 与 app.jar 放到同一文件夹中进行构建，完整的 Dockerfile 文件内容如下：    
```
FROM maven:3.3.3

ENV TIME_ZONE Asia/Shanghai
RUN echo "$TIME_ZONE" > /etc/timezone

WORKDIR /app
COPY ["app.jar","/app/app.jar"]

EXPOSE 8080
CMD [ "java","-jar","app.jar"]

```

#### Dockerfile 文件说明
```
FROM maven:3.3.3
```
由于之前教程构建的是 tomcat 的基础镜像，而这里是基于 maven 的 springboot 的应用。所以镜像选择官方的 maven3.3.3 镜像。    
官方维护的 Maven 镜像依赖于 Java 镜像构建，所以我们不需要使用 Java 镜像。   
```
ENV TIME_ZONE Asia/Shanghai
RUN echo "$TIME_ZONE" > /etc/timezone
```
设置系统时区，保证 java 运行。    
```
WORKDIR /app
COPY ["app.jar","/app/app.jar"]
```
设置容器工作目录，同时将jar包复制到容器工作目录中。    
```
EXPOSE 8080
CMD [ "java","-jar","app.jar"]
```
暴露端口，运行 jar 包。

#### 运行镜像体验
此过程与之前教程完全一致，这里不再赘述。    
最后打开网页可以看到 Hello World! ,应用运行成功！

至此，我们 springboot 的 jar 包应用已经成功运行！