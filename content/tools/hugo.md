# Hugo 常用配置

### 添加搜索

1. 在配置文件 config.yml 中，添加或修改如下内容：

```
outputs:
  home:
    - HTML
    - RSS
    - JSON
```

2. 在 content 目录中创建一个页面 search.md，内容如下：

```
---
title: "Search" # in any language you want
layout: "search" # is necessary
# url: "/archive"
# description: "Description for Search"
summary: "search"
placeholder: "placeholder text in search input box"
---
```

3. （选填）如果你想某个博客不被搜索到，请在博客的头部添加如下内容：

```
---
searchHidden: true
```

4. 在 config.yml 文件中，添加或修改如下内容，添加菜单导航：

```
menu:
  main:
    - identifier: search
      name: "搜索"
      url: search
      weight: 10
```

这是我的配置，你根据你的实际情况定义。

### 添加您的网站图标

1. 在目录/static 下添加如下名称的文件，这些文件是你的图标文件。需要添加的文件如下：

- favicon.ico
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png
- safari-pinned-tab.svg

这些图标可以通过这个[Favicon.io](https://favicon.io/)制作。

2. 如果你的图标不在/static 目录下。需要在配置文件 config.yml 中进行设置：

```
params:
  assets:
    favicon: "<link / absolute url>"
    favicon16x16:  "<link / absolute url>"
    favicon32x32:  "<link / absolute url>"
    apple_touch_icon:  "<link / absolute url>"
    safari_pinned_tab:  "<link / absolute url>"
```

url 路径是你存放图标的地方，如果你的文件存放在/static/images 目录下，则填写/images/favicon.ico

### 添加百度统计

这个需要用到自定义页头知识点。添加自定义页头，在根目录下，创建如下结构的目录，然后添加 extend_head.html 页面。

```
.(site root)
├── config.yml
├── content/
├── theme/hugo-PaperMod/
└── layouts
    ├── partials
    │   ├── comments.html
    │   ├── extend_footer.html <---
    │   └── extend_head.html   <---
    └── robots.txt
```

extend_head.html 的内容将添加到页面的 head 部分中。
我的自定义页头页面内容如下：

```
<!-- 百度统计 -->
<script>
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?xxxxxxxxxxxxxxx";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
</script>
```

如果你添加其它头部信息，可参考上面案例。

### 添加备案号

这个需要用到自定义页脚知识点。添加自定义页脚，在根目录下，创建如下结构的目录，然后添加 extend_footer.html 页面。

```
.(site root)
├── config.yml
├── content/
├── theme/hugo-PaperMod/
└── layouts
    ├── partials
    │   ├── comments.html
    │   ├── extend_footer.html <---
    │   └── extend_head.html   <---
    └── robots.txt
```

extend_footer.html 的内容将添加到页面的 footer 部分中。
我的自定义页脚页面内容如下：

```
<footer class="footer">
    {{- if site.Copyright }}
    <span>{{ site.Copyright | markdownify }}</span>
    {{- else }}
    <span>&copy; {{ now.Year }} <a href="{{ "" | absLangURL }}">{{ site.Title }}</a></span>
    {{- end }}

    <span>
        | Powered by
        <a href="https://gohugo.io/" rel="noopener noreferrer" target="_blank">Hugo</a> &
        <a href="https://github.com/adityatelange/hugo-PaperMod/" rel="noopener" target="_blank">PaperMod</a>
    </span>
    <br>
    <a href="https://beian.miit.gov.cn/" target="_blank">{{ .Site.Params.FilingNo }}</a>
</footer>
```

先说下思路，这个有点特殊，因为布局的问题。想和模板自带的页脚布局保持一致，所以，你首先需要禁用以前的页脚，然后复制以前的页脚到此页面，然后再添加你自己的自定义内容。这里的备案号可以写死，也可以使用配置文件。我这里使用的配置文件，备案号的配置参数是 FilingNo。

具体的步骤如下：

在 config.yml 文件中，添加如下两个配置项：

```
params:
  hideFooter: true
  FilingNo: "您的备案号" # 底部备案号
```

### 添加友链

1. 在 content 目录下，新建文档 links.md，内容如下：

```
---

title: "🤝 友链"
layout: links
date: 2021-11-06T15:15:53+08:00
description:
draft: false
hidemeta: true
showToc: false
disableShare: true
comments: true
reward: false
showbreadcrumbs: false

---

<div class="friend">
  {{< friend name="技术小栈" url="https://www.91demo.top"
  logo="https://www.91demo.top/avartar.png" word="技术博客，记录我的日常点滴"
  >}}
</div>

<br />
<br />
<br />
<br />
<br />

### 👉 友链格式 | | | | ------ | ---------------------------------- | | 名称： |

技术小栈 | | 网址： | https://www.91demo.top | | 图标： |
https://www.91demo.top/avartar.png | | 描述： | 技术博客，记录我的日常点滴 |

#### 👉 友链申请要求 > 秉承互换友链原则、个人描述字数控制在 15 字内 #### 👉 Hugo

友链群 > QQ 群：593524984
```

2. 添加 shortcodes 和 css 文件

首先，在根目录 layouts 文件夹下，创建 shortcodes 文件夹，再创建 friend.html 文档。

friend.html 内容如下：

```
{{- if .IsNamedParams -}}
<a target="_blank" href={{ .Get "url" }} title={{ .Get "name" }} class="friendurl">
  <div class="frienddiv">
    <div class="frienddivleft">
      <img class="myfriend" src={{ .Get "logo" }} />
    </div>
    <div class="frienddivright">
      <div class="friendname">{{- .Get "name" -}}</div>
      <div class="friendinfo">{{- .Get "word" -}}</div>
    </div>
  </div>
</a>
{{- end }}
```

然后，在根目录 assets 文件夹下，创建 css 文件夹，再创建 extended 文件夹，再创建 friend-link.css 文档。

friend-link.css 内容如下：

```
/*友链*/
.friendurl {
  text-decoration: none !important;
  color: black;
  box-shadow: none !important;
}

.myfriend {
  width: 56px !important;
  height: 56px !important;
  border-radius: 50% !important;
  padding: 2px;
  margin-top: 20px !important;
  margin-left: 14px !important;
  background-color: #fff;
}

.frienddiv {
  overflow: auto;
  height: 100px;
  width: 49%;
  display: inline-block !important;
  border-radius: 5px;
  background: none;

  -webkit-transition: box-shadow 0.4s ease, transform 0.4s ease;
  -moz-transition: box-shadow 0.4s ease, transform 0.4s ease;
  -o-transition: box-shadow 0.4s ease, transform 0.4s ease;

  transition: box-shadow 0.4s ease, transform 0.4s ease;
}

.frienddiv:hover {
  background: var(--theme);

  /*-webkit-transform: scale(1.08);*/
  /*-moz-transform: scale(1.08);*/
  /*-ms-transform: scale(1.08);*/
  /*-o-transform: scale(1.08);*/
  /*transform: scale(1.08);*/

  transition: box-shadow 1s ease, transform 1s ease;
}

.dark .frienddiv:hover {
  background: var(--code-bg);

  /*-webkit-transform: scale(1.08);*/
  /*-moz-transform: scale(1.08);*/
  /*-ms-transform: scale(1.08);*/
  /*-o-transform: scale(1.08);*/
  /*transform: scale(1.08);*/

  transition: box-shadow 1s ease, transform 1s ease;
}

.frienddivleft {
  width: 92px;
  float: left;
  margin-right: -5px;
}

.frienddivright {
  margin-top: 18px;
  margin-right: 18px;
}

.friendname {
  text-overflow: ellipsis;
  font-size: 100%;
  margin-bottom: 5px;
  color: var(--primary);
}

.friendinfo {
  text-overflow: ellipsis;
  font-size: 70%;
  color: var(--primary);
}

.dark .friendname,
.dark .friendinfo {
  color: rgba(180, 181, 182, 0.8);
}

@media screen and (max-width: 600px) {
  .friendinfo {
    display: none;
  }

  .frienddivleft {
    width: 84px;
    margin: auto;
  }

  .frienddivright {
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .friendname {
    font-size: 18px;
  }
}

```

3. 添加到菜单导航中

在 config.yml 文件中，添加如下内容：

```
menu:
  main:
    - identifier: links
      name: "友链"
      url: links
      weight: 40
```

这样，友链功能添加完成，你可以和朋友互换友链了。

### 添加不算子

1. 在 layouts/partials 目录下，打开 extend_head.html，添加内容如下：

```
<!-- 不蒜子 -->
<script
  async
  src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
></script>
```

这段代码是为了导入不算子，然后不算子就可以根据域名进行计数。

2. 在 layouts/partials 目录下，打开 extend_footer.html，添加内容如下：

```
  <a href="https://beian.miit.gov.cn/" target="_blank">{{ .Site.Params.FilingNo }}</a>|<span id="busuanzi_container_site_pv"
    >总访问量<span id="busuanzi_value_site_pv"></span>次</span
```

在备案后，添加 PV 计数标签，这样就可以显示浏览次数了，更多的内容请查看https://busuanzi.ibruce.info/。

如何有配置不明白的，请从装饰皮肤 1 开始看。
