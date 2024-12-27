# Caddy

Caddy 是一个功能强大、可扩展的平台，用 Go 编写，可为您的网站、服务和应用程序提供服务。

Caddy 服务器的 GitHub 地址：

https://github.com/caddyserver/caddy

以服务器 CentOS7 为例，介绍一下 Caddy 的安装。

```
yum install yum-plugin-copr
yum copr enable @caddy/caddy
yum install caddy
```

下面是网站和反向代理配置文件，这些内容存储在/etc/caddy/Caddyfile 文件中：

```
# 全局变量
{
  email myemail@qq.com
  servers {
    protocols h1 h2 h3
  }
}
# 日志，可共用
(logging) {
  log {
    output file /var/log/caddy/caddy.log {
      roll_size 50MiB
      roll_local_time
      roll_keep 5
    }
    format console {
      time_format rfc3339
      time_local
    }
    level INFO
  }
}

# 官网
www.91demo.top {
  import logging
  # 反向代理
  # 开放接口
  reverse_proxy /api/* localhost:9982
  # mqtt
  reverse_proxy /mqtt/ws localhost:18083 {
    stream_timeout 5m
    stream_close_delay 1m
  }

  # 静态网站
  root * /web/dist/book
  encode zstd gzip
  file_server
  redir /Ez12Pv https://imgs.91demo.top/visit.webp
  redir /Ez12Pw https://imgs.91demo.top/wander.webp
}

# 图片资源
imgs.91demo.top {
  import logging
  root * /web/dist/images
  # 图片
  @static {
    path_regexp \.(ico|gif|jpg|jpeg|png|svg|webp)$
  }
  header @static Cache-Control max-age=5184000
  rewrite /Ez12Pv /visit.webp
  rewrite /Ez12Pw /wander.webp
  file_server
}

# API后台
mp.91demo.top {
  import logging
  reverse_proxy localhost:9981
}

# 管理后台
h.91demo.top {
  import logging
  root * /web/admin
  encode zstd gzip
  file_server
}
```
