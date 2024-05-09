import { isEmpty, httpPost, getSecTs } from "./utils/utils.js";
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
  login() {
    const that = this;
    let cookie = wx.getStorageSync("sessionKey");
    let sessionTime = wx.getStorageSync("sessionTime");
    if (!isEmpty(sessionTime)) {
      let now = Date.now();
      // 生存时间 换算成毫秒 2592000000
      if (now - sessionTime >= 2592000000) {
        wx.removeStorageSync("sessionKey");
        wx.removeStorageSync("sessionTime");
        that.wxLogin();
      }
    }
    if (isEmpty(cookie)) {
      that.wxLogin();
    }
  },
  wxLogin() {
    const that = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          httpPost("/wxlogin", {
              code: res.code,
            })
            .then((res) => {

              if (res.data.code === 1) {
                wx.setStorageSync("sessionKey", res.header["Set-Cookie"]);
                wx.setStorageSync('sessionTime', Date.now());
                console.log(res.data.data["adFreqHalfHour"]);
                that.globalData.adFreqHalfHour = res.data.data["adFreqHalfHour"];
              } else {
                console.log(res.data.msg);
                wx.showToast({
                  title: "系统异常",
                });
              }
            })
            .catch((e) => {
              console.log(e);
              wx.showToast({
                title: "网络异常",
              });
            });
        }
      },
    });
  },

  getPoints(){
    return this.globalData.myWalletInfo.points
  },

  costPoints(){
    this.globalData.myWalletInfo.points -= 1;
  },

  canPlayAd() {
    const that = this;
    const now = getSecTs();
    if (now - that.globalData.adStartTime > 1800) {
      that.globalData.adStartTime = now;
      that.globalData.adCnt = 0;
      return true;
    } else {
      if (that.globalData.adCnt > that.globalData.adFreqHalfHour) {
        return false;
      } else {
        that.globalData.adCnt += 1;
        return true;
      }
    }
  },

  onLaunch: function () {
    this.login()
    const now = getSecTs();
    this.globalData.adStartTime = now;
  },

  globalData: {
    adFreqHalfHour: 6,
    adStartTime: 0,
    adCnt: 0,
    myWalletInfo: {
      points: 0,
      usePoints: 0,
      shareProfit: 0,
      adProfit: 0,
      artProfit: 0,
      cardProfit: 0,
      updateTime:'',
    },
  }
});