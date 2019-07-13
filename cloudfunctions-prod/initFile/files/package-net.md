## Net 包

Package net 为网络 I / O 提供了一个便携式接口，包括 TCP / IP，UDP，域名解析和 Unix 域套接字。

虽然该软件包提供对低级网络基元的访问，但大多数客户端只需要 Dial，Listen 和 Accept 函数以及相关的 Conn 和 Listener 接口提供的基本接口。crypto / tls 包使用相同的接口和类似的 Dial 和 Listen 功能。

Package http 提供 HTTP 客户端和服务器实现。
Get，Head，Post 和 PostForm 发出 HTTP（或 HTTPS）请求：

```
resp, err := http.Get("http://example.com/")
...
resp, err := http.Post("http://example.com/upload", "image/jpeg", &buf)
...
resp, err := http.PostForm("http://example.com/form",
	url.Values{"key": {"Value"}, "id": {"123"}})
```

完成后，客户端必须关闭响应正文：

```
resp, err := http.Get("http://example.com/")
if err != nil {
	// handle error
}
defer resp.Body.Close()
body, err := ioutil.ReadAll(resp.Body)
// ...
```

要控制 HTTP 客户端标头，重定向策略和其他设置，请创建客户端：

```
client := &http.Client{
	CheckRedirect: redirectPolicyFunc,
}

resp, err := client.Get("http://example.com")
// ...

req, err := http.NewRequest("GET", "http://example.com", nil)
// ...
req.Header.Add("If-None-Match", `W/"wyzzy"`)
resp, err := client.Do(req)
// ...
```

要控制代理，TLS 配置，保持活动，压缩和其他设置，请创建传输：

```
tr := &http.Transport{
	MaxIdleConns:       10,
	IdleConnTimeout:    30 * time.Second,
	DisableCompression: true,
}
client := &http.Client{Transport: tr}
resp, err := client.Get("https://example.com")
```

客户端和传输对于多个 goroutine 的并发使用是安全的，并且效率应该只创建一次并重新使用。

ListenAndServe 启动具有给定地址和处理程序的 HTTP 服务器。处理程序通常为 nil，这意味着使用 DefaultServeMux。Handle 和 HandleFunc 将处理程序添加到 DefaultServeMux：

```
http.Handle("/foo", fooHandler)

http.HandleFunc("/bar", func(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
})

log.Fatal(http.ListenAndServe(":8080", nil))
```

通过创建自定义服务器，可以更好地控制服务器的行为：

```
s := &http.Server{
	Addr:           ":8080",
	Handler:        myHandler,
	ReadTimeout:    10 * time.Second,
	WriteTimeout:   10 * time.Second,
	MaxHeaderBytes: 1 << 20,
}
log.Fatal(s.ListenAndServe())
```

从 Go 1.6 开始，http 包在使用 HTTPS 时对 HTTP / 2 协议有透明支持。必须禁用 HTTP / 2 的程序可以通过将 Transport.TLSNextProto（对于客户端）或 Server.TLSNextProto（对于服务器）设置为非零空映射来执行此操作。或者，目前支持以下 GODEBUG 环境变量：

```
GODEBUG=http2client=0  # disable HTTP/2 client support
GODEBUG=http2server=0  # disable HTTP/2 server support
GODEBUG=http2debug=1   # enable verbose HTTP/2 debug logs
GODEBUG=http2debug=2   # ... even more verbose, with frame dumps
```

Go 的 API 兼容性承诺不包含 GODEBUG 变量。
