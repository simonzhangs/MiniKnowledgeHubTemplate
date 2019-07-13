## 爱上Go语言
golang-visit 是学习golang语言的一个工具

### 工作原理
golang-visit 使用小程序云环境，在云环境中存放文章的md文件，然后小程序调用云函数获取使用towxml包转换后的json数据，在小程序端进行渲染

### 小程序
![输入图片说明](https://images.gitee.com/uploads/images/2019/0131/101857_e5398b5c_90803.jpeg "gh_47e307f4f905_258.jpg")

### 说明备注

logo尺寸为48x48px,标签列表见全局定义TagsList，标题不能超过12个字,Logo支持云文件id，支持小程序本地

可以试用下wemark的markdown解析包，对比下towxml