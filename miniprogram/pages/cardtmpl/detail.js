// pages/cardtmpl/detail.js
const app = getApp();
import {
  httpPost,
  isEmpty,
  downloadImage,
} from '../../utils/utils.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    desc: '',
    url: '',
    icodeImg:'',
    flag:0,
  },

  async doApplyCardTmpl() {
    const that = this;
    const curpoints = app.getPoints();
    if (curpoints < 1) {
      wx.showToast({
        title: '点数不足',
      })
      return
    }
    
    wx.showLoading({
      title: '应用卡片模板',
    })

    const icodeResp= await httpPost('/ayCardTmpl', {
      "cardid": Number(that.data.id),
    });
    console.log(icodeResp.data);
    if (icodeResp.data.code == 1) {
      const url = icodeResp.data.data;
      const icodefiles = await downloadImage('/permanent', url);
      that.setData({
        icodeImg: icodefiles.tempFilePath,
        flag:1,
      })
      app.costPoints();
      wx.hideLoading();
      wx.showToast({
        title: '应用成功',
      })
    }else{
      wx.hideLoading();
      wx.showToast({
        title: '点数不足',
      })
    }
  },

  previewIcodeImage() {
    const that = this;
    if(that.data.flag == 0) {
      wx.previewImage({
        urls: [that.data.url], 
      });
    }else{
      wx.previewImage({
        urls: [that.data.icodeImg],
      });
    }
    
  },

  saveToPhotosAlbum() {
    const that = this;
    if (isEmpty(that.data.icodeImg)) {
      wx.showToast({
        title: '请先应用模板',
      })
      return
    }

    wx.saveImageToPhotosAlbum({
      filePath: that.data.icodeImg,
      success(res) {
        wx.showToast({
          title: '保存成功',
        })
      },
      fail(err) {
        console.log(err)
        wx.showToast({
          title: '保存失败',
        })
      }
    })

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