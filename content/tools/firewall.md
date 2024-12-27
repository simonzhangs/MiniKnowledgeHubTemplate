# Firewall 防火墙

firewall 是 Linux CentOS 等操作系统的防火墙。

使用 rich rule 封禁 IP

```
firewall-cmd --permanent --add-rich-rule="rule family='ipv4' source address='222.222.222.222' reject"  单个IP
firewall-cmd --permanent --add-rich-rule="rule family='ipv4' source address='222.222.222.0/24' reject" IP段
firewall-cmd --permanent --add-rich-rule="rule family=ipv4 source address=192.168.1.2 port port=80  protocol=tcp  accept" 单个IP的某个端口
firewall-cmd --list-rich-rules 查看封禁IP
```

使用 ip set 封禁 IP

```
firewall-cmd --permanent --new-ipset=dog --type=hash:ip 封禁IP
firewall-cmd --permanent --ipset=dog --add-entry=ip地址

firewall-cmd --permanent --new-ipset=blacklist --type=hash:net 封禁网段
firewall-cmd --permanent --ipset=blacklist --add-entry=222.222.222.0/24

firewall-cmd --permanent --add-rich-rule='rule source ipset=blacklist drop' 使ipset生效
```

删除一个 ipset

```
firewall-cmd --permanent --delete-ipset=dog
```

如何防止自己被防火墙拦截，添加到 IP 白名单

```
firewall-cmd --permanent --zone=trusted --add-source=x.x.x.x
```

使配置生效

```
firewall-cmd --reload
```
