# sed

Linux sed 命令是利用脚本来处理文本文件。

将文件中的 oo 改为 kk

```
sed -i 's/oo/kk/g' testfile
```

将 IP 前面的部分予以删除：

```
$ /sbin/ifconfig eth0 | grep 'inet addr' | sed 's/^.*addr://g'
192.168.1.100 Bcast:192.168.1.255 Mask:255.255.255.0
```

在文件最后添加一行内容：

```
sed -i '$a # This is a test' regular_express.txt
```
