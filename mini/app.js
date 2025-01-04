const utils = require("./utils/utils.js");

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

  // 下载 data.json 文件
  dlArtData: function () {
    const that = this;
    // 下载数据动画
    wx.downloadFile({
      url: 'https://gitee.com/littletow/visit/raw/master/content/data.json',
      success(res) {
        // console.log(res)
        if (res.statusCode === 200) {
          // 下载成功后，会存储为临时文件，需要使用微信API读取文件内容。
          const tmpfile = res.tempFilePath;
          const fs = wx.getFileSystemManager()
          fs.readFile({
            filePath: tmpfile,
            encoding: 'utf8',
            success(res) {
              // 取消动画
              console.log(res.data)
              // 记录到本地缓存
              wx.setStorageSync('artData', res.data);
              that.globalData.artData = res.data;
            },
          })
        }
      }
    })
  },

  // 下载 article version 文件
  dlArtVersion: function () {
    const that = this;
    // 下载版本号加载动画
    wx.downloadFile({
      url: 'https://gitee.com/littletow/visit/raw/master/content/VERSION',
      success(res) {
        // console.log(res)
        if (res.statusCode === 200) {
          // 下载成功后，会存储为临时文件，需要使用微信API读取文件内容。
          const tmpfile = res.tempFilePath;
          const fs = wx.getFileSystemManager()
          fs.readFile({
            filePath: tmpfile,
            encoding: 'utf8',
            success(res) {
              console.log(res.data)
              // 取消动画
              // 查看本地版本号
              const artVer = wx.getStorageSync("artVer");
              if (utils.isEmpty(artVer)) {
                // 记录到本地缓存
                wx.setStorageSync('artVer', res.data);
                // 下载文章数据
                that.dlArtData();
              } else {
                // 和线上进行对比，需要升级则重新下载数据
                if (artVer < res.data) {
                  // 下载文章数据
                  that.dlArtData();
                }
              }
            },
          })
        }
      }
    })
  },

  // canPlayAd 是否需要观看广告？ 每日看一次即可。
  canPlayAd: function () {
    return this.globalData.isSeeAd
  },

  // logSeeAd 记录看广告？  
  logSeeAd: function () {
    this.globalData.isSeeAd = true;
  },

  // 是否需要检查版本？每日调用一次
  hasChkVer() {
    return this.globalData.isChkVer
  },

  // 记录已检查版本
  logChkVer() {
    this.globalData.isChkVer = true;
  },

  // 重置
  reset() {
    let now = Date.now();
    let obj = {
      "logTs": now,
    }
    wx.setStorageSync('logTs', JSON.stringify(obj));

    that.globalData.isSeeAd = false; // 今天是否看了广告？
    that.globalData.isChkVer = false;// 今天是否对比过版本号？
  },

  login() {
    const that = this;
    let logTs = wx.getStorageSync("logTs");// 每次启动都加载 
    if (!utils.isEmpty(logTs)) {
      let logTsObj = JSON.parse(logTs);
      let tzms = utils.getTodayZeroMsTime();// 获取今日零时毫秒时间戳
      if (logTsObj.logTs < tzms) {
        that.reset();
      }
    } else {
      that.reset();
    }
    // 此处还可以写入其它初始化逻辑
    // 加载文章数据
    let artData = wx.getStorageSync("artData");// 每次启动都加载 
    if (!utils.isEmpty(artData)) {
      // 如果数据不为空，就进行加载
      const dataList = utils.json2ObjArr(artData)
      that.globalData.artData = dataList;
    }
  },

  // 小程序每次启动都会调用
  onLaunch: function () {
    this.login();
  },

  globalData: {
    isSeeAd: true, // 是否看了广告？
    isChkVer: true, // 是否对比了版本号？
    artData: [],// 文章数据列表
  },

});