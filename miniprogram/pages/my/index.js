// pages/my/index.js
const app = getApp();
import utils, {
  httpGet,
  httpPost
} from '../../utils/utils.js';
let vAd = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myWalletInfo: {
      points: 0,
      usePoints: 0,
      shareProfit: 0,
      adProfit: 0,
      artProfit: 0,
      cardProfit: 0,
      updateTime: '',
    },
  },

  loadAd() {
    const that = this;
    const appBaseInfo = wx.getAppBaseInfo()

    console.log(appBaseInfo.SDKVersion)

    if (utils.compareVersion(appBaseInfo.SDKVersion, '2.6.0') == 1) {
      vAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-2ce6db3cb1e45a86',
      })
      vAd.onLoad(() => {
        console.log('激励视频广告加载成功')
      }),
        vAd.onError((err) => {
          console.error('激励视频广告加载失败,', err)
        }),
        vAd.onClose((res) => {
          // 用户点击了【关闭广告】按钮
          if (res && res.isEnded) {
            // 正常播放结束，可以下发游戏奖励
            that.doAdProfit();
          } else {
            // 播放中途退出，不下发游戏奖励
            wx.showToast({
              title: '没有获得点数哟！',
            })
          }
        })
    }
  },

  playAd() {
    // 限制当前用户看广告次数，半小时只允许看2次。
    console.log('aaaa', app.globalData);
    if (!app.canPlayAd()) {
      wx.showToast({
        title: '半小时后再试',
      })
      return
    }

    wx.showLoading({
      title: '加载广告中',
    })
    // 用户触发广告后，显示激励视频广告
    if (vAd) {
      wx.hideLoading()
      vAd.show().catch(() => {
        // 失败重试
        vAd.load()
          .then(() => {
            vAd.show()
          })
          .catch(err => {
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

  mycontact() {
    wx.navigateTo({
      url: '../mycontact/index',
    })
  },

  myicode() {
    wx.navigateTo({
      url: '../myicode/index',
    })
  },

  viewCt() {
    wx.navigateTo({
      url: '../cardtmpl/index',
    })
  },

  upart() {
    wx.navigateTo({
      url: '../upart/index',
    })
  },
  upicode() {
    wx.navigateTo({
      url: '../upicode/index',
    })
  },

  getMyStatInfo() {
    const that = this;
    wx.showLoading({
      title: '获取点数信息',
    })

    httpGet('/myStatInfo', {}).then((res) => {
      wx.hideLoading()
      const result = res.data;
      if (result.code == 1) {
        let content = result.data;
        app.globalData.myWalletInfo = content;
        that.setData({
          myWalletInfo: content,
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

  // source 1 按钮点击 2 加锁文章点击
  doAdProfit() {
    const that = this;
    wx.showLoading({
      title: '计算广告收益',
    })

    httpPost('/adProfit', {
      'source': 1,
    }).then((res) => {
      console.log(res);
      const myWalletInfo = that.data.myWalletInfo;
      myWalletInfo.points += 1;
      myWalletInfo.adProfit += 1;
      myWalletInfo.updateTime = utils.getNowStr();
      that.setData({
        myWalletInfo: myWalletInfo,
      })
      app.globalData.myWalletInfo = myWalletInfo;
      wx.hideLoading()
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
    that.loadAd();
    let myWalletInfo = app.globalData.myWalletInfo;
    console.log('debug,', myWalletInfo)
    that.setData({
      myWalletInfo: myWalletInfo,
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
    vAd = null;
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