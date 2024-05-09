// pages/mycontact/index.js
const app = getApp();
import {
  isEmpty,
  httpGet,
} from '../../utils/utils.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qq: '',
    vcode: '',
  },

  getMyContact() {
    const that = this;
    const curpoints = app.getPoints();
    if (curpoints < 1) {
      wx.showToast({
        title: '点数不足',
      })
      return
    }
    wx.showLoading({
      title: '获取联系方式',
    })

    httpGet('/qq', {}).then((res) => {
      wx.hideLoading()
      const result = res.data;
      if (result.code == 1) {
        let content = result.data;
        console.log(content)
        const strArr = content.split(',');
        that.setData({
          qq: strArr[0],
          vcode: strArr[1],
        })
        app.costPoints();
      } else {
        wx.showToast({
          title: '点数不足',
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
    if (isEmpty(that.data.qq)) {
      wx.showToast({
        title: '内容不能为空',
      })
      return
    }

    var content = 'QQ号：' + that.data.qq + '，验证码：' + that.data.vcode;
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