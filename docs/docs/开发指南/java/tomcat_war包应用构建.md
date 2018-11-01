## 使用基础镜像运行 tomcat + war 包的应用
> 目标：用 Docker 的方式搭建一个 tomcat 的 war 包的应用

#### 前言
通常，基于 J2EE 的应用通常是一个 war 包。之前构建的基于 maven 的 tomcat 镜像，十分适合运行 war 包应用。所以本篇教程，我们将使用基于 Tomcat 的容器运行 war 包应用。

#### 创建 maven web-app 的应用项目
创建 helloworld 的 maven web-app 项目，然后将其打包为 sample.war 。    

#### 编写 Dockerfile 文件
在 [java基础镜像构建](tomcat_maven基础镜像构建.md) 的教程中已经介绍了如何构建一个基于 maven 的基础 tomcat 镜像。若您没有构建该镜像，强烈建议先构建此基础镜像。
接下来的 Dockerfile 编写将以上一篇教程构建的基础镜像作为开始，Dockerfile 与 war 包应放到同一文件夹中，完整的 Dockerfile 文件内容如下：    
```
FROM registry.cosmoplat.com/test/tomcat-maven:1.0.0 

RUN rm -rf /usr/local/tomcat/webapps/ROOT
COPY ["sample.war", "/usr/local/tomcat/webapps/ROOT.war"]

EXPOSE 8080
CMD ["catalina.sh","run"]
```


#### Dockerfile 文件说明
```
FROM registry.cosmoplat.com/test/tomcat-maven:1.0.0 
```
选择了上一教程所构建的基础镜像。选择自己上传的特定镜像时需要指定镜像仓库，镜像空间，镜像名以及版本号    

```
RUN rm -rf /usr/local/tomcat/webapps/ROOT
COPY ["sample.war", "/usr/local/tomcat/webapps/ROOT.war"]
```
这里将原本的 ROOT 目录删除，然后将我们的 sample.war 复制到 webapps 下，并且改名为 ROOT.war 。当 tomcat 运行的时候会将 war 包解压，我们的应用就部署到了 tomcat 的根目录下。

```
EXPOSE 8080
CMD ["catalina.sh","run"]
```
最后就是对外暴露端口，然后启动 tomcat 服务。

#### 运行镜像体验
在运行镜像之前，需要先对镜像进行构建。具体构建方法可以参考上一个教程。   
运行镜像有两种方式，一种是在 PaaS 平台上进行服务部署，另一种就是在 docker 环境中运行--适用于快速测试。
###### PaaS平台镜像服务部署
要在 PaaS 平台部署服务，就需要将构建好的镜像上传到平台上，上传之后才可以在平台上进行部署。    
PaaS 服务部署具体过程可以参考  [PaaS 平台应用的部署](../PaaS平台使用指南/PaaS平台应用的部署.md)      
部署完成之后点击接入点即会出现 Hello World 的网页。    
###### docker环境中运行容器
镜像构建完毕后，在控制台输入 `docker run -d -p 8080:8080 <镜像名称>` 即可启动容器，运行应用了。    
输入 run 指令之后，打开浏览器，或者使用 curl 指令访问如下地址： `http://127.0.0.1:8080/demo` 
将会看到 Hello World! 的输出，应用运行成功！

至此，我们基于 J2EE 应用编译的 war 包已经成功运行！