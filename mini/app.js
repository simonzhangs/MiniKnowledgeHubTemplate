import utils, {
  isEmpty,
  httpPost,
  getSecTs,
  getNowStr,
  getTodayZeroMsTime
} from "./utils/utils.js";
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
      // let now = Date.now();
      // // 生存时间1天 换算成毫秒 86400000
      // if (now - sessionTime >= 86400000) {
      //   wx.removeStorageSync("sessionKey");
      //   wx.removeStorageSync("sessionTime");
      //   wx.removeStorageSync("vp");
      //   that.wxLogin();
      // }
      // 优化，获取今天凌晨时间，比较session时间。
      let now = getTodayZeroMsTime();
      if (sessionTime < now) {
        wx.removeStorageSync("sessionKey");
        wx.removeStorageSync("sessionTime");
        wx.removeStorageSync("vp");
        that.wxLogin();
      }
    }
    if (isEmpty(cookie)) {
      that.wxLogin();
    } else {
      let vp = wx.getStorageSync('vp');
      let vobj = JSON.parse(vp);
      that.globalData.adFreqHalfHour = Number(vobj.adFreqHalfHour);
      that.globalData.adInterval = Number(vobj.adInterval);
      that.globalData.adProfit = Number(vobj.adProfit);
      that.globalData.openid = vobj.openid;
      that.globalData.hasIcode = Number(vobj.hasIcode);
      that.globalData.hasMqtt = Number(vobj.hasMqtt);
      that.globalData.seed = vobj.seed;
    }
  },
  wxLogin() {
    const that = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          httpPost("/vln", {
            code: res.code,
          })
            .then((res) => {
              // console.log('调试，',res)
              if (res.data.code === 1) {
                let data = res.data;
                // wx.setStorageSync("sessionKey", res.header["Set-Cookie"]);
                // 使用http2时，cookie名称变化
                var skey = res.header["Set-Cookie"]
                if (isEmpty(skey)){
                  skey = res.header["set-cookie"];
                } 
                wx.setStorageSync("sessionKey", skey);
                wx.setStorageSync('sessionTime', Date.now());
                // 将所有业务参数调整为一个。
                let vobj = {
                  "adFreqHalfHour": data.data.adFreqHalfHour,
                  "adInterval": data.data.adInterval,
                  "adProfit": data.data.adProfit,
                  "hasIcode": data.data.hasIcode,
                  "hasMqtt": data.data.hasMqtt,
                  "openid": data.data.openid,
                  "seed": data.data.seed,
                }
                // visit 参数
                wx.setStorageSync('vp', JSON.stringify(vobj));

                that.globalData.adFreqHalfHour = Number(data.data.adFreqHalfHour);
                that.globalData.adInterval = Number(data.data.adInterval);
                that.globalData.adProfit = Number(data.data.adProfit);
                // 20241117新增
                that.globalData.openid = data.data.openid;
                that.globalData.hasIcode = Number(data.data.hasIcode);
                that.globalData.hasMqtt = Number(data.data.hasMqtt);
                that.globalData.seed = data.data.seed;
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

  getPoints() {
    return this.globalData.myWalletInfo.points
  },

  costPoints() {
    this.globalData.myWalletInfo.points -= 1;
    this.globalData.myWalletInfo.subpt += 1;
    this.globalData.myWalletInfo.updateTime = getNowStr();
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
    this.globalData.lastadTime = now;
  },

  globalData: {
    lastadTime: 0,
    adFreqHalfHour: 30,
    adStartTime: 0,
    adCnt: 0,
    adInterval: 20,
    adProfit: 10,
    myWalletInfo: {
      points: 0,
      addpt: 0,
      subpt: 0,
      updateTime: '',
    },
    // 20241117新增字段
    openid: '',
    hasIcode: 0,
    hasMqtt: 0,
    seed: '',
  }
});