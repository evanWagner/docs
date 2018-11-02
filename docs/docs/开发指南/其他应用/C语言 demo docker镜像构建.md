## C 语言 demo docker 镜像构建
> 目标：基于 gcc 的 Docker 基础镜像，开发一个 C 语言示例应用 (hello world) 



#### 新建 c-demo 目录

```
mkdir c-demo
cd c-demo
```



#### 编写 C 语言示例 ####

将如下内容保存为 **helloworld.c**

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#define random(x) (rand()%x)


void main()
{
    char buf[20]="hello world!\n";
    int h=0,m=0,s=0;
    int t=0;

    while(1)
    {
        t=time(0);
        s=t%60;
        m=t%3600/60;
        h=(t%(24*3600)/3600+8)%24;

        printf("%02d:%02d:%02d %s",h,m,s,buf);
        sleep(random(10));
    }
}
```



#### 编写 Dockerfile

将如下内容保存为 **Dockerfile**
```
FROM gcc:4.9

COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN  gcc -o helloworld helloworld.c

CMD ./helloworld
```



#### 构建镜像

整个 c-demo 材料包括如下 Dockerfile,  helloworld.c 两个文件
```
[root@localhost c-demo]# tree .
.
├── Dockerfile
└── helloworld.c

0 directories, 2 files
```
在 c-demo 项目目录执行如下构建命令
```sh
docker build -t registry.cosmoplat.com/test/helloworld_c:v0.0.1 .
```

执行成功的完整过程如下
```
Sending build context to Docker daemon 3.072 kB
Step 1/5 : FROM gcc:4.9
4.9: Pulling from library/gcc
aa18ad1a0d33: Pull complete
15a33158a136: Pull complete
f67323742a64: Pull complete
c4b45e832c38: Pull complete
e5d4afe2cf59: Pull complete
1efbd2d5674a: Pull complete
022a58c161f7: Pull complete
6461d3be7619: Pull complete
Digest: sha256:6356ef8b29cc3522527a85b6c58a28626744514bea87a10ff2bf67599a7474f5
Status: Downloaded newer image for gcc:4.9
 ---> 1b3de68a7ff8
Step 2/5 : COPY . /usr/src/myapp
 ---> ce122a47e7f8
Removing intermediate container 10dd819b9685
Step 3/5 : WORKDIR /usr/src/myapp
 ---> d1a1e2989bc1
Removing intermediate container 6dee118b2283
Step 4/5 : RUN gcc -o helloworld helloworld.c
 ---> Running in 41e93014c564
 ---> c06d07864ac8
Removing intermediate container 41e93014c564
Step 5/5 : CMD ./helloworld
 ---> Running in 30fc4221d0d6
 ---> f904ad78077a
Removing intermediate container 30fc4221d0d6
Successfully built f904ad78077a
```



#### 测试镜像

上传镜像前先在本地做下测试，运行如下命令
```
docker run -d --name test_c registry.cosmoplat.com/test/helloworld_c:v0.0.1
docker logs test_c -f
```

容器运行正常会看到 Hello world 字样

```
14:41:06 hello world!
14:41:09 hello world!
14:41:10 hello world!
```

