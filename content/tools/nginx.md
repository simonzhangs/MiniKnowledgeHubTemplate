# Nginx

记录 Nginx 常用配置文件片段。

Location 的具体用法：

```
location [=|~|~*|^~] uri {...}
```

= 表示精确匹配，比如：

```
location = /test {
	return 200 "hello";
}

结果如下：
/test ok
/test/ not ok
/test2 not ok
/test/2 not ok
```

~ 表示区分大小写的正则匹配

```
location ~ ^/test$ {
	[conf]
}
```

~\* 表示不区分大小写的正则匹配

```
location ~* ^/test$ {
	[conf]
}
```

^~ 表示 uri 以某个字符串开头

```
location ^~ /images/ {
	[conf]
}
```

/ 表示通用匹配

它们的匹配顺序如下：
1，先检查使用前缀字符串的 locations，在使用前缀字符串的 locations 中选择最长匹配
的，并将结果进行存储。

2，如果符合带有=修饰符的 URI，则立刻停止匹配
3，如果符合带有^~修饰符的 URI，则立刻停止匹配
4，按照定义文件的顺序，检查正则表达式，匹配到就停止
5，当正则表达式匹配不到的时候，使用之前的前缀字符串。

优先级：=修饰符最高，^~次之，再者是正则，最后是前缀字符串匹配。

## Websocket 反向代理反向代理添加这两个属性

```
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";

map $http_upgrade $connection_upgrade {
   default upgrade;
   '' close;
}
```

## 配置静态网站

```
	server {
      listen 80;
		server_name www.your.domain;
      location / {
         root /data/web/public;
         index index.html;
      }
   }
```

## 配置图片

```
location ~ .*\.(gif|jpg|jpeg|png|webp)$ {
			root /data/dist/images/;
			expires 24h;
		}
```

## 配置应用反向代理

```
server {
        listen 80;
        server_name www.your.domain;
        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
}
```

## 配置 HTTPS

这里使用 Let's 证书，自行获取的证书方法相同。

```
server {
      listen 443 ssl http2;
		client_max_body_size 50m;
		server_name www.your.domain;
      ssl_certificate /etc/letsencrypt/live/www.your.domainp/fullchain.pem; # managed by Certbot
      ssl_certificate_key /etc/letsencrypt/live/www.your.domain/privkey.pem; # managed by Certbot

		location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
}

```

## 配置网站需要子请求认证

关键指令 auth_request，需要认证的请求。

```
server {
		server_name www.your.domain;
		listen 443 ssl; # managed by Certbot
		ssl_certificate /etc/letsencrypt/live/www.your.domain/fullchain.pem; # managed by Certbot
		ssl_certificate_key /etc/letsencrypt/live/www.your.domain/privkey.pem; # managed by Certbot
		include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
		ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

		client_max_body_size 2m;

		location / {
			auth_request /auth;
			error_page 401 = @error401;

			root /data/book;
			index index.html;
		}

		location = /auth {
			internal;
			proxy_pass http://127.0.0.1:3000/auth;
			proxy_pass_request_body off;
			proxy_set_header Content-Length "";
			proxy_set_header X-Original-URI $request_uri;
			proxy_set_header Host $http_host;
			proxy_set_header X-Forwarded-Host $host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header X-Forwarded-Proto $scheme;
		}

		location @error401{
			return 302 https://$host/login/;
		}

		location /login/ {
			proxy_pass http://127.0.0.1:3000/login;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		}

     location /api/ {
         proxy_pass http://127.0.0.1:3001;
         proxy_set_header Host $host;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header X-Forwarded-Proto $scheme;
      }
}

```

# URL 跳转携带原路径

在使用我的笔记中，发现登录之后，无法跳转到登录前要到达的页面。

首先，检查 Nginx 配置，查看是否配置了携带登录前的 URL 路径。查看之后，发现没有配置，现在将其配置好，配置如下：

```
location @error401{
			return 302 https://$host/login/?url=https://$host$request_uri;
		}
```

配置好后，继续测试，发现登录后，还是调整到首页，并没有调整到登录前的页面。检查登录应用，发现登录应用没有取 URL 参数，所以直接跳转到根路径。

将应用配置好，取 URL 参数，当 URL 参数不为空时，跳转到该 URL 路径。

```
url := c.Query("url")
		if url != "" {
			c.Redirect(http.StatusFound, url)
		} else {
			c.Redirect(http.StatusFound, "/")
		}
```

将应用打包，发布到服务器继续测试，还是失败，看日志，浏览器请求时是携带 URL 参数的。

```
GET /login/?url=https://www.91demo.top/zh-cn/private/project/visit/ch1.html
```

一度对人生产生怀疑，为啥我的不可以呢？我是参考网上教程配置的，网上教程使用 Python 举例，我这里使用 Go 实现，原理上应该是可行的啊。

经过多次细读对比，发现自己的 GET 请求路径是/login/，POST 请求路径是/api/doLogin，而网上教程 GET 和 POST 请求都是/login/，将自己的应该重新调整，无论 GET 请求还是 POST 请求都调整为/login 路径。当将应用推到服务器时，发现浏览器上显示跳转次数过多。排除一番后，将应用路径调整为/login/，Nginx 配置文件也进行了修改，修改为如下配置：

```
location /login/ {
			proxy_pass http://127.0.0.1:9982/login/;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		}
```

原来的配置如下：

```
location /login/ {
			proxy_pass http://127.0.0.1:9982/login;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		}
```

可以看到，在 login 后添加了/，无法解释为什么，反正现在是可以正常访问网站了。然后继续测试，发现登录后还是调整到首页。

经过对比，发现登录页面，网上教程写法如下：

```
<form method="post">
```

我的页面写法如下：

```
<form method="post" action="/login/">
```

和教程调整一致，重新启动服务，继续测试。这次成功了。

仔细查看日志，发现了问题。

```
/login/	{"status": 302, "methed": "POST", "path": "/login/", "query": ""
```

调整后，日志如下：

```
/login/	{"status": 302, "methed": "POST", "path": "/login/", "query": "url=https://www.91demo.top/zh-cn/private/index.html"
```

哎，不容易。终于搞定了。
