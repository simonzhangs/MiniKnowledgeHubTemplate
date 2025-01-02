
App({
  towxml: require('./towxml/index'),
  getText: (url, callback) => {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (typeof callback === 'function') {
          callback(res);
        };
      }
    });
  },

  // canPlayAd 是否需要观看广告？ 每日看一次即可。
  canPlayAd: function () {
    return this.globalData.isSeeAd
  },

  // logSeeAd 记录看广告？ 写入到本地缓存中，每次启动时加载到内存。
  logSeeAd: function () {
    let now = Date.now();
    let adObj = {
      "seeAdTs": now,
    }
    wx.setStorageSync('myAd', JSON.stringify(adObj));
    this.globalData.isSeeAd = true;
  },

  login() {
    const that = this;
    let myAd = wx.getStorageSync("myAd");// 每次启动都加载广告字段
    if (!utils.isEmpty(myAd)) {
      let myAdObj = JSON.parse(myAd);
      let tzms = utils.getTodayZeroMsTime();// 获取今日零时毫秒时间戳
      if (myAdObj.seeAdTs > tzms) {
        that.globalData.isSeeAd = true; // 今天是否看了广告？
      }
    }
    // 此处还可以写入其它初始化逻辑
  },

  onLaunch: function () {
    this.login();
  },

  globalData: {
    isSeeAd: false, // 是否看了广告？
  },

});