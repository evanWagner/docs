## shell 语言 demo docker 镜像构建
> 目标：基于 bash 的 Docker 基础镜像，开发一个 shell 示例应用 (hello world) 



#### 新建 shell-demo 目录 

```
mkdir shell-demo
cd shell-demo
```



#### 编写 shell 示例

将如下内容保存为 **helloworld.sh**
```
#!/usr/bin/env bash
while :
do
  echo "$(date) hello, world"
  sleep 5
done
```



#### 编写 Dockerfile

将如下内容保存为 **Dockerfile**
```
FROM bash:4.4
COPY . /
CMD ["bash", "/helloworld.sh"]
```



#### 构建镜像

整个 shell-demo 材料包括如下 Dockerfile, helloworld.sh 两个文件
```
[root@localhost shell-demo]# tree .
.
├── Dockerfile
└── helloworld.sh

0 directories, 2 files
```
在 shell-demo 项目目录执行如下构建命令
```
docker build -t registry.cosmoplat.com/test/helloworld_shell:v0.0.1 .
```
执行成功的完整过程如下
```
Sending build context to Docker daemon 3.072 kB
Step 1/3 : FROM bash:4.4
4.4: Pulling from library/bash
4fe2ade4980c: Already exists
ec6d9ca5c66a: Pull complete
d8685fbd86ca: Pull complete
Digest: sha256:8634afcddefc8a10565b22d685df782058b096712a91bf45d75633f368dda729
Status: Downloaded newer image for bash:4.4
 ---> a88d58e960ac
Step 2/3 : COPY . /
 ---> e4fa871755db
Removing intermediate container 65fceb16eec6
Step 3/3 : CMD bash /helloworld.sh
 ---> Running in 3738ca411f14
 ---> 5298d39467ad
Removing intermediate container 3738ca411f14
Successfully built 5298d39467ad
```


#### 测试镜像

上传镜像前先在本地做下测试，运行如下命令
```
docker run -d --name test_shell  registry.cosmoplat.com/test/helloworld_shell:v0.0.1
docker logs test_shell -f
```
容器运行正常会看到 Hello world 字样

```
Wed Oct 31 07:43:13 UTC 2018 hello, world
Wed Oct 31 07:43:18 UTC 2018 hello, world
Wed Oct 31 07:43:23 UTC 2018 hello, world
```

