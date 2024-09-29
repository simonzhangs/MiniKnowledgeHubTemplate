const app = getApp();
import {
  httpGet,
  isEmpty,
} from '../../utils/utils.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    artAuidtList: [],
  },
  // TODO，将数据存入本地文件，提供按钮可以清理。
  getMyArtMsg() {
    const that = this;
    wx.showLoading({
      title: '请求中',
    })

    httpGet('/artmsg', {}).then((res) => {
      wx.hideLoading()
      const result = res.data;
      if (result.code == 1) {
        let content = result.data;
        if(!isEmpty(content)){
          that.setData({
            artAuidtList: content,
          })
        }
      } else {
        wx.showToast({
          title: result.msg,
        })
      }
    }).catch((err) => {
      console.log(err);
      wx.hideLoading()
      wx.showToast({
        title: '网络异常请重试',
      })
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("index onload")
    this.getMyArtMsg();
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