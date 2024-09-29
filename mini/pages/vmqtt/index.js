// pages/appicode/index.js
const app = getApp();
import {
  isEmpty,
  httpPost,
  httpGet,
} from '../../utils/utils.js';

let bflag = false;
let rflag = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    passwd: '',
    addr: '',
  },

  getMyMqttUser() {
    const that = this;
    if (that.bflag) {
      wx.showToast({
        title: '不用重复操作',
      })
      return
    }

    wx.showLoading({
      title: '请求中',
    })

    httpGet('/mtuser', {}).then((res) => {
      wx.hideLoading()
      const result = res.data;
      if (result.code == 1) {
        let content = result.data;
        that.setData({
          username: content.username,
          passwd: content.passwd,
          addr: content.addr,
        })
        that.bflag = true;
      } else {
        wx.showToast({
          title: result.msg,
        })
      }
    }).catch((err) => {
      console.log(err);
      wx.hideLoading()
      wx.showToast({
        title: result.msg,
      })
    })
  },

  resetMyMqttUser() {
    const that = this;
    if (that.rflag) {
      wx.showToast({
        title: '不用重复操作',
      })
      return
    }
    const curpoints = app.getPoints();
    if (curpoints < 1) {
      wx.showToast({
        title: '豆子点数不足',
      })
      return
    }
    wx.showLoading({
      title: '请求中',
    })

    httpPost('/rstmtuser', {}).then((res) => {
      wx.hideLoading()
      const result = res.data;
      if (result.code == 1) {
        let content = result.data;
        that.setData({
          username: content.username,
          passwd: content.passwd,
          addr: content.addr,
        })
        that.rflag = true;
        app.costPoints();
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

  doCopy() {
    const that = this;
    if (isEmpty(that.data.username)) {
      wx.showToast({
        title: '内容不能为空',
      })
      return
    }

    var content = '用户名：' + that.data.username + '，密钥：' + that.data.passwd + '，连接地址：' + that.data.addr;
    wx.setClipboardData({
      data: content,
      success(res) {

      }
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
    bflag = false;
    rflag = false;
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