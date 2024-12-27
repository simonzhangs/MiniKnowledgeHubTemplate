# netstat 网络相关命令

查询本机 IP 连接

```
netstat -an
```

查看网络 TCP 连接状态数量

```
netstat -n | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'
```

查看 8080 端口有多少个 TCP 连接

```
netstat -ant |grep 8080|wc -l
```

查看当前 TCP 连接状态为 ESTABLISHED 的数量

```
netstat -ant|grep 8080|grep ESTABLISHED|wc -l
```

查看 TCP 连接

```
netstat -ant
```

过滤某个 TCP 端口

```
netstat -ant |grep 端口号
```

查看 UDP 连接

```
netstat -anu
```

过滤某个 UDP 端口

```
netstat -anu |grep 端口号
```

实时监控 UDP 连接信息，每隔 2 秒自动更新一次

```
watch -n 2 'netstat -anu'
```
