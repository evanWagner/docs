## 构建一个 SpringCould 应用
> 目标：开发一个基于 docker 的 springcloud 应用


#### 应用的开发构建，本地测试，打包准备。
>> 应用镜像可以在开发测试完成后进行打包构建镜像，也可以使用mvn插件帮助构建镜像

#### 编写Dockerfile

    FROM 10.138.114.101/cosmoplat/openjdk:8-jdk-alpine
    
    RUN mkdir -p /opt/springboot/cosmoplat/demo
    
    WORKDIR /opt/springboot/cosmoplat/demo
    
    ARG JAR_FILE=target/springboot-mybatis-demo-1.0-SNAPSHOT.jar
    
    ADD ${JAR_FILE} demo.jar
    
    EXPOSE 8080
    
    CMD ["java","-jar","demo.jar"]


#### 编译 jar 包             
利用 docker 编译jar包，具体指令如下                
```
docker run -it --rm --name springboot-mybatis-demo -v "$(pwd)":/usr/src/mymaven -w /usr/src/mymaven 10.138.114.101/cosmoplat/maven:3.5.2-jdk-8 mvn clean package
```                

#### 构建镜像
构建指令                     
```
docker build -t registry.cosmoplat.com/test/springboot-mybatis-demo:0.0.1 .
```                    

registry.cosmoplat.com 以及 test 是 PaaS 镜像仓库与镜像空间，这样命名方便后面推送镜像。                   

#### 推送镜像                   
使用命令`docker push`就可以将本地构建好的镜像推送到 PaaS 平台。                     
```
docker push registry.cosmoplat.com/test/springboot-mybatis-demo:0.0.1
```                  
推送到镜像仓库之前需要 `docker login` 。并且用户需要拥有推送权限才能进行推送，否则会被拒而报错。      

此外可以直接在 PaaS 平台进行构建，具体过程可看教程 [PaaS 平台应用镜像构建](../PaaS平台使用指南/PaaS平台应用镜像构建.md)     

#### 镜像部署

镜像构建完毕后，在控制台输入 `docker run -d -p 8080:8080 <镜像名称>` 即可启动容器，部署应用。

此外也可以在PaaS平台进行应用部署，具体请看教程 [PaaS 平台应用的部署](../PaaS平台使用指南/PaaS平台应用的部署.md)
