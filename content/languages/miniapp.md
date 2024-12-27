# 微信小程序

小程序提供了一个简单、高效的应用开发框架和丰富的组件及 API，帮助开发者在微信中开发具有原生 APP 体验的服务。

官网地址：https://developers.weixin.qq.com/

小程序将 Hello World 的字符串显示在界面上。

WXML 是这么写 :

```
<text>{{msg}}</text>
```

JS 只需要管理状态即可:

```
this.setData({msg: 'Hello World'})
```

通过 {{ }} 的语法把一个变量绑定到界面上，我们称为数据绑定。仅仅通过数据绑定还不够完整的描述状态和界面的关系，还需要 if/else, for 等控制能力，在小程序里边，这些控制能力都用 wx: 开头的属性来表达。

数据绑定

```
<!--wxml-->
<view>{{message}}</view>
// page.js
Page({
  data: {
    message: 'Hello MINA!'
  }
})
```

WXS（WeiXin Script）是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。

以下是一些使用 WXS 的简单示例，要完整了解 WXS 语法，请参考 WXS 语法参考。

页面渲染

```
<!--wxml-->
<wxs module="m1">
  var msg = "hello world"; module.exports.message = msg;
</wxs>

<view>{{m1.message}}</view>
```

页面输出：

hello world

数据处理

```
// page.js
Page({
data: {
array: [1, 2, 3, 4, 5, 1, 2, 3, 4]
}
})
```

```
<!--wxml-->
<!-- 下面的 getMax 函数，接受一个数组，且返回数组中最大的元素的值 -->
<wxs module="m1">
  var getMax = function(array) { var max = undefined; for (var i = 0; i <
  array.length; ++i) { max = max === undefined ? array[i] : (max >= array[i] ?
  max : array[i]); } return max; } module.exports.getMax = getMax;
</wxs>

<!-- 调用 wxs 里面的 getMax 函数，参数为 page.js 里面的 array -->

<view>{{m1.getMax(array)}}</view>
```

页面输出：

5
