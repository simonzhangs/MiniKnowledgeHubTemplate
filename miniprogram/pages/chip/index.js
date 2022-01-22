// pages/chip/index.js
const utils = require('../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array3: ['','Golang', 'Rust', 'JavaScript','Java','C/C++','C#','Python','Dart','Sql','Swift','Kotlin','Shell','Ruby'],
    value3: 0,
    err:'',
  },
  bindPicker3Change(e) {
    this.setData({
      value3: e.detail.value,
    });
  },

  submit(e){
    const that = this;
    wx.showLoading({
      title: '提交中...',
    })
    console.log(e)
    if(utils.isEmpty(e.detail.value.title)){
      wx.showToast({
        title: '标题为空',
      })
      return
    }
    if(utils.isEmpty(e.detail.value.desc)){
      wx.showToast({
        title: '简介为空',
      })
      return
    }
    if(utils.isEmpty(e.detail.value.lang)){
      wx.showToast({
        title: '编程语言为空',
      })
      return
    }
    if(utils.isEmpty(e.detail.value.url)){
      wx.showToast({
        title: 'URL地址为空',
      })
      return
    }
    if(utils.isEmpty(e.detail.value.content)){
      wx.showToast({
        title: '内容为空',
      })
      return
    }
    wx.cloud.callFunction({
      // 云函数名称
      name: 'postArticle',
      // 传给云函数的参数
      data: {
        title: e.detail.value.title,
        desc: e.detail.value.desc,
        lang:that.data.array3[that.data.value3],
        url:e.detail.value.url,
        content:e.detail.value.content,
      },
      success: function(res) {
        wx.hideLoading({
          success: (res) => {},
        })
        console.log(res) 
        if (res.result == 1) {
          wx.showToast({
            title: '提交成功',
          })
        }else if (res.result == 2){
          wx.showToast({
            title: '重复提交',
          })
        }  
      },
      fail: console.error,
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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