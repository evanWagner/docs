## Perl 语言 demo docker 镜像构建
> 目标：基于 perl 的 Docker 基础镜像，开发一个 perl 语言示例应用 (hello world) 



#### 新建 perl-demo 目录

```
mkdir perl-demo
cd perl-demo
```



#### 编写 perl 语言示例 ####

将如下内容保存为 **helloworld.pl**

```
#!/usr/bin/perl
while(1) {
    $time = localtime();
    printf"$time  Hello World! by perl\n";
    system(sleep 3);
}
```



#### 编写 Dockerfile

将如下内容保存为 **Dockerfile**
```
FROM perl:5.26
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
CMD ["perl","helloworld.pl"]
```



#### 构建镜像

整个 perl-demo 材料包括如下 Dockerfile, helloworld.pl 两个文件
```
[root@localhost perl-demo]# tree .
.
├── Dockerfile
└── helloworld.pl

0 directories, 2 files
```
在 perl-demo 项目目录执行如下构建命令
```
docker build -t registry.cosmoplat.com/test/helloworld_perl:v0.0.1 .
```

执行成功的完整过程如下
```
Sending build context to Docker daemon  3.072kB
Step 1/4 : FROM perl:5.26
 ---> 17190fe2d507
Step 2/4 : COPY . /usr/src/myapp
 ---> f17c85110210
Step 3/4 : WORKDIR /usr/src/myapp
 ---> Running in e57259e267e7
Removing intermediate container e57259e267e7
 ---> 94a2cc2b81c1
Step 4/4 : CMD ["perl","helloworld.pl"]
 ---> Running in 2a68ffdb8824
Removing intermediate container 2a68ffdb8824
 ---> e61440adff5b
Successfully built e61440adff5b
```



#### 测试镜像

上传镜像前先在本地做下测试，运行如下命令
```
docker run -d --name test_perl registry.cosmoplat.com/test/helloworld_perl:v0.0.1
docker logs test_perl -f
```

容器运行正常会看到 Hello World 字样

```
Wed Oct 31 11:02:22 2018  Hello World! by perl
Wed Oct 31 11:02:25 2018  Hello World! by perl
Wed Oct 31 11:02:28 2018  Hello World! by perl
```
