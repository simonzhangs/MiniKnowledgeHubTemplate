const app = getApp();
 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    article: {}, // 内容数据
  },
  onLoad(options) {
    // console.log(options);
    const { category, id } = options || {};
    this.getArt(category, id);
  },
  // 加载文章资源，现在从Git获取，下载Markdown文件，然后解析文件。
  getArt(category, artId) {
    const that = this;
    // wx.showLoading({
    //   title: '加载中...',
    // })
    // 修改此处可以切换Git地址
    let url = 'https://gitee.com/simonzhangs/mini-knowledge-hub-template/raw/master/content/'+category+'/' + artId;
    wx.downloadFile({
      url: url,
      success(res) {
        // wx.hideLoading();
        // console.log(res)
        if (res.statusCode === 200) {
          // 下载成功后，会存储为临时文件，需要使用微信API读取文件内容。
          const tmpfile = res.tempFilePath;
          const fs = wx.getFileSystemManager()
          fs.readFile({
            filePath: tmpfile,
            encoding: 'utf8',
            success(res) {
              // console.log(res.data)
              let obj = app.towxml(res.data, 'markdown', {
                theme: 'light',
                events: {
                  tap: (e) => {
                    console.log('tap', e);
                  }
                }
              });
              // 将文件内容赋值给towxml组件，它会自动进行解析渲染。然后将加载动画关闭。
              that.setData({
                article: obj,
                isLoading: false,
              });
            },
          })
        }
      }
    })
  },
})