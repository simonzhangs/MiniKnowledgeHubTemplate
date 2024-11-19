// pages/point/index.js
const app = getApp();
import utils, {
  httpGet,
  httpPost,
  diffNowTs,
  getXSecTimeStamp,
  getNowMsTime,
  getReqSign,
} from '../../utils/utils.js';
let vAd = null;
let isLoadAd = false;
let lastadTime = 0; // 上次时间戳
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reqId: '',
    myWalletInfo: {
      points: 0,
      addpt: 0,
      subpt: 0,
      updateTime: '',
    },
  },

  loadAd() {
    const that = this;
    vAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-2ce6db3cb1e45a86',
    })
    vAd.onLoad(() => {
      console.log('激励视频广告加载成功')
      isLoadAd = true;
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

  },

  playAd() {
    const that = this;
    wx.showLoading({
      title: '加载广告中',
    })

    that.getReqId();
    if (!isLoadAd) {
      that.loadAd();
    }

    // 当前时间戳
    let diff = diffNowTs(lastadTime);

    if (diff > 0) {
      wx.showToast({
        title: '请' + diff + '秒后再试',
      })
      return
    }
    // 限制看广告次数
    if (!app.canPlayAd()) {
      wx.showToast({
        title: '半小时后再试',
      })
      return
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

  getMyStatInfo() {
    const that = this;
    wx.showLoading({
      title: '获取点数信息',
    })

    httpGet('/mpt', {}).then((res) => {
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

  getReqId() {
    // 添加种子，添加时间戳，换取reqid
    const that = this;
    const seed = app.globalData.seed;
    const ts = getNowMsTime();
    const sign = getReqSign(seed, ts);
    httpPost('/gari', {
      "ts": ts,
      "sign": sign,
    }).then((res) => {
      const result = res.data;
      if (result.code == 1) {
        let content = result.data;
        that.setData({
          reqId: content,
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  },

  doAdProfit() {
    const that = this;
    wx.showLoading({
      title: '计算广告收益',
    })
    // 添加sign，以及请求类型。
    httpPost('/wad', {
      "reqid": that.data.reqId,
      "flag": 1,
    }).then((res) => {
      const ps = res.data.data;
      // console.log(res,ps);
      const myWalletInfo = that.data.myWalletInfo;
      myWalletInfo.points += ps;
      myWalletInfo.addpt += ps;
      myWalletInfo.updateTime = utils.getNowStr();
      that.setData({
        myWalletInfo: myWalletInfo,
      })
      app.globalData.myWalletInfo = myWalletInfo;
      lastadTime = getXSecTimeStamp(app.globalData.adInterval);
      app.globalData.lastadTime = lastadTime;
      wx.hideLoading()
      wx.showToast({
        title: '获得奖励',
      })
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
    // that.loadAd();
    lastadTime = app.globalData.lastadTime;
    const myWalletInfo = app.globalData.myWalletInfo;
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
    isLoadAd = false;
    lastadTime = 0;
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