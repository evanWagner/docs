## 制作一个定制的 PHP 基础 Docker 镜像
> 目标：准备一个定制的 PHP 基础镜像。基础镜像，通常为含最小功能的系统镜像，之后的应用镜像都以此为基础。

#### 前言
虽然基础镜像可以使用官方仓库的 PHP 基础镜像，但是自己构建基础镜像可以更好的定制镜像，减少应用 Dockerfile 的复杂度，也能提升交付效率。同时，还可以更深入了解 Dockerfile 的构建规则。

#### 编写 Dockerfile
此处先给出完整 Dockerfile 文件，方便后面说明   
```
FROM ubuntu:trusty

RUN apt-get update \
    && apt-get -y install \
        curl \
        wget \
        apache2 \
        libapache2-mod-php5 \
        php5-mysql \
        php5-sqlite \
        php5-gd \
        php5-curl \
        php-pear \
        php-apc \
        
    && apt-get clean \
    && apt-get autoclean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \

    && php -r "copy('https://install.phpcomposer.com/installer', 'composer-setup.php');" \
    && php composer-setup.php \
    && php -r "unlink('composer-setup.php');" \
    && mv composer.phar /usr/local/bin/composer \

    && echo "ServerName localhost" >> /etc/apache2/apache2.conf \

    && sed -i 's/variables_order.*/variables_order = "EGPCS"/g' \
        /etc/php5/apache2/php.ini \

    && mkdir -p /app && rm -rf /var/www/html && ln -s /app /var/www/html

CMD [""]
```

#### Dockerfile 文件说明
```
FROM ubuntu:trusty
```
此处选择了官方维护的 Ubuntu 14.04，Trusty Tahr(可靠的塔尔羊)发行版镜像作为基础镜像，之后在此基础上添加 PHP 支持。
```
RUN apt-get update \
    && apt-get -y install \
        curl \
        wget \
        apache2 \
        libapache2-mod-php5 \
        php5-mysql \
        php5-sqlite \
        php5-gd \
        php5-curl \
        php-pear \
        php-apc \

    && apt-get clean \
    && apt-get autoclean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
```
使用 `apt-get` 安装 PHP 相关的依赖包，如需其他依赖包也可以在这一部分添加。然后在安装完毕后清理安装包以及安装文件夹，这样可以显著减小镜像大小。
```
    && php -r "copy('https://install.phpcomposer.com/installer', 'composer-setup.php');" \
    && php composer-setup.php \
    && php -r "unlink('composer-setup.php');" \
    && mv composer.phar /usr/local/bin/composer \
```
安装 PHP 依赖关系管理工具 Composer，许多框架会依赖它。上述四句语句前三句分别用于下载，安装 Composer ，清理 Composer 安装脚本。最后一个语句是将 Composer 放到系统文件夹中，使得可以直接使用 composer 指令。
```
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf \
```
修改 Apache 2 配置文件，给 Apache 2 设置一个默认服务名。
```
    && sed -i 's/variables_order.*/variables_order = "EGPCS"/g' \
            /etc/php5/apache2/php.ini \
```
修改 PHP 配置文件，调整 PHP 处理 Request 里变量提交值的顺序，解析顺序从左到右，后解析新值覆盖旧值,默认设定为 EGPCS（ENV/GET/POST/COOKIE/SERVER）
```
    && mkdir -p /app && rm -rf /var/www/html && ln -s /app /var/www/html
```
配置默认放置 App 的目录
```
CMD [""]
```
不运行任何指令，单纯作为基础镜像使用。


#### 镜像构建与上传
具体构建方法可以查看教程 [PaaS 平台镜像构建与上传](../PaaS平台使用指南/PaaS平台应用镜像构建.md)    
构建的镜像名称为 `registry.cosmoplat.com/test/php-base:1.0.0` 。     

至此，PHP 基础镜像构建成功！    
