// pages/article/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      title: '',
      content: '',
      createTime: '',
      lang:'',
      views:0,
      url:'',
    }
  },

  getArticle(e){
    console.log(e.guid)
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getArtDetail',
      // 传递给云函数的event参数
      data: {
        guid: e.guid,
      }
    }).then(res => {
      wx.hideLoading()
      console.log(res.result)
      let item = res.result.data[0];
      that.setData({
        item:item,
      })
      
    }).catch(err => {
      // handle 
      console.log(err)
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticle(options);
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