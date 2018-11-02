## 使用基础镜像运行 python 包的应用
> 目标：用 Docker 的方式使用 python 的基础镜像搭建一个 python 包的应用  

#### 根据基础镜像构建镜像  
构建成功 python 的基础镜像后，便可以利用 python 的基础镜像构建镜像了！选择自己上传的特定镜像时需要指定镜像仓库，镜像空间，镜像名以及版本号    

###### 编写 Dockerfile    
```	
#利用构建的基础镜像registry.cosmoplat.com/test/python_based:1.0.0构建镜像
FROM registry.cosmoplat.com/test/python_based:1.0.0
	
WORKDIR /app
COPY . /app
	
RUN pip install -r Flask
EXPOSE 5050
	
ENTRYPOINT ["python", "app.py"]
```

###### 制作启动脚本  
制作 app.py ，即启动脚本：  
```	
import os
from flask import Flask
	
app = Flask(__name__)
	
@app.route('/')
def hello():
	return 'Hello World!'
	
if __name__ == '__main__':
	# Bind to PORT if defined, otherwise default to 5050.
	port = int(os.environ.get('PORT', 5050))
	app.run(host='0.0.0.0', port=port)
```

#### 镜像应用部署
要在 PaaS 平台部署服务，就需要将构建好的镜像上传到平台上，上传之后才可以在平台上进行部署。    
PaaS 服务部署具体过程可以参考  [PaaS 平台应用的部署](../PaaS平台使用指南/PaaS平台应用的部署.md)      

或者在Docker环境中使用命令行部署。

部署完毕后，打开对应接入点 5050 ，即会出现 Hello World 的网页。



