# mdbook

mdBook 是一个工具，可以将 Markdown 文件呈现为更适合 HTML 或 EPUB 等最终用户形式。

mdbook 使用步骤：
1， 编写 markdown 格式的文章内容
2， 整理 SUMMARY.md 文件
3， 使用 mdbook 浏览和编译
4， 上传编译后的书籍内容到 Web 服务器

mdbook 使用新的端口开发：

```
mdbook serve -p 13000
```

将文章内容编译为书籍，默认存放在项目目录的 book 文件夹下。可以将该目录上传到 Web 服务器，然后启动 Web 服务器就可以访问书籍了。

```
mdbook build
```

## 集成 google 统计

一番搜索后，找到可以集成 google 统计，并且这个功能在 7 年前已经有了，但是网上没有一篇文章介绍这个。经过查看源码，现将集成 google 统计的步骤记录下来。

第一阶段，是在[output.html]配置中直接配置 google 统计，例如在 book.toml 中下面的配置

```
[output.html]
default-theme = "rust"
google-analytics = "XXXXXXX"
```

当使用这种配置后，mdbook 编译会输出警告，这个 google 统计在将来的版本中会删除，推荐放在 theme 中的 head.hbs 文件中。

首先，在项目目录下创建 mytheme 文件夹，然后放入 head.hbs 文件。文件的内容，就是 google 统计的代码，例如：

```
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'XXXXXXX');
</script>
```

然后，在 book.toml 文件中调整配置，配置如下：

```
[output.html]
theme = "./mytheme"
default-theme = "rust"
```

最后，使用 Mdbook 编译之后上传你的 Web 服务器即可。

## 禁用打印功能

默认是打开打印功能的，书籍的右上角有个打印按钮，现在如果禁用打印功能，可以这样设置：

```
[output.html.print]
enable = false
```

## 激活书籍菜单折叠功能

默认是禁用书籍菜单折叠的，如果要启用菜单折叠功能，可以这样设置：

```
[output.html.fold]
enable = true
level = 0
```

我们还可以设置折叠层级。默认 0，全部折叠。
