# Vim

## 位置跳转

```

CTRL-O 跳转到上一个位置
CTRL-I 跳转到下一个位置
CTRL-^ 跳转到 alternate file (当前窗口的上一个文件）
CTRL-] 跳转到当前光标文字下的超链接
CTRL-T 返回到跳转之前的位置
% 跳转到 {} () [] 的匹配
gd 跳转到局部定义（光标下的单词的定义）
gD 跳转到全局定义（光标下的单词的定义）
gf 打开名称为光标下文件名的文件
[[跳转到上一个顶层函数（比如C语言以大括号分隔）]] 跳转到下一个顶层函数（比如 C 语言以大括号分隔）
[m 跳转到上一个成员函数
]m 跳转到下一个成员函数
[{ 跳转到上一处未匹配的 {
]} 跳转到下一处未匹配的 }
[( 跳转到上一处未匹配的 (
]) 跳转到下一处未匹配的 )
[c 上一个不同处（diff 时）
]c 下一个不同处（diff 时）
[/ 跳转到 C 注释开头
]/ 跳转到 C 注释结尾
``                 回到上次跳转的位置
''                  回到上次跳转的位置`. 回到上次编辑的位置
'. 回到上次编辑的位置
```

## 文件操作

```
:w 保存文件
:w <filename> 按名称保存文件
:e <filename> 打开文件并编辑
:saveas <filename> 另存为文件
:r <filename> 读取文件并将内容插入到光标后
:r !dir 将 dir 命令的输出捕获并插入到光标后
:close 关闭文件
:q 退出
:q! 强制退出
:wa 保存所有文件
:cd <path> 切换 Vim 当前路径
:pwd 显示 Vim 当前路径
:new 打开一个新的窗口编辑新文件
:enew 在当前窗口创建新文件
:vnew 在左右切分的新窗口中编辑新文件
:tabnew 在新的标签页中编辑新文件
```

## 已打开文件操作

```
:ls 查案缓存列表
:bn 切换到下一个缓存
:bp 切换到上一个缓存
:bd 删除缓存
:b 1 切换到 1 号缓存
:b abc 切换到文件名为 abc 开头的缓存
:badd <filename> 将文件添加到缓存列表
:set hidden 设置隐藏模式（未保存的缓存可以被切换走，或者关闭）
:set nohidden 关闭隐藏模式（未保存的缓存不能被切换走，或者关闭）
n CTRL-^ 切换缓存，先输入数字的缓存编号，再按 CTRL + 6
```

## 窗口操作

```

:sp <filename> 上下切分窗口并在新窗口打开文件 filename
:vs <filename> 左右切分窗口并在新窗口打开文件 filename
CTRL-W s 上下切分窗口
CTRL-W v 左右切分窗口
CTRL-W w 循环切换到下一个窗口
CTRL-W W 循环切换到上一个窗口
CTRL-W p 跳到上一个访问过的窗口
CTRL-W c 关闭当前窗口
CTRL-W o 关闭其他窗口
CTRL-W h 跳到左边的窗口
CTRL-W j 跳到下边的窗口
CTRL-W k 跳到上边的窗口
CTRL-W l 跳到右边的窗口
CTRL-W + 增加当前窗口的行高，前面可以加数字
CTRL-W - 减少当前窗口的行高，前面可以加数字
CTRL-W < 减少当前窗口的列宽，前面可以加数字
CTRL-W > 增加当前窗口的列宽，前面可以加数字
CTRL-W = 让所有窗口宽高相同
CTRL-W H 将当前窗口移动到最左边
CTRL-W J 将当前窗口移动到最下边
CTRL-W K 将当前窗口移动到最上边
CTRL-W L 将当前窗口移动到最右边
CTRL-W x 交换窗口
CTRL-W f 在新窗口中打开名为光标下文件名的文件
CTRL-W gf 在新标签页中打开名为光标下文件名的文件
CTRL-W R 旋转窗口
CTRL-W T 将当前窗口移到新的标签页中
CTRL-W P 跳转到预览窗口
CTRL-W z 关闭预览窗口
CTRL-W \_ 纵向最大化当前窗口
CTRL-W | 横向最大化当前窗口
```

## 标签页

```

:tabs 显示所有标签页
:tabe <filename> 在新标签页中打开文件 filename
:tabn 下一个标签页
:tabp 上一个标签页
:tabc 关闭当前标签页
:tabo 关闭其他标签页
:tabn n 切换到第 n 个标签页，比如 :tabn 3 切换到第三个标签页
:tabm n 标签移动
:tabfirst 切换到第一个标签页
:tablast 切换到最后一个标签页
:tab help 在标签页打开帮助
:tab drop <file> 如果文件已被其他标签页和窗口打开则跳过去，否则新标签打开
:tab split 在新的标签页中打开当前窗口里的文件
:tab ball 将缓存中所有文件用标签页打开
:set showtabline=? 设置为 0 就不显示标签页标签，1 会按需显示，2 会永久显示
ngt 切换到第 n 个标签页，比如 2gt 将会切换到第二个标签页
gt 下一个标签页
gT 上一个标签页
```

## 书签

```

:marks 显示所有书签
ma 保存当前位置到书签 a ，书签名小写字母为文件内，大写全局
'a 跳转到书签 a 所在的行
`a                  跳转到书签 a所在位置
`. 跳转到上一次编辑的行
'A 跳转到全文书签 A
[' 跳转到上一个书签
]' 跳转到下一个书签
'< 跳到上次可视模式选择区域的开始
'> 跳到上次可视模式选择区域的结束
:delm a 删除缓冲区标签 a
:delm A 删除文件标签 A
:delm! 删除所有缓冲区标签(小写字母), 不能删除文件标签和数字标签
:delm A-Z 删除所有文件标签(大写字母)
:delm 0-9 删除所有数字标签(.viminfo)
:delm A-Z0-9 删除所有文件标签和数字标签
```

## 常用设置

```

:set nocompatible 设置不兼容原始 vi 模式（必须设置在最开头）
:set bs=? 设置 BS 键模式，现代编辑器为 :set bs=eol,start,indent
:set sw=4 设置缩进宽度为 4
:set ts=4 设置制表符宽度为 4
:set noet 设置不展开 tab 成空格
:set et 设置展开 tab 成空格
:set winaltkeys=no 设置 GVim 下正常捕获 ALT 键
:set nowrap 关闭自动换行
:set ttimeout 允许终端按键检测超时（终端下功能键为一串 ESC 开头的扫描码）
:set ttm=100 设置终端按键检测超时为 100 毫秒
:set term=? 设置终端类型，比如常见的 xterm
:set ignorecase 设置搜索忽略大小写(可缩写为 :set ic)
:set noignorecase 设置搜索不忽略大小写(可缩写为 :set noic)
:set smartcase 智能大小写，默认忽略大小写，除非搜索内容里包含大写字母
:set list 设置显示制表符和换行符
:set number 设置显示行号，禁止显示行号可以用 :set nonumber
:set relativenumber 设置显示相对行号（其他行与当前行的距离）
:set paste 进入粘贴模式（粘贴时禁用缩进等影响格式的东西）
:set nopaste 结束粘贴模式
:set spell 允许拼写检查
:set hlsearch 设置高亮查找
:set ruler 总是显示光标位置
:set incsearch 查找输入时动态增量显示查找结果
:set insertmode Vim 始终处于插入模式下，使用 ctrl-o 临时执行命令
:set all 列出所有选项设置情况
:syntax on 允许语法高亮
:syntax off 禁止语法高亮
```

## 帮助信息

```

:h tutor 入门文档
:h quickref 快速帮助
:h index 查询 Vim 所有键盘命令定义
:h summary 帮助你更好的使用内置帮助系统
:h CTRL-H 查询普通模式下 CTRL-H 是干什么的
:h i*CTRL-H 查询插入模式下 CTRL-H 是干什么的
:h i*<Up> 查询插入模式下方向键上是干什么的
:h pattern.txt 正则表达式帮助
:h eval 脚本编写帮助
:h function-list 查看 VimScript 的函数列表
:h windows.txt 窗口使用帮助
:h tabpage.txt 标签页使用帮助
:h +timers 显示对 +timers 特性的帮助
:h :! 查看如何运行外部命令
:h tips 查看 Vim 内置的常用技巧文档
:h set-termcap 查看如何设置按键扫描码
:viusage NORMAL 模式帮助
:exusage EX 命令帮助
:version 显示当前 Vim 的版本号和特性
```

## 外部命令

```

:!ls 运行外部命令 ls，并等待返回
:r !ls 将外部命令 ls 的输出捕获，并插入到光标后
:w !sudo tee % sudo 以后保存当前文件
:call system('ls') 调用 ls 命令，但是不显示返回内容
:!start notepad Windows 下启动 notepad，最前面可以加 silent
:sil !start cmd Windows 下当前目录打开 cmd
:%!prog 运行文字过滤程序，如整理 json 格式 :%!python -m json.tool
```

## Quickfix 窗口

```

:copen 打开 quickfix 窗口（查看编译，grep 等信息）
:copen 10 打开 quickfix 窗口，并且设置高度为 10
:cclose 关闭 quickfix 窗口
:cfirst 跳到 quickfix 中第一个错误信息
:clast 跳到 quickfix 中最后一条错误信息
:cc [nr] 查看错误 [nr]
:cnext 跳到 quickfix 中下一个错误信息
:cprev 跳到 quickfix 中上一个错误信息
```

## 拼写检查

```

:set spell 打开拼写检查
:set nospell 关闭拼写检查
]s 下一处错误拼写的单词
[s 上一处错误拼写的单词
zg 加入单词到拼写词表中
zug 撤销上一次加入的单词
z= 拼写建议
```

## 代码折叠

```

za 切换折叠
zA 递归切换折叠
zc 折叠光标下代码
zC 折叠光标下所有代码
zd 删除光标下折叠
zD 递归删除所有折叠
zE 删除所有折叠
zf 创建代码折叠
zF 指定行数创建折叠
zi 切换折叠
zm 所有代码折叠一层
zr 所有代码打开一层
zM 折叠所有代码，设置 foldlevel=0，设置 foldenable
zR 打开所有代码，设置 foldlevel 为最大值
zn 折叠 none，重置 foldenable 并打开所有代码
zN 折叠 normal，重置 foldenable 并恢复所有折叠
zo 打开一层代码
zO 打开光标下所有代码折叠
```

## 宏录制

```

qa 开始录制名字为 a 的宏
q 结束录制宏
@a 播放名字为 a 的宏
@@ 播放上一个宏
@: 重复上一个 ex 命令（即冒号命令）
```

## 其他命令

```

CTRL-X CTRL-F 插入模式下文件路径补全
CTRL-X CTRL-O 插入下 Omnifunc 补全
CTRL-X CTRL-N 插入模式下关键字补全
CTRL-X CTRL-E 插入模式下向上滚屏
CTRL-X CTRL-Y 插入模式下向下滚屏
CTRL-E 向上滚屏
CTRL-Y 向下滚屏
CTRL-G 显示正在编辑的文件名，以及大小和位置信息
g CTRL-G 显示文件的：大小，字符数，单词数和行数，可视模式下也可用
zz 调整光标所在行到屏幕中央
zt 调整光标所在行到屏幕上部
zb 调整光标所在行到屏幕下部
ga 显示光标下字符的 ascii 码或者 unicode 编码
g8 显示光标下字符的 utf-8 编码字节序
gi 回到上次进入插入的地方，并切换到插入模式
K 查询光标下单词的帮助
ZZ 保存文件（如果有改动的话），并关闭窗口
ZQ 不保存文件关闭窗口
CTRL-PgUp 上个标签页，GVim OK，部分终端软件需设置对应键盘码
CTRL-PgDown 下个标签页，GVim OK，部分终端软件需设置对应键盘码
CTRL-R CTRL-W 命令模式下插入光标下单词
CTRL-INSERT 复制到系统剪贴板（GVIM）
SHIFT-INSERT 粘贴系统剪贴板的内容（GVIM）
:set ff=unix 设置换行为 unix
:set ff=dos 设置换行为 dos
:set ff? 查看换行设置
:set nohl 清除搜索高亮
:set termcap 查看会从终端接收什么以及会发送给终端什么命令
:set guicursor= 解决 SecureCRT/PenguiNet 中 NeoVim 局部奇怪字符问题
:set t_RS= t_SH= 解决 SecureCRT/PenguiNet 中 Vim8.0 终端功能奇怪字符
:set fo+=a 开启文本段的实时自动格式化
:earlier 15m 回退到 15 分钟前的文件内容
:.!date 在当前窗口插入时间
:%!xxd 开始二进制编辑
:%!xxd -r 保存二进制编辑
:r !curl -sL {URL} 读取 url 内容添加到光标后
:g/^\s*$/d 删除空行
:g/green/d 删除所有包含 green 的行
:v/green/d 删除所有不包含 green 的行
:g/gladiolli/# 搜索单词打印结果，并在结果前加上行号
:g/ab.*cd.\*efg/# 搜索包含 ab,cd 和 efg 的行，打印结果以及行号
:v/./,/./-j 压缩空行
:Man bash 在 Vim 中查看 man，先调用 :runtime! ftplugin/man.vim 激活
/fred\|joe 搜索 fred 或者 joe
/\<\d\d\d\d\> 精确搜索四个数字
/^\n\{3} 搜索连续三个空行
```
