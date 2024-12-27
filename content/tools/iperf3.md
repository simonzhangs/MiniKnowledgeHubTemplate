# Iperf3 网络测试工具

Iperf3 是一个网络性能测试工具。Iperf 可以测试最大 TCP 和 UDP 带宽性能，具有多种参数和 UDP 特性，可以根据需要调整，可以报告带宽、延迟抖动和数据包丢失.对于每个测试，它都会报告带宽，丢包和其他参数，可在 Windows、Mac OS X、Linux、FreeBSD 等各种平台使用，是一个简单又实用的小工具。

## 安装

```
yum install iperf3
```

## 使用

网络带宽测试

Iperf3 是 C/S(客户端/服务器端)架构模式，在使用 iperf3 测试时，要同时在 server 端与 client 端都各执行一个程序，让它们互相传送报文进行测试。

启动 Server 端的程序：

```
iperf3 -s
```

启动 Client 端的程序：

```
iperf3 -c 服务端IP地址
```

从打印内容可以查看网络带宽等参数。

更多内容请查看命令手册。
