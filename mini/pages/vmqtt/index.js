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
    icode: '',
    isecret: '',
  },

  getMyAppIcode() {
    const that = this;
    if (that.bflag) {
      wx.showToast({
        title: '不用重复操作',
      })
      return
    }

    wx.showLoading({
      title: '获取识别码',
    })

    httpGet('/icode', {}).then((res) => {
      wx.hideLoading()
      const result = res.data;
      if (result.code == 1) {
        let content = result.data;
        that.setData({
          icode: content.icode,
          isecret: content.isecret,
        })
        that.bflag = true;
      } else {
        wx.showToast({
          title: '系统异常~',
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

  resetAppIcode() {
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
        title: '点数不足',
      })
      return
    }
    wx.showLoading({
      title: '重置识别码密钥',
    })

    httpPost('/rsticode', {}).then((res) => {
      wx.hideLoading()
      const result = res.data;
      if (result.code == 1) {
        let content = result.data;
        that.setData({
          icode: content.icode,
          isecret: content.isecret,
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
    if (isEmpty(that.data.icode)) {
      wx.showToast({
        title: '内容不能为空',
      })
      return
    }

    var content = '识别码：' + that.data.icode + '，密钥：' + that.data.isecret;
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