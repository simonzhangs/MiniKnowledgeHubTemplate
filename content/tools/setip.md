# 设置固定 IP

1，Ubuntu18.04 设置固定 IP
修改/etc/netplan 下的 yaml 文件，修改为

```
network:
ethernets:
eth0:
addresses: - 172.28.45.220/20
nameservers:
addresses: [202.102.224.68,202.102.227.68]
dhcp4: false
version: 2
```

然后执行

```
sudo netplan apply
```

使用 ip a 查看地址是否变更
当 ping www.baidu.com提示Temporary failure in name resolution
那么需要执行

```
sudo dhclient -v -4
```

就可以解决了。
