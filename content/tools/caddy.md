# Caddy

# 使用 Caddy 部署网站

Caddy 是一个功能强大、可扩展的平台，用 Go 编写，可为您的网站、服务和应用程序提供服务。

大多数人使用 Caddy 用作 Web 服务器或者代理服务。我是想让我的网站和小程序支持 quic，而 Caddy 是一种解决方案。在使用 Caddy 前，我使用 nginx 作为网站服务器，以及小程序后台接口服务的代理。目前我已经在服务器上部署了 Caddy，并将小程序后台服务和网站都迁移到 Caddy 上。虽然我配置了 HTTP3 协议，但是 HTTP3 并没有生效。网站和小程序可以正常访问，使用的是 HTTP2 协议。我折腾了一段时间，还是没有找到问题点，依旧是 HTTP2 协议或 HTTP1.1 协议。这并没有达到我的初衷。

之所以给大家继续推荐 Caddy，是因为 Caddy 确实有一些优势。我说下在我服务器部署 Caddy 之后的感受吧。首先，Caddy 在配置上要比 Nginx 简单，下面会详细介绍一下 Caddy 配置 Web 服务器和代理。其次，Caddy 天然支持 HTTPS，这对于网站和小程序后台，有很大的优势，特别是小程序后台，微信强制要求必须是 HTTPS。性能这块，可能因为我的网站比较小，我并没有感到太大的差异（凭感觉，没有经过性能工具测试）因为使用 Nginx 或 Caddy，我的网站和小程序访问都非常流畅。网上的帖子说 Nginx 性能会更好，特别是高并发时。在内存使用上，Caddy 要远远大于 Nginx，我的服务器内存比较小，这块非常明显。Nginx 在我服务器上的内存占用在 1MB 左右，而 Caddy 在 20MB 左右。

现在我们讲下 Caddy 如何安装？在 Caddy 的官网上，详细的介绍了 Caddy 的安装方法，我以我的服务器 CentOS7 为例，介绍一下 Caddy 的安装。

```
yum install yum-plugin-copr
yum copr enable @caddy/caddy
yum install caddy
```

安装非常简单，Caddy 支持多种方法配置，API 和配置文件，配置文件中又分 JSON 和 Caddyfile。为了简单，这里仅介绍 Caddyfile。如果你仅需要 Web 网站或服务代理。那么 Caddyfile 已经可以完全满足需求。如果你需要将 Caddy 作为 Web 服务平台，运行非常多的网站或者代理服务，那么你需要更深入的理解 Caddy API。下面的配置都以我的网站和小程序后台服务为例。

先说下网站，我的网站【豆子笔记】（https://www.91demo.top）使用rust mdbook 制作，通过编写 Markdown 文件，可生成静态的 html 文件。将生成的 html 文件上传到服务器某个目录。然后通过下面的配置，即可提供 Web 服务。让互联网用户访问你的网站。

下面是我的网站和反向代理配置文件，这些内容存储在/etc/caddy/Caddyfile 文件中：

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

更详细的内容，请参考 Caddy 官方文档，我这里仅以我的配置文件为例，进行简单讲解。

Caddyfile 中可以定义全局变量，放在文件的最前面。里面存放你的邮件地址，以及 Caddy 提供的服务协议。其中邮件地址用于申请 SSL 证书时使用。接着是共用模块，例如日志模块，日志模块中的 output 配置路径需要存在，例如/var/log/caddy/caddy.log 这个路径需要存在，并且 caddy 文件夹的拥有者需要是 caddy 用户和 caddy 组。这是一个坑，如果没有权限，就不会生成日志文件。再下面的官网www.91demo.top就是静态网站的配置了。www.91demo.top域名必须存在并且解析到了服务器的IP地址上。{}大括号中的内容为www网站的配置内容，里面包含了两个反向代理，以及一个静态文件服务，以及两个跳转配置。分别表示的是访问/api/时反向代理到后端开放接口服务，访问/mqtt/ws时反向代理到mqtt Websocket 服务，以及访问/ 提供网站静态文件服务，访问/Ez12Pv 会进行图片跳转（关注公众号后会看到这两个图片链接）。imgs.91demo.top 提供图片服务，图片服务添加了缓存时间，其它的服务都和 www 服务中类似，更多的基础知识内容可以参考网上 Caddy 使用。

我所讲的，是基于自己的理解，如果有不对的或者有疑惑的地方，欢迎评论沟通。如果你没有公网云服务器，您想要一台公网云服务器，从下面的链接购买有优惠。

想在阿里云购买，请使用这个链接：

https://www.aliyun.com/minisite/goods?userCode=zrqh6alb

想在腾讯云购买，请使用这个链接：

https://curl.qcloud.com/XX6que5w

通过以上链接购买，有很大优惠。

Caddy 服务器的 GitHub 地址：

https://github.com/caddyserver/caddy
