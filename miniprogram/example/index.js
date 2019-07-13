// example/index.js
const app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[]
  },
  test:function(e){
    wx.navigateTo({
      url: '../example/common/common?title=beego_controller',
    })

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //wx.showLoading({
    //  title: '正在加载...',
    //})
    let skip = 0
    var that = this
    db.collection('books')
      .where({
        status: 99, // 填入当前用户 openid
      })
      .skip(skip) // 跳过结果集中的前 10 条，从第 11 条开始返回
      .limit(10) // 限制返回数量为 10 条
      .get()
      .then(res => {
       // wx.hideLoading()
        console.log(res.data)
        that.setData({
          bookList:res.data
        })
        
      })
      .catch(err => {
       // wx.hideLoading()
        console.error(err)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})