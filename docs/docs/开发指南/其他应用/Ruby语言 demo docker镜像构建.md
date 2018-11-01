## Ruby 语言 demo docker 镜像构建
> 目标：基于 ruby 的 Docker 基础镜像，开发一个 ruby 语言示例应用 (hello world) 



#### 新建 ruby-demo 目录

```
mkdir ruby-demo
cd ruby-demo
```



#### 编写 ruby 语言示例 ####

将如下内容保存为 **helloworld.rb**

```
#!/usr/bin/ruby
# -*- coding: UTF-8 -*-

loop do
  time = Time.new
  puts time.inspect + "  Hello World! by ruby"
  system 'sleep 3'
end
```



#### 编写 Dockerfile

将如下内容保存为 **Dockerfile**
```
FROM ruby:2.5
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
CMD ["ruby","helloworld.rb"]
```



#### 构建镜像

整个 ruby-demo 材料包括如下 Dockerfile, helloworld.rb 两个文件
```
[root@localhost ruby-demo]# tree .
.
├── Dockerfile
└── helloworld.rb

0 directories, 2 files
```
在 ruby-demo 项目目录执行如下构建命令
```
docker build -t registry.cosmoplat.com/test/helloworld_ruby:v0.0.1 .
```

执行成功的完整过程如下
```
Sending build context to Docker daemon  3.072kB
Step 1/4 : FROM ruby:2.5
 ---> 8d304b5c0cbf
Step 2/4 : COPY . /usr/src/myapp
 ---> 57977f1ac63a
Step 3/4 : WORKDIR /usr/src/myapp
 ---> Running in 832a5e63812f
Removing intermediate container 832a5e63812f
 ---> 5c5b09315402
Step 4/4 : CMD ["ruby","helloworld.rb"]
 ---> Running in da36e5191414
Removing intermediate container da36e5191414
 ---> ad10a00421e1
Successfully built ad10a00421e1
```



#### 测试镜像

上传镜像前先在本地做下测试，运行如下命令
```
docker run -d --name test_ruby registry.cosmoplat.com/test/helloworld_ruby:v0.0.1
docker logs test_ruby -f
```

容器运行正常会看到 Hello World 字样

```
2018-10-31 10:30:08 +0000  Hello World! by ruby
2018-10-31 10:30:11 +0000  Hello World! by ruby
2018-10-31 10:30:14 +0000  Hello World! by ruby
```
