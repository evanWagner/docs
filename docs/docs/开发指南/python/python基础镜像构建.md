## 如何制作一个定制的 Python 基础 Docker 镜像
> 目标：准备一个定制的 Python 基础镜像。  
> 基础镜像，通常为含最小功能的系统镜像，之后的应用镜像都以此为基础。   

#### 制作基础镜像  
###### 选择 Ubuntu 官方的 14.04 版本为我们依赖的系统镜像。   
```
FROM ubuntu:trusty
```    

用 RUN 命令调用 apt-get 包管理器安装 Python 环境所依赖的程序包。  
> 安装依赖包相对比较固定，因此该动作应该尽量提前，这样做有助于提高镜像层的复用率。  
> 安装完依赖后清理缓存文件 / 临时文件可以显著的减少镜像大小。  
```
RUN apt-get update && \  
	apt-get install -y python \  
	                   python-dev \  
	                   python-pip && \  
	rm -rf /var/lib/apt/lists/*  
```

> 以下这个方法不建议采用，原因是比上述命令多添加了一层镜像，然而并没有降低总镜像的体积。
```
RUN apt-get update && \  
	apt-get install -y python \  
	                   python-dev \  
	                   python-pip   
	RUN rm -rf /var/lib/apt/lists/*  
```

###### 用 RUN 命令调用 mkdir 来准备一个干净的放置代码的目录。  
```
RUN mkdir -p /app
```  

###### 指定其为当前的工作目录。  
```
WORKDIR /app
```  

###### 指定暴露的容器内端口地址，最后设置默认启动命令。  
```
EXPOSE 80
CMD ["bash"]  
```
至此一个 Python 的基础镜像制作完毕，您可以在本地运行 `docker build -t registry.cosmoplat.com/test/python-based:1.0.0 .` 来构建出这个镜像并命名为 `registry.cosmoplat.com/test/my-python-base:1.0.0` 。  

Python 家族成员众多，因此需要一个通用的基础镜像，并在此基础上根据需求进行定制。  

#### 完整的 Dockerfile  
```
# Ubuntu 14.04，Trusty Tahr（可靠的塔尔羊）发行版
FROM ubuntu:trusty
	
# APT 自动安装 Python 相关的依赖包，如需其他依赖包在此添加
RUN apt-get update && \
	apt-get install -y python \
	                   python-dev \
	                   python-pip  \
# 用完包管理器后安排清理缓存文件/临时文件可以显著的减少镜像大小
	&& apt-get clean \
	&& apt-get autoclean \
	&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* 
	
# 配置默认放置 App 的目录
RUN mkdir -p /app
WORKDIR /app
EXPOSE 80
CMD ["bash"]
```  
  
至此，便可得到 python 的基础镜像，接下来便可在此基础上根据需求定制 python 应用了

#### 镜像构建与上传
Dockerfile 制作好之后就需要构建镜像，借助PaaS平台可以快速构建以及上传。      

也可以在Docker环境中使用命令行进行构建与上传。

PaaS 平台镜像构建与上传请看教程 [PaaS 平台应用镜像构建](../PaaS平台使用指南/PaaS平台应用镜像构建.md)  
