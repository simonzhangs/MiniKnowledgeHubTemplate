// pages/algorithm/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        console.log(dpr)
        canvas.width = res[0].width * dpr
        console.log(canvas.width)
        canvas.height = res[0].height * dpr
        console.log(canvas.height)
        ctx.scale(dpr, dpr)
      
        ctx.strokeRect(10, 10, 150, 75)
        ctx.draw()
      })
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

  },
  onTouchstart: function (options) {
    console.log(options)
  },
  onTouchcancel: function (options) {
    console.log(options)
  },
  onTouchmove: function (options) {
    console.log(options)
  },
  onTouchend: function (options) {
    console.log(options)
  },
  onError: function (options) {
    console.log(options)
  }

})