// example/index.js
const app = getApp();
const utils = require('../utils/utils.js')
// let videoAd = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  
  logid() {
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'logid',
      // 传递给云函数的event参数
      data: {}
    }).then(res => {
      console.log(res)
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.logid()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})