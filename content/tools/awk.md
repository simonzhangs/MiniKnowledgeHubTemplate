# Awk

awk 是一种处理文本文件的语言，是一个强大的文本分析工具。

使用分隔符指定列：

```
awk -F',' '{print $1, $2}' file
```

打印满足条件的行数：

```
awk '/pattern/ {print NR, $0}' file
```
