# frp

简单、高效的内网穿透工具。

网址：https://www.gofrp.org

## 通过 SSH 访问内网机器

1, 在具有公网 IP 的机器上部署 frps

部署 frps 并编辑 frps.toml 文件。以下是简化的配置，其中设置了 frp 服务器用于接收客户端连接的端口：

```
bindPort = 7000
```

2, 在需要被访问的内网机器上部署 frpc

部署 frpc 并编辑 frpc.toml 文件，假设 frps 所在服务器的公网 IP 地址为 x.x.x.x。以下是示例配置：

```
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000

```

localIP 和 localPort 配置为需要从公网访问的内网服务的地址和端口。
remotePort 表示在 frp 服务端监听的端口，访问此端口的流量将被转发到本地服务的相应端口。

3, 通过 SSH 访问内网机器

使用以下命令通过 SSH 访问内网机器，假设用户名为 test：

```
ssh -o Port=6000 test@x.x.x.x
```
