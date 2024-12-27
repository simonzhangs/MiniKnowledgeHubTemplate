# 查找日志常用命令

查询 IP 信息，查找某条请求记录，然后打印出 IP 那一列，进行排序，再去重。可以得出请求的 IP 信息。

```
cat golog/20240905_ad.log |grep 'ad'|awk '{print $9}'|sort|uniq
```

从 IP 归属地库查询省份城市信息

```
cat ip.merge.txt |grep '河南省'|awk -v FS="|" '{print $5}'|sort|uniq
```

将行记录变成一行，并以逗号分割。

```
cat ip.merge.txt |grep '河南省'|awk -v FS="|" '{print $5}'|sort|uniq|paste -s -d ","
```
