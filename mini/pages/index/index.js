const app = getApp();
import {
  httpPost,
  getYestMsTime,
  httpGet,
  isEmpty,
  getNowStr,
  getNowMsTime,
  getReqSign,
} from '../../utils/utils.js';

let vAd = null;
let hasLoadAd = false;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    reqId: '',
    artList: [],
    inputShowed: false,
    inputVal: "",
    keyword: "",
    index: 0,
    pages: 0,
    page: 1,
    yestTime: 0,
    op: 1, // 1 搜索查询 2 按时间查询 3 按标签查询
    qtype: 1, // 1 最火 2 最新 3 最冷 4 我的 5 同城 6 最赞
    tag: "",
    myWalletInfo: {},
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
          that.doAdProfit();
        } else {
          wx.showToast({
            title: '没有获得点数哟！',
          })
        }
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
  playAd() {
    const that = this;
    wx.showLoading({
      title: '加载广告中',
    })
    that.getReqId();
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

  doAdProfit() {
    const that = this;
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
      myWalletInfo.updateTime = getNowStr();
      that.setData({
        myWalletInfo: myWalletInfo,
      })
      app.globalData.myWalletInfo = myWalletInfo;
      wx.showToast({
        title: '获得奖励',
      })
    }).catch((err) => {
      console.log(err);
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      keyword: "",
      artList: [],
    });

  },


  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  search(e) {
    var keyword = this.data.inputVal.toLowerCase()
    this.setData({
      keyword: keyword,
      op: 1,
    })

    this.searchArt(1, keyword)
  },

  searchArt: function (pageNo, keyword) {
    const that = this

    that.loading = true
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    if (pageNo === 1) {
      that.setData({
        artList: [],
      })
    }

    httpGet('/sart', {
      'pageNo': pageNo,
      'keyword': keyword,
    }).then((res) => {
      that.loading = false
      wx.hideLoading()
      const result = res.data;
      if (result.code == 1) {
        const articles = result.data;
        that.setData({
          page: pageNo, //当前的页号
          pages: result.count, //总页数
          artList: that.data.artList.concat(articles)
        })

      } else {
        wx.showToast({
          title: '没有找到记录',
        })
      }
    }).catch((err) => {
      that.loading = false
      wx.hideLoading()
      wx.showToast({
        title: '网络异常请重试',
      })
    })

  },

  bindBtn: function (e) {
    let btnId = e.target.id;
    let qtype = 1;
    switch (btnId) {
      case "btnHot":
        // 按浏览次数倒序排序，再按创建升序
        qtype = 1;
        break;
      case "btnNew":
        // 按创建倒序排序
        qtype = 2;
        break;
      case "btnCold":
        // 按浏览次数升序排序，再按创建升序
        qtype = 3;
        break;
      case "btnMy":
        // 按创建时间倒序排序
        qtype = 4;
        break;
      case "btnCity":
        // 按创建时间倒序排序
        qtype = 5;
        break;
      case "btnStar":
        // 最赞，按照点赞次数倒序排序，再按创建时间倒序排序
        qtype = 6;
        break;
      default:
        break;
    }
    this.setData({
      artList: [],
      qtype: qtype,
      op: 2,
    })

    this.getArtList(1, qtype)
  },

  // 根据类型查询
  getArtList: function (pageNo, qtype) {
    const that = this

    that.loading = true
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    if (pageNo === 1) {
      that.setData({
        artList: [],
      })
    }

    httpGet('/artl', {
      'pageNo': pageNo,
      'qtype': qtype,
    }).then((res) => {
      that.loading = false
      wx.hideLoading()

      const result = res.data;
      if (result.code == 1) {
        const articles = result.data;
        // console.log('debug,',result);
        that.setData({
          page: pageNo, //当前的页号
          pages: result.count, //总页数
          artList: that.data.artList.concat(articles)
        })

      } else {
        wx.showToast({
          title: '没有找到记录',
        })
      }
    }).catch((err) => {
      that.loading = false
      wx.hideLoading()
      wx.showToast({
        title: '网络异常请重试',
      })
    })

  },



  jump: function (e) {
    const that = this;
    // 获取文章内容，看看是否有锁标志，然后判断点数是否足够，不足够唤起广告。
    const idx = e.currentTarget.dataset.idx;
    const art = that.data.artList[idx];
    if (art.islock == 1) {
      const points = app.globalData.myWalletInfo.points
      if (points < 1) {
        // 弹出对话框，告知用户需要观看广告。
        wx.showModal({
          title: '提示',
          content: '豆子点数不足，休息一下去看个广告获得豆子点数吧？',
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
        app.costPoints();
        that.jumpToPage(e.currentTarget.dataset.guid, art.ispub, art.stars)
      }
    } else {
      that.jumpToPage(e.currentTarget.dataset.guid, art.ispub, art.stars)
    }

  },

  // 0 啥都不需要 1 直接看广告 2 扣点数
  jumpToPage: function (guid, ispub, stars) {
    // 调整到文章页面 
    wx.navigateTo({
      url: '../article/index?guid=' + guid + '&ispub=' + ispub + '&stars=' + stars,
    })
  },

  getMyStatInfo() {
    const that = this;
    // wx.showLoading({
    //   title: '获取点数信息',
    // })
    console.log('2秒后调用我');
    let cookie = wx.getStorageSync("sessionKey");
    if (isEmpty(cookie)) {
      console.log('user not login.')
      return
    }
    console.log('有token啊');
    httpGet('/mpt', {}).then((res) => {
      // wx.hideLoading()
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
      // wx.hideLoading()
      wx.showToast({
        title: '网络异常请重试',
      })
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    console.log("index onload")
    that.setData({
      yestTime: getYestMsTime()
    })
    console.log('2秒前调用我');
    // 延时2秒
    setTimeout(()=>{
      // get user points
      that.getMyStatInfo();
    },2000);
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("index onunload")
    hasLoadAd = true;
    vAd = null;
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    // if (!this.loading && this.data.page < this.data.pages) {
    // 	this.getArticles(this.data.page + 1)
    // }
    if (this.data.op === 1) {
      if (!this.loading && this.data.page < this.data.pages) {
        this.searchArt(this.data.page + 1, this.data.keyword)
      }
    } else if (this.data.op === 2) {
      if (!this.loading && this.data.page < this.data.pages) {
        this.getArtList(this.data.page + 1, this.data.qtype)
      }
    }

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      artList: [],
      keyword: "",
      page: 1
    })
    wx.stopPullDownRefresh()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})