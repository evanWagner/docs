#### 概述
在整个平台应用容器化对接中，相关的工作主要有以下部分：

+ 应用容器化可行性评估  
+ 构建应用镜像  
+ 编写应用部署编排模板  
+ 测试  
+ 平台上线  

#### DotNet 应用上平台  
DotNet 应用上平台可以遵循标准的应用容器化流程，在操作前需要确认应用程序是基于  .NET Core 来开发的。 DotNET Core 是应用跨平台的基础。  

###### 关于 .NET Core

使用  .NET 构建服务端容器化的应用程序时，有两个框架可供选择：  .NET Framework 和  .NET Core 。它们之间共享了很多  .NET 平台组件，我们可以在它们之间共享代码。但是这两者也有着根本性的不同，选择哪个框架，取决于想实现什么。  
如下这些情况，应使用  .NET Core 和 Linux 或 Windows 容器来开发容器化的 Docker 服务端应用程序：   

+ 需要跨平台。例如，需要同时使用 Linux 容器和 Windows 容器  
+ 应用程序架构是基于微服务的  
+ 需要容器快速启动，希望容器尽量保持轻量级，以获得更高“密度”，也就是说，为了节约成本，希望在每个硬件单元上承载更多容器  

简言之，在创建一个新的容器化  .NET 应用程序时，应该把  .NET Core 作为默认选择。  .NET Core 有很多优势，并且它和容器的方法论和工作方式完美匹配。  
使用  .NET Core 的另一个优势是，在同一台机器上，可以同时运行基于不同  .NET 版本的应用程序。对于不使用容器的服务器或虚拟机来说，这一点更加重要，因为容器可根据不同  .NET 版本将应用程序隔离。（只要它们和底层操作系统是兼容的。）  

如下这些情况，应该使用  .NET Framework 来开发容器化的 Docker 服务端应用程序：  

+ 用程序目前使用了  .NET Framework ，并且高度依赖于 Windows
+ 需要使用  .NET Core 不支持的 Windows API  
+ 需要使用  .NET Core 不支持的第三方的  .NET 库或 NuGet 包

######  .NET Framework 或  .NET Core 的决策因素  

下表概括总结了应该使用  .NET Framework 或  .NET Core 的决策因素。请务必注意， Linux 容器必须使用基于 Linux 的 Docker 主机 （虚拟机或服务器）：

架构/应用类型|Linux 容器|Windows 容器 
 :------|:------| :------
基于容器的微服务| .NET Core| .NET Core 
单体应用| .NET Core| .NET Framework<br> .NET Core 
获得最好的性能和可扩展性| .NET Core| .NET Core 
传统 Windows Server 应用程序(“遗留的应用程序”)迁移到容器|--|  .NET Framework  
基于容器的全新应用程序(“新开发的应用程序”)| .NET Core| .NET Core 
ASP .NET Core| .NET Core| .NET Core (推荐)<br> .NET Framework  
ASP .NET 4 (MVC 5、Web API 2 和 Web Forms)|--| .NET Framework  
SignalR 服务| .NET Core 2.1 （发布后）或更高版本 | .NET Framework<br> .NET Core 2.1 （发布后）或更高版本  
WCF、WF 和其他传统框架|WCF in  .NET Core （仅支持 WCF 客户端库） _| .NET Framework WCF in  .NET Core （只支持 WCF 客户端库） _  
需要使用 Azure 服务| .NET Core <br>（最终所有 Azure 服务都会提供支持  .NET Core 的客户端 SDK)| .NET Framework  .NET Core <br>（最终所有 Azure 服务都会提供支持  .NET Core 的客户端 SDK ) 

对于 Linux ，官方提供的  .NET Docker 镜像已可以使用并支持多种发行版（如 Debian）。   
下图列出了取决于所用  .NET 框架，可以使用的操作系统版本  

![]( image/net_target_os.jpg)  
 

###### 	在 Linux 上部署单容器  .NET Core Web 应用程序  
Visual Studio 提供了一个项目模板，可用于给解决方案添加 Docker 支持。右键点击项目，点击 “Add” ，然后选择 “Docker Support” 即可。这个模板会给项目添加一个 Dockerfile ，同时还会添加一个新的  docker-compose 项目，它提供了初始的 docker-compose.yml 文件。在从 GitHub 下载回来的 eShopWeb 项目中，这一步已经完成了。我们可以看到这个解决方案已包含 eShopOnWeb 项目和 docker-compose 项目，如图所示：  
 ![]( image/net_core_web_app.jpg)  

这些文件是标准的 docker-compose.yml 文件，与其他 Docker 项目相同。我们可以通过 Visual Studio 和命令行来使用它们。该应用程序运行在  .NET Core上 ，使用 Linux 容器，所以也可以在 Mac 或 Linux 机器上编码、生成和运行。   
docker-compose.yml 文件包含了如下信息：要构建哪些镜像，要启动哪些容器。这个模板指定了构建 eshopweb 镜像的方法和启动应用程序容器的方法。除此之外，我们还需要添加对 SQL Server 相关的依赖，包括添加一个 SQL Server 镜像（如 mssql-server-linux），并为 sql.data 镜像添加一个服务，让 Docker 来构建和启动这个容器。具体示例如下：   
```
version: '2' 
services: 
eshopweb: 
image: eshop/web 
build: 
context: ./eShopWeb 
dockerfile: Dockerfile 
depends_on: 
- sql.data 
sql.data: 
image: microsoft/mssql-server-linux 
```

`depends_on` 指令会告诉 Docker：eShopWeb 镜像依赖于 sql.data 镜像。随后的几行指令将用 microsoft/mssql-server-linux 镜像来构建一个标签为 sql.data 的镜像。   
在docker-compose.yml 主节点之下，docker-compose 项目还包含了其他 docker-compose 文件，从视觉上即可看出这些文件是相关的。docker-compose-override.yml 文件包含所有服务的设置，例如，连接字符串和其他应用程序设置。   
下列示例展示了 docker-compose.vs.debug.yml 文件的内容，它包含在 Visual Studio 调试会用到的设置。在该文件中，eshopweb 镜像具有一个附加的 dev 标签，借此可将调试镜像和发布镜像区分开来，防止不小心把调试信息部署到生产环境中。
```   
version: '2' 
services: 
eshopweb: 
image: eshop/web:dev 
build: 
args: 
source: ${DOCKER_BUILD_SOURCE} 
environment: 
- DOTNET_USE_POLLING_FILE_WATCHER=1 
volumes: 
- ./eShopWeb:/app 
- ~/.nuget/packages:/root/.nuget/packages:ro 
- ~/clrdbg:/clrdbg:ro 
entrypoint: tail -f /dev/null 
labels: 
- "com.microsoft.visualstudio.targetoperatingsystem=linux" 
```

随后添加的最后一个文件是 docker-compose.ci.build.yml 。在 CI 服务器中，通过命令行生成项目时会用到它。这个 compose 文件会启动一个 Docker 容器，为应用程序构建必需的镜像。下列示例展示了 docker-compose.ci.build.yml 文件的内容： 

```
version: '2' 
services: 
ci-build: 
image: microsoft/aspnetcore-build:latest 
volumes: 
- .:/src 
working_dir: /src 
# The following two lines in the document are one line in the YML file. 
command: /bin/bash -c "dotnet restore ./eShopWeb.sln && dotnet publish 
./eShopWeb.sln -c Release -o ./obj/Docker/publish" 
```

请注意：这是 ASP .NET Core 生成镜像。后者包含了 SDK 和生成工具，用来生成应用程序并创建所需镜像。运行 docker-compose 项目会用这个文件来启动生成容器，随后在该容器中构建应用程序的镜像。在 Docker 容器中，我们需要把这个 docker-compose 文件添加到生成命令中，然后执行。  
在 Visual Studio 中，可以把 docker-compose 项目设置为启动项目，然后按 “Ctrl+F5”（F5 用来调试），直接在 Docker 容器中运行应用程序，这和其他应用程序没有什么不同。启动 docker-compose 项目时， Visual Studio 会用 docker-compose.yml 文件、 docker-compose.override.yml 文件和其中一个 docker-compose.vs.* 文件来运行 docker-compose 命令。如果应用程序已启动， Visual Studio 会直接启动浏览器。   
如果在调试器中启动该应用程序， Visual Studio 会附加到运行在 Docker 中的应用程序上。  

###### 移植  .NET Framework 项 目至  .NET Core  
如果要将基于  .NET 开发的已有的 Web 应用可以跨平台运行，必须要把现有的 .net framework 程序迁移到 .net core 上，是一个非常复杂的工作，特别是一些 API 在两个平台上还不能同时支持，两个类库的差异性,通过人工很难识别全。  
风险评估需要考虑以下方面：    

+ 移植工程师的技能水平和移植经验
+ 使用的编译器
+ 使用的编程语言
+ 第三方软件和中间件的可用性
+ 编译环境和工具
+ 平台依赖的结构
+ 平台和硬件依赖的代码
+ 需要搭建的测试环境
+ 用户界面需求    

下面的表总结了需要考虑的各个方面的难易程度：      

内容|容易|中等复杂度|高复杂度
 :------|:------| :------| :------
编译器/编程语言|C#、F#	|使用的语言在  .NET Core 上支持有限|待移植代码的是 C++/CLI
使用第三方产品或中间件|None| .NET Core 上支持的和可用的|Linux 上不支持的；<br>使用了 C++ 编写的第三方工具
编译环境和工具|Msbuild 脚本|Msbuild 脚本和编译脚本组合在一起| 
平台/硬件依赖的代码|非平台/硬件依赖的代码|平台/硬件依赖的代码来自第三方产品，而且已经移植到了  .NET Core|使用了内核扩展及设备驱动代码
测试环境及其搭建|独立的|客户端/服务器设置|网络、高可用行，集群；需要外部设备来测试，如打印机、光纤连接通道磁盘等
用户界面|ASP .NET MVC|ASP .NET WebForm|不可移植的用户界面，例如 WPF




