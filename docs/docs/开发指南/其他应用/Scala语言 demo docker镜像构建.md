## Scala 语言 demo docker 镜像构建
> 目标：基于 scala 的 Docker 基础镜像，开发一个 scala 语言示例应用 (hello world) 



#### 新建 scala-demo 目录

```
mkdir scala-demo
cd scala-demo
```



#### 编写 scala 语言示例 ####

将如下内容保存为 **helloworld.scala**

```
object helloworld {
    def oncePerSecond(callback: () => Unit) {
        while (true ) { callback(); Thread sleep 3000 }
    }
 
    def timeFlies() {
        println("Hello World! by scala ")
    }
 
    def main(args: Array[String]) {
        oncePerSecond(timeFlies)
    }
}
```



#### 编写 Dockerfile

将如下内容保存为 **Dockerfile**
```
FROM flangelier/scala:2.11-jre
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
CMD ["scala","helloworld.scala"]
```



#### 构建镜像

整个 scala-demo 材料包括如下 Dockerfile, helloworld.scala 两个文件
```
[root@localhost scala-demo]# tree .
.
├── Dockerfile
└── helloworld.scala

0 directories, 2 files
```
在 scala-demo 项目目录执行如下构建命令
```
docker build -t registry.cosmoplat.com/test/helloworld_scala:v0.0.1 .
```

执行成功的完整过程如下
```
Sending build context to Docker daemon  3.072kB
Step 1/4 : FROM flangelier/scala:2.11-jre
 ---> 24b8ceae350d
Step 2/4 : COPY . /usr/src/myapp
 ---> ae8492c30b5a
Step 3/4 : WORKDIR /usr/src/myapp
 ---> Running in bcbd85f9926c
Removing intermediate container bcbd85f9926c
 ---> 4bcb6ece91f9
Step 4/4 : CMD ["scala","helloworld.scala"]
 ---> Running in 36d1408cb09a
Removing intermediate container 36d1408cb09a
 ---> 1c3fd3511115
Successfully built 1c3fd3511115
```



#### 测试镜像

上传镜像前先在本地做下测试，运行如下命令
```
docker run -d --name test_scala registry.cosmoplat.com/test/helloworld_scala:v0.0.1
docker logs test_scala -f
```

容器运行正常会看到 Hello World 字样

```
Hello World! by scala
Hello World! by scala
Hello World! by scala
```
