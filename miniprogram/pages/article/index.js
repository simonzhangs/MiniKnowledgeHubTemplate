// pages/mkart/index.js
const app = getApp();
import { httpGet } from '../../utils/utils.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {} // 内容数据
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    const _ts = this;
    wx.showLoading({
      title: '加载中',
    })

    httpGet('/blogArtDetailByAd', {
      uuid: options.guid,
      ad: options.ad,
    }).then((res) => {

      const result = res.data;
      if (result.code == 1) {
        let content = result.data;
        let obj = app.towxml(content, 'markdown', {
          theme: 'light',
          events: {
            tap: (e) => {
              console.log('tap', e);
            }
          }
        });

        _ts.setData({
          article: obj,
        });

        wx.hideLoading({
          success: (res) => { },
        })
      } else {
        wx.hideLoading()
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