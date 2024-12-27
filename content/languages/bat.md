# Bat 批处理

Bat 脚本是 Windows 操作系统下的一种以.bat 结尾的文件，可以直接双击点击使用即可。

## Hello World

```
echo 'Hello World'
```

Bat 脚本基本语法：

```
REM 这是注释，@echo off表示关闭Bat脚本内容展示
@echo off

REM set表示定义变量
set name=123

REM echo表示页面输出,%%中包含变量名可以使用变量
echo %name%

REM goto:eof表示结束不再继续下面的内容
goto:eof
```
