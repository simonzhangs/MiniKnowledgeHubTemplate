// pages/myicode/index.js
const app = getApp();
import {
  httpGet,
  downloadImage,
  isEmpty
} from '../../utils/utils.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icodeImg:'',
  },

  geticode() {
    const that = this;
    // const curpoints = app.getPoints();
    // if (curpoints < 1) {
    //   wx.showToast({
    //     title: '点数不足',
    //   })
    //   return
    // }

    wx.showLoading({
      title: '获取卡片信息',
    })

    httpGet('/myICode', {}).then((res) => {
      wx.hideLoading()
      const result = res.data;
      if (result.code == 1) {
        // app.costPoints();
        let filename = result.data;
        downloadImage("/files",filename).then((res)=>{
          that.setData({
            icodeImg: res.tempFilePath,
          })
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

  async getmycard() {
    const that = this;
    // const curpoints = app.getPoints();
    // if (curpoints < 1) {
    //   wx.showToast({
    //     title: '点数不足',
    //   })
    //   return
    // }

    wx.showLoading({
      title: '获取卡片信息',
    })

    const icodeResp = await httpGet('/myICode', {});
    console.log(icodeResp.data);
    if (icodeResp.data.code == 1) {
      const url = icodeResp.data.data;
      const icodefiles = await downloadImage('/permanent', url);
      that.setData({
        icodeImg: icodefiles.tempFilePath,
      })
      // app.costPoints();
      wx.hideLoading();
    }else{
      wx.hideLoading();
      wx.showToast({
        title: '点数不足',
      })
    }
  },
  previewIcodeImage() {
    const that = this;
    if (isEmpty(that.data.icodeImg)) {
      wx.showToast({
        title: '请先获取卡片',
      })
      return
    }
    wx.previewImage({
      urls: [that.data.icodeImg], // 需要预览的图片http链接列表
    });
  },
  saveToPhotosAlbum: function () {
    const that = this;
    if (isEmpty(that.data.icodeImg)) {
      wx.showToast({
        title: '请先获取卡片',
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