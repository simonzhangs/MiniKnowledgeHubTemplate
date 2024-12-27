# Asterisk

Asterisk 是第一套以开放源代码软件实现的 用户交换机 (PBX) 系统。Asterisk 由 Digium 的创办人马克·史宾瑟（Mark Spencer）于 1999 年他还在奥本大学念书时所开发。与其他的用户交换机系统相同，Asterisk 同样支持电话拨打另一只分机，和拨打到公共交换电话网与 IP 电话系统。Asterisk 这个名称源自于星号 "\*"。

网址：https://www.asterisk.org/

## Asterisk 常见错误

403 登录失败

解决：等待 1 分钟，等超时之后重新连接即可。一般是切换 IP 时或者换软电话登录会碰到。

401 登录失败

解决：检查账户和密码是否正确？检查连接地址是否正确？检查 Asterisk 是否启动？检查防火墙端口是否打开？

408 连接超时

解决：一般是 Asterisk 服务不通，检查 Asterisk 服务是否启动，检查防火墙是否打开？

可以拨通，没有声音？

一般是 NAT 造成，配置这三个参数：rtp_symmetric，force_rport，rewrite_contact。

SIP 客户端没有自动挂机？

一般是没有设置 stun 造成的，在 SIP 客户端，设置 stun 即可。如果没有 stun server，可以设置这个`stun.l.google.com:19302`

AGI 脚本返回状态 4，正常应该为 0？

查看网上资料，是 AGI 脚本中调用 Hangup 导致，将脚本中的 Hangup 去掉，放在拨号计划配置文件中执行 Hangup，可以解决这个问题。

```
AGI Script agidemo completed, returning 0
```

# 解决 asterisk 没有声音的问题

在配置好 asterisk 之后，拨打 8000 没有听到声音。

我的环境，asterisk 在云服务器，使用手机 zoiper 拨打。没有声音，经过一番调整后，使用如下配置可行。

asterisk 的配置如下：

```
rtp_symmetric = yes
force_rport = yes
rewrite_contact = no
```

手机 zoiper 的配置，ice 启用，其它全是默认配置。

现在发现，WIFI 可以拨通，流量不可以。

经过排查，发现 RTP 在 WIFI 情况下使用同一个端口，在流量情况下不是同一个端口。

打开 rtp 调试信息，使用如下命令：

```
rtp set debug on
```

查看 rtp 的配置，使用如下命令：

```
rtp show setting
```

可以看到 rtp 信息。

如果排查 PJSIP 信息，可以使用查看 pjsip 的日志命令：

```
pjsip set logger on
```
