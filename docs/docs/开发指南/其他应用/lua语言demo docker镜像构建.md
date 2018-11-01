## lua 语言 demo docker 镜像构建
> 目标：基于 alpine 的 Docker 基础镜像，开发一个 lua 示例应用 (hello world) 



#### 新建 lua-demo 目录

```
mkdir lua-demo
cd lua-demo
```



#### 编写 lua 示例 ####

将如下内容保存为 **helloworld.lua**

```
while( true )
do
	print(os.time(), 'Hello world')
	line=math.random(0,10)
	os.execute('sleep ' .. line)
end
```



#### 编写 Dockerfile

将如下内容保存为 **Dockerfile**
```
FROM alpine:3.8

ENV LUA_VERSION 5.3.5

RUN echo -e 'http://mirrors.aliyun.com/alpine/v3.8/main/\n\
http://mirrors.aliyun.com/alpine/v3.8/community/\n' > /etc/apk/repositories \
&& apk update \
&& apk add --no-cache gcc g++ curl make readline-dev \
&& curl -R -O http://www.lua.org/ftp/lua-${LUA_VERSION}.tar.gz \
&& tar zxf lua-${LUA_VERSION}.tar.gz \
&& cd lua-${LUA_VERSION} \
&& make linux test \
&& make install

ADD helloworld.lua

CMD lua helloworld.lua
```



#### 构建镜像

整个 lua-demo 材料包括如下 Dockerfile, helloworld.lua 两个文件
```
[root@localhost lua-demo]# tree .
.
├── Dockerfile
└── helloworld.lua

0 directories, 2 files
```
在 lua-demo 项目目录执行如下构建命令
```
docker build -t registry.cosmoplat.com/test/helloworld_lua:v0.0.1 .
```
执行成功的完整过程如下
```
Sending build context to Docker daemon  2.56 kB
Step 1/4 : FROM alpine:3.8
 ---> 196d12cf6ab1
Step 2/4 : ENV LUA_VERSION 5.3.5
 ---> Using cache
 ---> 304f7467eae8
Step 3/4 : RUN echo -e 'http://mirrors.aliyun.com/alpine/v3.8/main/\nhttp://mirrors.aliyun.com/alpine/v3.8/community/\n' > /etc/apk/repositories && apk update && apk add --no-cache gcc g++ curl make readline-dev && curl -R -O http://www.lua.org/ftp/lua-${LUA_VERSION}.tar.gz && tar zxf lua-${LUA_VERSION}.tar.gz && cd lua-${LUA_VERSION} && make linux test && make install
 ---> Using cache
 ---> 250d0c758fd9
Step 4/4 : CMD echo "while( true ) 		do 			print(os.time(), 'Hello world') 			line=math.random(0,10) 			os.execute('sleep ' .. line) 		end" | lua
 ---> Using cache
 ---> b5418b9236f8
Successfully built b5418b9236f8
```


#### 测试镜像

上传镜像前先在本地做下测试，运行如下命令
```
docker run -d --name test_lua registry.cosmoplat.com/test/helloworld_lua:v0.0.1
docker logs test_lua -f
```
容器运行正常会看到 Hello world 字样

```
1540955542	Hello world
1540955543	Hello world
1540955553	Hello world
```

