const app = getApp();
const utils = require('../../utils/utils.js')
let videoAd = null;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    artList: [],
    inputShowed: false,
    inputVal: "",
    keyword: "",
    index: 0,
    pages: 0,
    page: 1,
    yestTime: 0,
    op: 1, // 1 搜索查询 2 按时间查询 3 按标签查询
    qtype: 1, // 1 最火 2 最新 3 最冷
    tag: "",
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

  loadAd() {
    const that = this;
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-2ce6db3cb1e45a86'
      })
      videoAd.onLoad(() => {
        that.isLoadAd = true;
      })
      videoAd.onError((err) => {
        console.error('激励视频光告加载失败', err)
        that.isLoadAd = false;
      })
      videoAd.onClose((res) => {
        // 用户点击了【关闭广告】按钮
        if (res && res.isEnded) {
          // 正常播放结束，可以下发游戏奖励
          // 看看能不能做成全局函数
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
        title: '太频繁稍后再试',
      })
      return
    }

    wx.showLoading({
      title: '加载广告中',
    })
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      wx.hideLoading()
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => {
            videoAd.show()
          })
          .catch(err => {
            wx.showToast({
              title: '请重试一次',
            })
            console.error('激励视频 广告显示失败', err)
          })
      })
    } else {
      wx.showToast({
        title: '请重试一次',
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
      yestTime: utils.getYestMsTime()
    })
    that.loadAd();
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

    utils.httpGet('/searchBlogArt', {
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

    utils.httpGet('/getBlogArtList', {
      'pageNo': pageNo,
      'qtype': qtype,
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

  bindTag: function (e) {
    let tag = e.target.id;

    this.setData({
      artList: [],
      tag: tag,
      op: 3,
    })

    this.getBlogArtListByTag(1, tag)
  },

  getBlogArtListByTag: function (pageNo, tag) {
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

    utils.httpGet('/getBlogArtListByTag', {
      'pageNo': pageNo,
      'tag': tag,
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


  jump: function (e) {
    const that = this;
    // TODO 获取文章内容，看看是否有锁标志，然后判断点数是否足够，不足够唤起广告。
    const idx = e.currentTarget.dataset.idx;
    const art = that.data.artList[idx];
    if (art.lockstat == 1) {
      const points = app.globalData.myWalletInfo.points
      if (points > 0) {
        that.jumpToPage(e.currentTarget.dataset.guid)
      } else {
        that.playAd();
      }
    } else {
      that.jumpToPage(e.currentTarget.dataset.guid)
    }
  },


  jumpToPage: function (guid) {
    // 调整到文章页面 
    wx.navigateTo({
      url: '../article/index?guid=' + guid,
    })
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
    } else if (this.data.op === 3) {
      if (!this.loading && this.data.page < this.data.pages) {
        this.getBlogArtListByTag(this.data.page + 1, this.data.tag)
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