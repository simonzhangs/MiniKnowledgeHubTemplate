// example/uploadarticle/uploadarticle.js
const app = getApp()
const utils = require('../../utils/utils.js')
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: -1,
    bookList:[],
    resultMessage: '',
    disabled: false
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyBooks()

  },
  getMyBooks:function(){
    var that = this
    console.log(app.globalData.OPENID)
    // 查询记录总数
    db.collection('books').where({
      openid: app.globalData.OPENID,
    }).get().then(res => {
      console.log(res.data)
      that.setData({
        bookList :res.data
      }) 
    })

  },
  formReset() {
    this.setData({
      index: 0,
      resultMessage: '',
      disabled: false
    })

  },
  formSubmit(e) {
    var that = this
    
    wx.showLoading({
      title: '提交中...',
    })
    var cloudpath = ''
    var filepath = ''
    if (that.data.index == -1){
      wx.showToast({
        title: '先添加书籍！',
      })
      return
    }
    if (utils.isEmpty(e.detail.value.title)) {
      wx.showToast({
        title: '未输入标题！',
      })
      return
    }
    if (utils.isEmpty(e.detail.value.content)) {
      wx.showToast({
        title: '未输入内容！',
      })
      return
    }
    console.log(e.detail.value.title, e.detail.value.content, that.data.bookList[that.data.index]._id, that.data.bookList[that.data.index].tag)
    that.setData({
      disabled: true
    })
    wx.cloud.callFunction({
      name: 'uploadArticle',
      data: {
        title: e.detail.value.title,
        tag: that.data.bookList[that.data.index].tag,
        bid: that.data.bookList[that.data.index]._id,
        content: e.detail.value.content
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      that.setData({
        resultMessage: '提交成功'
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      that.setData({
        resultMessage: '提交失败，错误原因为：' + err
      })
    })
    
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