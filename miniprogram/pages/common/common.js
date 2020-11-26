// example/common/common.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    article: {},
  },

  getArticle: function (e) {
    var that = this
    /**
     * wx.showLoading({
      title: '文章加载中',
    }) 
     */


    wx.cloud.downloadFile({
      fileID: e.fileid,
      success: res => {
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePath,
          encoding: 'utf8',
          success: (r) => {
            //wx.hideLoading()
            let result = app.towxml(r.data, 'markdown', {});
            that.setData({
              article: result,
              isLoading: false
            })
          },
          fail: (err) => {
            console.error(err)
            //wx.hideLoading()
            wx.showToast({
              title: '发生错误请重试',
            })
          }
        })

      },
      fail: err => {
        console.error(err)
        //wx.hideLoading()
        wx.showToast({
          title: '发生错误请重试',
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticle(options)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})