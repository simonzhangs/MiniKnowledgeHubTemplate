# Minio

MinIO 是一款基于 Go 语言发开的高性能、分布式的对象存储系统，支持 S3 协议。

官网地址：https://min.io/

安装和启动：

```
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio
./minio server /data
```

官方客户端 mc，

```
curl https://dl.min.io/client/mc/release/linux-amd64/mc \
  --create-dirs \
  -o $HOME/minio-binaries/mc

chmod +x $HOME/minio-binaries/mc
export PATH=$PATH:$HOME/minio-binaries/

mc --help
```

创建桶 Bucket:

```
mc mb --with-locks myminio/mydata
```

上传和下载文件：

```
mc cp --recursive ~/mydata/ myminio/mydata/
mc cp play/mybucket/object.txt ~/mydata/object.txt

或者
mc get minio/marketing/logo.png ~/images/collateral
mc put ~/images/collateral/logo.png minio/marketing
```

删除文件：

```
mc rm --recursive myminio/mydata
```
