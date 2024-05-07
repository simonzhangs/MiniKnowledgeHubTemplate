// pages/cardtmpl/detail.js
const app = getApp();
import {
  httpPost,
  isEmpty
} from '../../utils/utils.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    desc: '',
    url: '',
    iurl:'',
  },

  doApplyCardTmpl() {
    const that = this;
    const curpoints = app.getPoints();
    if (curpoints < 1) {
      wx.showToast({
        title: '点数不足',
      })
      return
    }
    console.log(that.data.id);
    wx.showLoading({
      title: '应用卡片模板',
    })

    httpPost('/ayCardTmpl', {
      "cardid": Number(that.data.id),
    }).then((res) => {
      wx.hideLoading()
      const result = res.data;
      console.log(result)
      if (result.code == 1) {
        let content = result.data;
        that.setData({
          iurl: content,
        })
        console.log(content)
        app.costPoints();
        wx.showToast({
          title: '操作成功',
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

  previewIcodeImage() {
    const that = this;
    if(isEmpty(that.data.iurl)){
      return
    }
    wx.previewImage({
      urls: [that.data.iurl], // 需要预览的图片http链接列表
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
      desc: options.desc,
      url: options.url,
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