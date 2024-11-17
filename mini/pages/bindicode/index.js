// pages/appicode/index.js
const app = getApp();
import {
  isEmpty,
  httpPost,
  httpGet,
} from '../../utils/utils.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vcode:'',
  },
  bindVcodeInput(e) {
    if (e.detail.value) {
      this.setData({
        vcode: e.detail.value,
      });
    }
  },
  getMac(){
    const that = this;
    if (isEmpty(that.data.vcode)) {
      wx.showToast({
        title: '请输入验证码',
      })
      return
    }

    wx.showLoading({
      title: '处理中...',
    })

    httpGet('/gmbv', {
      'vcode':that.data.vcode,
    }).then((res) => {
      wx.hideLoading()
      const result = res.data;
      console.log(res);
      if (result.code == 1) {
        let mac = result.data;
        wx.showModal({
          title: '提示',
          content: '将绑定客户端到该账户，客户端MAC地址：'+mac,
          complete: (res) => {
            if (res.cancel) {
             console.log('用户选择了取消')
            }
        
            if (res.confirm) {
              that.bindIcode(mac)
            }
          }
        })
      } else {
        wx.showToast({
          title: result.msg,
        })
      }
    }).catch((err) => {
      console.log(err);
      wx.hideLoading()
      wx.showToast({
        title: '网络异常~',
      })
    })
  },


  bindIcode(mac) {
    const that = this;
    if (isEmpty(mac)) {
      wx.showToast({
        title: '绑定失败',
      })
      return
    }

    httpPost('/bcbm', {
      'mac':mac,
    }).then((res) => {
      const result = res.data;
      if (result.code == 1) {
        wx.showToast({
          title: '绑定成功',
        })
      } else {
        wx.showToast({
          title: result.msg,
        })
      }
    }).catch((err) => {
      console.log(err);
      wx.showToast({
        title: '网络异常~',
      })
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