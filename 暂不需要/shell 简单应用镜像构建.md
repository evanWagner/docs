## 制作一个shell 应用镜像
> 目标：基于 bash 的 Docker 基础镜像，开发一个 shell 示例应用(hello world) 。

#### 一个简单的 shell 应用
以下是 shell 编写的 helloworld 脚本，命名为 `script.sh`:
```
#!/usr/bin/env bash
while :
do
  clear && echo "hello, world ($(date))"
  sleep 5
done

```

#### 编写 Dockerfile
具体 Dockerfile 内容如下:
```
# 使用 bash 镜像
FROM bash:4.4

# 复制当前目录所有文件到镜像根目录
COPY . /

# 启动执行脚本
CMD ["bash", "/script.sh"]

```

#### 镜像编译
以下是本地编译主机上的相关文件路径:
```
$ tree ..
..
└── my_project
    ├── dockerfile
    └── script.sh
    
```
在所在目录执行镜像编译命令:
```
$ docker build -t registry.cosmoplat.com/test/helloworld_shell:v0.0.1 .

```
看到执行成功:
```
Successfully built ef532a91cf59
Successfully tagged registry.cosmoplat.com/test/helloworld_shell:v0.0.1

```

#### 测试运行
镜像构建完毕后, 在上传镜像仓库前先在本地环境上做下测试:
```
$ docker run --name test_shell  registry.cosmoplat.com/test/helloworld_shell:v0.0.1

```
看到在测试主机上每隔 5 秒打印一次 hello, world

![](../../images/shell_01.png)