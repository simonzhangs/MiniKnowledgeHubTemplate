// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 识别码
  appIcode() {
    wx.navigateTo({
      url: '../appicode/index',
    })
  },
  // 获取豆子点数
  point() {
    wx.navigateTo({
      url: '../point/index',
    })
  },
  // 获取mqtt账户
  getMqtt() {
    wx.navigateTo({
      url: '../vmqtt/index',
    })
  },
  // 获取文章统计信息
  artStat() {
    wx.navigateTo({
      url: '../artstat/index',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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