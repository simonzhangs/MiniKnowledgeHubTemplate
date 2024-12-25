const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },


  jump: function (e) {
    const that = this;
    // 获取文章内容，看看是否有锁标志，然后判断点数是否足够，不足够唤起广告。
    const idx = e.currentTarget.dataset.idx;
    const art = that.data.artList[idx];
    if (art.islock == 1) {
      const points = app.globalData.myWalletInfo.points
      if (points < 1) {
        // 弹出对话框，告知用户需要观看广告。
        wx.showModal({
          title: '提示',
          content: '豆子点数不足，休息一下去看个广告获得豆子点数吧？',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.playAd();
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return
      } else {
        app.costPoints();
        that.jumpToPage(e.currentTarget.dataset.guid, art.ispub, art.stars)
      }
    } else {
      that.jumpToPage(e.currentTarget.dataset.guid, art.ispub, art.stars)
    }

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("index onload")
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
    console.log("index onunload")
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {


  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})