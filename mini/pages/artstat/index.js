// pages/point/index.js
const app = getApp();
import {
  httpGet,
} from '../../utils/utils.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myArtInfo: {
      artcnt: 0, // 总计
      pubcnt: 0,// 公开
      lockcnt: 0, // 加锁
      citycnt: 0, // 同城
      viewcnt: 0,// 浏览
      starcnt: 0,// 点赞
    },
  },


  getArtStat() {
    const that = this;
    wx.showLoading({
      title: '请求中',
    })

    httpGet('/astat', {}).then((res) => {
      // console.log(res,ps);
      wx.hideLoading();
      const result = res.data;
      if (result.code == 1) {
        let content = result.data;
        that.setData({
          artcnt: content.artcnt,
          pubcnt: content.pubcnt,
          lockcnt: content.lockcnt,
          citycnt: content.citycnt,
          viewcnt: content.viewcnt,
          starcnt: content.starcnt,
        })
      } else {
        wx.showToast({
          title: result.msg,
        })
      }
    }).catch((err) => {
      console.log(err);
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this;
    that.getArtStat();
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