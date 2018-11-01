## Golang 语言 demo docker 镜像构建
> 目标：基于 golang 的 Docker 基础镜像，开发一个 golang 语言示例应用 (hello world) 



#### 新建 golang-demo 目录

```
mkdir golang-demo
cd golang-demo
```



#### 编写 golang 语言示例 ####

将如下内容保存为 **helloworld.go**

```
package main
import "fmt"
import "time"
func main(){
    limiter := time.Tick(time.Millisecond * 1000)
    for ; ; {
        <-limiter
        fmt.Println(time.Now().Format("2006-01-02 15:04:05") + "Hello World! by golang")
    }
}
```



#### 编写 Dockerfile

将如下内容保存为 **Dockerfile**
```
FROM golang:1.10
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
CMD ["go","run","helloworld.go"]
```



#### 构建镜像

整个 golang-demo 材料包括如下 Dockerfile, helloworld.go 两个文件
```
[root@localhost golang-demo]# tree .
.
├── Dockerfile
└── helloworld.go

0 directories, 2 files
```
在 golang-demo 项目目录执行如下构建命令
```
docker build -t registry.cosmoplat.com/test/helloworld_golang:v0.0.1 .
```

执行成功的完整过程如下
```
Sending build context to Docker daemon  3.072kB
Step 1/4 : FROM golang:1.10
 ---> e6d03b940438
Step 2/4 : COPY . /usr/src/myapp
 ---> b4aa92c69df3
Step 3/4 : WORKDIR /usr/src/myapp
 ---> Running in fba83f48acdc
Removing intermediate container fba83f48acdc
 ---> d7d8a09ccd5b
Step 4/4 : CMD ["go","run","helloworld.go"]
 ---> Running in 665afe061283
Removing intermediate container 665afe061283
 ---> fc3e9c7f4fc4
Successfully built fc3e9c7f4fc4
```



#### 测试镜像

上传镜像前先在本地做下测试，运行如下命令
```
docker run -d --name test_golang registry.cosmoplat.com/test/helloworld_golang:v0.0.1
docker logs test_golang -f
```

容器运行正常会看到 Hello World 字样

```
2018-10-31 11:46:10  Hello World! by golang
2018-10-31 11:46:13  Hello World! by golang
2018-10-31 11:46:16  Hello World! by golang
```
