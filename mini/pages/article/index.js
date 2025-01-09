// pages/mkart/index.js
const app = getApp();
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    article: {}, // 内容数据
  },

  // 加载文章资源，现在从Git获取，下载Markdown文件，然后解析文件。
  getArt(category,artId) {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options);
    this.getArt(options.category,options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // console.log('article unload')
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})