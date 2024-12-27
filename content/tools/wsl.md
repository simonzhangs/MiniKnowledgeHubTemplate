# WSL Linux

## 开机自启服务

在 Windows10 上，使用 windows + r 键，调出运行，输入 shell:startup 进入开机启动项文件夹。新建文件：wsl.vbs，名字自定义，但必须使用 vbs 作为扩展名。

```
Set ws = CreateObject("Wscript.Shell")
ws.run "wsl -d Ubuntu -u root /etc/init.d/ssh start", vbhide
ws.run "wsl -d Ubuntu -u root /etc/init.d/cron start",vbhide
```

## 查看默认的 WSL 名称

```
wsl -l
```
