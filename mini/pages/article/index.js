// pages/mkart/index.js
const app = getApp();
let vAd = null;
let hasLoadAd = false;
// 文章id，因为不需要页面显示，直接定义在这里
let id = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    article: {}, // 内容数据
  },

  jump() {
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
            // 此处回退是正常的
            wx.navigateBack();
          }
        }
      })
      return
    } else {
      that.setData({
        isLoading: true,
      })
      that.getArt(that.id);
    }
  },

  loadAd() {
    const that = this;
    vAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-2ce6db3cb1e45a86',
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
          that.getArt(that.data.id);
        } else {
          console.log('length,', getCurrentPages().length);
          // 在广告还未结束时关闭，如果选择放弃，那么此处如果是小游戏广告，回退正常，如果是其它广告，回退报错，已经提交bug。
          wx.navigateBack({
            delta: getCurrentPages().length, // 获取压栈几层？
            success: (res) => { },
            fail: (err) => {
              console.log(err)
            },
            complete: (res) => { },
          });
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
      // 还未加载广告，则先加载广告，这是广告的核心点，如果直接在OnLoad方法中调用，页面会有卡顿现象。
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
      // 广告太多，会跳转到这里。需要稍后再试。
      wx.showToast({
        title: '请稍后重试',
      })
    }
  },

  // 加载文章资源，现在从Git获取，下载Markdown文件，然后解析文件。
  getArt(artId) {
    const that = this;
    // wx.showLoading({
    //   title: '加载中...',
    // })
    // 修改此处可以切换Git地址
    let url = 'https://gitee.com/littletow/visit/raw/master/content/' + artId;
    wx.downloadFile({
      url: url,
      success(res) {
        // wx.hideLoading();
        // console.log(res)
        if (res.statusCode === 200) {
          // 下载成功后，会存储为临时文件，需要使用微信API读取文件内容。
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
              // 将文件内容赋值给towxml组件，它会自动进行解析渲染。然后将加载动画关闭。
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
    // 此处使用变量，是因为不在页面显示，如果需要在页面显示，需要在data对象中进行定义。
    this.id = id;
    // this.getArt(options.id);
    this.jump();
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
    // console.log('article unload')
    // 置空可以避免广告报错，无法弹出新广告
    vAd = null;
    hasLoadAd = false;
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