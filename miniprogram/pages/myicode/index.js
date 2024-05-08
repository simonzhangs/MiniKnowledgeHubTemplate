// pages/myicode/index.js
const app = getApp();
import {
  httpGet,
  isEmpty
} from '../../utils/utils.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iurl: '',
  },

  geticode() {
    const that = this;
    const curpoints = app.getPoints();
    if (curpoints < 1) {
      wx.showToast({
        title: '点数不足',
      })
      return
    }

    wx.showLoading({
      title: '获取卡片信息',
    })

    httpGet('/myICode', {}).then((res) => {
      wx.hideLoading()
      const result = res.data;
      if (result.code == 1) {
        let content = result.data;
        that.setData({
          iurl: content,
        })
        console.log(content)
        app.costPoints();
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
    if (isEmpty(that.data.iurl)) {
      wx.showToast({
        title: '先获取卡片',
      })
      return
    }
    wx.previewImage({
      urls: [that.data.iurl], // 需要预览的图片http链接列表
    });
  },
  saveToPhotosAlbum: function () {
    const that = this;
    if (isEmpty(that.data.filepath)) {
      wx.showToast({
        title: '请先获取图片',
      })
      return
    }

    wx.saveImageToPhotosAlbum({
      filePath: that.data.filepath,
      success(res) {
        wx.showToast({
          title: '保存成功',
        })
      },
      fail(err) {
        console.log(err)
        wx.showToast({
          title: '请打开相册权限',
        })
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