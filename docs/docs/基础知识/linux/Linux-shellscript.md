## Linux 的程序化脚本介绍
Shell scripts(程序化脚本)是利用 shell 的功能所写的一个“程序 ( program )”，这个程序是使用纯文本文件，将一些 shell 的语法与指令（含外部指令）写在里面， 搭配正则表达式、管线命令与数据流重导向等功能，以达到我们所想要的处理目的。  
类似早期 DOS 年代的批处理文件( .bat )，最简单的功能就是将许多指令汇整写在一起， 让使用者很轻易的就能够 以 one touch 的方法去处理复杂的动作。 Shell scripts 也更利于自动化，方便持续集成。  

在这里给出一个简单的 Hello World 示例
```
[root@mcd-dce-controller ~]$ vim hello.sh
#!/bin/bash
# Program：
# This program shows "Hello World!" in your screen.
# History：
# 2015/07/16 VBird First release
PATH=/bin;/sbin;/usr/bin;/usr/sbin;/usr/local/bin;/usr/local/sbin;~/bin
export PATH
echo -e "Hello World! \a \n"
exit 0
```
第一行是命令行输入 `vim hello.sh` ，大部分 shell script 都是 .sh 文件，所以在编写脚本时也尽量保存为 .sh 文件。   
之后在同一目录下执行 `sh hello.sh` 即可得到程序输出 Hello World!     

脚本中第一行 #! 是申明所用的 shell，其余的 # 都是表示注释。 PATH 是申明的路径环境变量，它申明了系统使用的文件路径。通常脚本都会这样申明PATH环境变量。 `exit 0` 用于正常退出脚本，通常在脚本最后都添加一条这个语句让脚本程序运行完自动退出。    

脚本的语法与 C 语言十分类似，同样包含循环，判断等等。因为脚本是使用 shell 来执行的，所以每行语句的命令和命令行输入无异。 

#### Script 的判断语句
判断语句有多种实现形式，常用的有 test 指令，中括号 []，if..then 语句和 case..esac 语句。    

+ **test**

test 语句十分强大，可以判断许多情况，例如判断文件存在，判断文件属性，判断大小等等。 test 语句执行不输出任何东西，但是它会有执行的结果，所以可以使用 && ，|| 或者装台码来进行判断以及执行指令。   
如 `test -e /dmtsai && echo "exist" || echo "Not exist"` ,表明若存在文件 dmtsai ，则输出 exist ，否则输出 Not exist       
test 是一条指令，所以可以使用 man 指令查看 test 全部的具体用法，即 `man test`。      
  
+ **中括号 []**      


中括号内可以放一个判断式，然后和 test 一样，执行判断，不输出任何东西。它可以和 test 一样使用状态码或者 && 和 || 来执行指令。不过中括号常常与 if 语句一起使用。   
使用中括号时需要注意，括号内的每个元件都需要有空白键来分隔，变量都要以双引号括起来，常数都以单或双引号括起来。例如 `[ "${test}" == 'hello' ]` 。     
具体的例子：   
```
#!/bin/bash
# Program:
# This program shows the user's choice
# History:
# 2015/07/16 VBird First release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
read -p "Please input （Y/N）: " yn
[ "${yn}" == "Y" -o "${yn}" == "y" ] && echo "OK, continue" && exit 0
[ "${yn}" == "N" -o "${yn}" == "n" ] && echo "Oh, interrupt!" && exit 0
echo "I don't know what your choice is" && exit 0
```

+ **if...then 语句**  
if 语句的具体格式如下  
```
if [条件判断式]; then
	某些指令工作内容
elif [条件判断式]; then
	某些指令工作内容
else 
	某些指令工作内容
fi
```
中括号就和上述介绍的使用方式一样，仅是添加到 if 语句之中。需要注意的是中括号后面需要跟一个分号。   
多个条件可以使用 && 与 || 连接，在 if 语句中，&& 表示 AND ，|| 表示 RO。    
具体的例子     
```
#!/bin/bash
# Program:
# Using netstat and grep to detect WWW,SSH,FTP and Mail services.
# History:
# 2015/07/16 VBird First release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
# 1\. 先作一些告知的动作
echo "Now, I will detect your Linux server's services!"
echo -e "The www, ftp, ssh, and mail（smtp） will be detect! \n"
# 2\. 开始进行一些测试的工作，并且也输出一些信息
testfile=/dev/shm/netstat_checking.txt
netstat -tuln > ${testfile} # 先转存数据到内存当中！不用一直执行 netstat
testing=$（grep ":80 " ${testfile}） # 侦测看 port 80 在否？
if [ "${testing}" != "" ]; then
echo "WWW is running in your system."
fi
testing=$（grep ":22 " ${testfile}） # 侦测看 port 22 在否？
if [ "${testing}" != "" ]; then
echo "SSH is running in your system."
fi
testing=$（grep ":21 " ${testfile}） # 侦测看 port 21 在否？
if [ "${testing}" != "" ]; then
echo "FTP is running in your system."
fi
testing=$（grep ":25 " ${testfile}） # 侦测看 port 25 在否？
if [ "${testing}" != "" ]; then
echo "Mail is running in your system."
fi
```

+ **case...esac 语句**
case 语句和 c 语言中的 switch 语句十分类似，其具体格式如下    
```
case $变量名称 in 
    "第一个变量内容"） 
        程序段
        ;; 
    "第二个变量内容"）
        程序段
        ;;
    *） 
        不包含第一个变量内容与第二个变量内容的其他程序执行段
        exit 1
        ;;
esac
```
每个程序段之后都需要用两个分号来分割，最后的 *) 是默认操作，类似 switch 的 default    
```
#!/bin/bash
# Program:
# Show "Hello" from $1.... by using case .... esac
# History:
# 2015/07/16 VBird First release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
case ${1} in
    "hello"）
        echo "Hello, how are you ?"
        ;;
    ""）
        echo "You MUST input parameters, ex&gt; {${0} someword}"
        ;;
    *） 
        echo "Usage ${0} {hello}"
        ;;
esac
```

#### Script的循环
Linux 的循环语句与 C 语言十分相似，有 while ，until 以及 for 三种语句    
+ **while 语句**    
具体格式为
```
while [ 条件 ] 
do 
    程序段
done 
```
while 是条件成立时就执行循环，直到条件不成立。类似的还有 until 语句

+ **until 语句**   
具体格式为
```
until [ 条件 ]
do
    程序段
done
``` 
与 while 不同的是，until 是当条件不成立时执行循环，直到条件成立。    
具体例子    
```
#!/bin/bash
# Program:
# Repeat question until user input correct answer.
# History:
# 2015/07/17 VBird First release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
until [ "${yn}" == "yes" -o "${yn}" == "YES" ]
do
    read -p "Please input yes/YES to stop this program: " yn
done
echo "OK! you input the correct answer."
```

+ **for 语句**
具体格式为
```
for var in con1 con2 con3 ...
do
    程序段
done
```
linux 的 for 语句与 python 的 for 语句十分相似，in 之后跟着的是一组变量列表，每个循环 var 都获取变量中列表中的一个变量，执行循环。第二次循环时 var 选择下一个变量来执行循环。    
具体例子
```
#!/bin/bash
# Program:
# Using for .... loop to print 3 animals
# History:
# 2015/07/17 VBird First release
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
for animal in dog cat elephant
do
    echo "There are ${animal}s.... "
done
```