# SCP 正则匹配复制文件

scp 可以使用正则复制文件，一次复制多个文件

```
scp -P 2222 \*.mp4 root@host:/data/upfile/
```

scp 还可以复制文件夹，使用-r 属性，递归复制，例如下面的格式：

```
scp -P 2222 -r 2023/ root@host:/data/upfile/
```
