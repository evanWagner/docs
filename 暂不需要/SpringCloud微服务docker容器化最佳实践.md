如何开发一个基于 docker springcloud 应用


## 应用的开发构建，本地测试，打包准备。

>> 应用镜像可以在开发测试完成后进行打包构建镜像，也可以使用mvn插件帮助构建镜像

## 编写Dockerfile

    FROM 10.138.114.101/cosmoplat/openjdk:8-jdk-alpine
    
    RUN mkdir -p /opt/springboot/cosmoplat/demo
    
    WORKDIR /opt/springboot/cosmoplat/demo
    
    ARG JAR_FILE=target/springboot-mybatis-demo-1.0-SNAPSHOT.jar
    
    ADD ${JAR_FILE} demo.jar
    
    EXPOSE 8080
    
    CMD ["java","-jar","demo.jar"]


## 编译jar包（利用docker）
`docker run -it --rm --name springboot-mybatis-demo -v "$(pwd)":/usr/src/mymaven -w /usr/src/mymaven 10.138.114.101/cosmoplat/maven:3.5.2-jdk-8 mvn clean package`

## 构建镜像

`docker build -t 10.138.114.101/cosmoplat-dev-test/springboot-mybatis-demo:0.0.1 .`

`cosmoplat-dev-test镜像空间的概念，每个人只能推送镜像到自己有权限的镜像空间`

## 推送镜像

`docker push 10.138.114.101/cosmoplat-dev-test/springboot-mybatis-demo:0.0.1`

## 镜像部署

部署mysql：

* 主机路径规范/var/lib/cosmoplat/demo-mysql1 选择node
