// pages/mkart/index.js
const app = getApp();
let vAd = null;
let hasLoadAd = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    article: {}, // 内容数据
  },

  jump(id) {
    const that = this;
    // 判断当前拥有的豆子点数
    const isSeeAd = app.canPlayAd();
    if (!isSeeAd) {
      // 弹出对话框，告知用户需要观看广告。
      wx.showModal({
        title: '提示',
        content: '一天只需看一个广告，文章即可任意浏览',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.playAd();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    } else {
      that.setData({
        isLoading: true,
      })
      that.getArt(id);
    }
  },

  loadAd() {
    const that = this;
    vAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-8fae1b0724504346',
    })
    vAd.onLoad(() => {
      hasLoadAd = true
    }),
      vAd.onError((err) => {
        console.error('激励视频广告加载失败,', err)
      }),
      vAd.onClose((res) => {
        if (res && res.isEnded) {
          app.logSeeAd();
        } else {
          wx.showToast({
            title: '还需加油哟！',
          })
        }
      })
  },

  playAd() {
    wx.showLoading({
      title: '加载广告中',
    })
    const that = this;
    if (!hasLoadAd) {
      that.loadAd();
    }
    // 用户触发广告后，显示激励视频广告
    if (vAd) {
      vAd.show().then(() => [
        wx.hideLoading()
      ]).catch(() => {
        // 失败重试
        vAd.load()
          .then(() => {
            wx.hideLoading()
            vAd.show()
          })
          .catch(err => {
            wx.hideLoading()
            wx.showToast({
              title: '请重试一次',
            })
            console.error('激励视频 广告显示失败', err)
          })
      })
    } else {
      wx.hideLoading()
      wx.showToast({
        title: '请稍后重试',
      })
    }
  },

  // 加载文章资源
  getArt(artId) {
    const that = this;
    // wx.showLoading({
    //   title: '加载中...',
    // })
    let url = 'https://gitee.com/littletow/visit/raw/master/content/' + artId;
    wx.downloadFile({
      url: url,
      success(res) {
        // wx.hideLoading();
        // console.log(res)
        if (res.statusCode === 200) {
          const tmpfile = res.tempFilePath;
          const fs = wx.getFileSystemManager()
          fs.readFile({
            filePath: tmpfile,
            encoding: 'utf8',
            success(res) {
              // console.log(res.data)
              let obj = app.towxml(res.data, 'markdown', {
                theme: 'light',
                events: {
                  tap: (e) => {
                    console.log('tap', e);
                  }
                }
              });

              that.setData({
                article: obj,
                isLoading: false,
              });
            },
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options);
    let id = options.id;
    // this.getArt(options.id);
    this.jump(id);
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