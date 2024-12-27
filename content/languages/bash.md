# Bash 脚本

Bash 是 Linux 和 Mac 的默认 Shell（命令行环境），系统管理和服务器开发都需要它。

网址：https://www.gnu.org/software/bash/

网上教程：https://wangdoc.com/bash/

## Hello World

echo "Hello World"

## 命令的组合符 && 和 ||

```
Command1 && Command2
```

上面命令的意思是，如果 Command1 命令运行成功，则继续运行 Command2 命令。

```
Command1 || Command2
```

上面命令的意思是，如果 Command1 命令运行失败，则继续运行 Command2 命令。

## type 命令用来判断命令的来源。

```
$ type echo
echo is a shell builtin
$ type ls
ls is hashed (/bin/ls)
```

## Here 文档

Here 文档（here document）是一种输入多行字符串的方法，格式如下。

```
<< token
text
token
```

它的格式分成开始标记（<< token）和结束标记（token）。开始标记是两个小于号 + Here 文档的名称，名称可以随意取，后面必须是一个换行符；结束标记是单独一行顶格写的 Here 文档名称，如果不是顶格，结束标记不起作用。两者之间就是多行字符串的内容。

```
 md5sum <<< 'ddd'
```

上面例子中，md5sum 命令只能接受标准输入作为参数，不能直接将字符串放在命令后面，会被当作文件名，即 md5sum ddd 里面的 ddd 会被解释成文件名。这时就可以用 Here 字符串，将字符串传给 md5sum 命令。

## 创建变量

```
myvar="hello world"
```

Bash 没有数据类型的概念，所有的变量值都是字符串。如果变量的值包含空格，则必须将值放在引号中。

读取变量的时候，直接在变量名前加上$就可以了。

export 命令用来向子 Shell 输出变量。

## 特殊符号

```
$?为上一个命令的退出码，用来判断上一个命令是否执行成功。返回值是 0，表示上一个命令执行成功；如果不是零，表示上一个命令执行失败。

$$
为当前 Shell 的进程 ID。

$_为上一个命令的最后一个参数。

$!为最近一个后台执行的异步命令的进程 ID。

$0为当前 Shell 的名称（在命令行直接执行时）或者脚本名（在脚本中执行时）。

$-为当前 Shell 的启动参数。

$#表示脚本的参数数量，$@表示脚本的参数值

#!后面就是脚本解释器的位置，Bash 脚本的解释器一般是/bin/sh 或/bin/bash。
```

## Read 读取用户输入的数据

```
#!/bin/bash

echo -n "输入一些文本 > "
read text
echo "你的输入：$text"
```

## while 循环

```
#!/bin/bash

number=0
while [ "$number" -lt 10 ]; do
  echo "Number = $number"
  number=$((number + 1))
done
```

## IF 条件

```
if test $USER = "foo"; then
  echo "Hello foo."
else
  echo "You are not foo."
fi
```

## 函数

```
hello() {
  echo "Hello $1"
}


function alice {
  echo "alice: $@"
  echo "$0: $1 $2 $3 $4"
  echo "$# arguments"

}

function log_msg {
  echo "[`date '+ %F %T'` ]: $@"
}

function func_return_value {
  return 10
}
```

## 数组

```
$ foo=(a b c d e f)
$ echo ${foo[@]}
a b c d e f
```

## 临时文件

mktemp 命令就是为安全创建临时文件而设计的。虽然在创建临时文件之前，它不会检查临时文件是否存在，但是它支持唯一文件名和清除机制，因此可以减轻安全攻击的风险。

```
#!/bin/bash

trap 'rm -f "$TMPFILE"' EXIT

TMPFILE=$(mktemp) || exit 1
echo "Our temp file is $TMPFILE"
```

为了保证脚本退出时临时文件被删除，可以使用 trap 命令指定退出时的清除操作。
