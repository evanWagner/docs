如何开发一个基于 docker 的 python 应用

Python 家族成员繁多，解决五花八门的业务需求。这里将通过 Python 明星项目 IPython Notebook，使其容器化，让大家掌握基础的 Docker 使用方法。

## Docker 化应用的关键元素

* 镜像是 Docker 应用的静态表示，是应用的交付件，镜像中包含了应用运行所需的所有依赖，包括应用代码、应用依赖库、应用运行时和操作系统。

* Dockerfile 是一个描述文件，描述了产生 Docker 镜像的过程，详细文档可以参见官方文档 Dockerfile reference。

* 容器是镜像运行时的动态表示，如果把镜像想象为一个 Class 那么容器就是这个 Class 的一个实例。

一个应用 Docker 化的第一步就是通过 Dockerfile 产生应用镜像。

## 编写 Dockerfile

* 选择 Python 2.7 版本为我们依赖的系统镜像。

`FROM python:2.7`

* 设置镜像的维护者，相当于镜像的作者或发行方。

`MAINTAINER Captain Dao <support@daocloud.io>`

* 向镜像中添加文件并安装依赖。

`RUN mkdir -p /app`

`WORKDIR /app`

`ADD requirements.txt requirements.txt`

`RUN pip install -r requirements.txt`

`COPY docker-entrypoint.sh /usr/local/bin/`

ADD 与 COPY 的区别
总体来说 ADD 和 COPY 都是添加文件的操作，其中 ADD 比 COPY 功能更多，ADD 允许后面的参数为 URL，还有 ADD 添加的文件为压缩包的话，它将自动解压。

使用 RUN 命令调用 pip 包管理器安装 App 的依赖包
在编写 Dockerfile 时尽量将安装依赖的过程提前以提高镜像层的复用率。

* 启动应用进程

`EXPOSE 8888`

`ENTRYPOINT ["docker-entrypoint.sh"]`

`CMD [""]`

通过 EXPOSE 指定该镜像需要公开的端口。

ENTRYPOINT 与 CMD 的区别

ENTRYPOINT 指定了该镜像启动时的入口，CMD 则指定了容器启动时的命令，当两者共用时，完整的启动命令像是 ENTRYPOINT + CMD 这样。使用 ENTRYPOINT 的好处是在我们启动镜像就像是启动了一个可执行程序，在 CMD 上仅需要指定参数；另外在我们需要自定义 CMD 时不容易出错。

* 安装 IPython 以及所需的依赖

我们将 IPython 所需的依赖写成一个文件，并通过 Dockerfile 中的 ADD requirements.txt requirements.txt 将 requirements.txt 放入镜像 ，之后在通过 Dockerfile 中的 RUN pip install -r requirements.txt 进行依赖的安装。

* 制作启动脚本（docker-entrypoint.sh）

    `#!/bin/bash`
    
    set -euo pipefail
    
    HASH=$(python -c "from IPython.lib import passwd; print(passwd('${PASSWORD:-admin}'))")
    
    echo "========================================================================"
    echo "You can now connect to this Ipython Notebook server using, for example:"
    echo ""
    echo " docker run -d -p <your-port>:8888 -e password=<your-password> ipython/noetebook"
    echo ""
    echo " use password: ${PASSWORD:-admin} to login"
    echo ""
    echo "========================================================================"
    
    unset PASSWORD
    
    ipython notebook --no-browser --port 8888 --ip=* --NotebookApp.password="$HASH"

一般我们会将初始化应用的过程编写成一个启动脚本，在脚本里以环境变量或命令行参数的形式获取应用初始化所必须的信息，然后配置并启动应用。

* 为 docker-entrypoint.sh 脚本添加执行权限

`chmod +x docker-entrypoint.sh`

## 启动容器

有了 Dockerfile 以后，我们可以运行下面的命令构建 Python 应用镜像并命名为 ipython/notebook：

* 通过指令建立镜像

`docker build -t ipython/notebook .`

* 通过以下指令启动容器

`docker run -d -p 8888:8888 -e PASSWORD=admin ipython/notebook`

注意，我们将初始登录密码以环境变量的形式传入容器并告知应用。

打开游览器，访问 8888 端口，就可以看到 IPython Notebook 了。





































