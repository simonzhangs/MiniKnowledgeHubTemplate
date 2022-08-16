// example/index.js
const app = getApp();
const utils = require('../utils/utils.js')
// let videoAd = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    artList: [],
    inputShowed: false,
    inputVal: "",
    keyword: "",
    guid: "",
    index: 0,
    pages: 0,
    page: 1,
    yestTime: 0,
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
    this.getArtList(1);
  },


  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  search(e) {
    var keyword = this.data.inputVal.toLowerCase()
    this.setData({
      keyword: keyword
    })
    this.searchArt(1,keyword)
  },

  logid() {
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'logid',
      // 传递给云函数的event参数
      data: {}
    }).then(res => {
      console.log(res)
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.logid()
    //that.getArtList(1)
    that.setData({
      yestTime: utils.getYestMsTime()
    })
    // that.getArticles(1)
    // if (wx.createRewardedVideoAd) {
    //   videoAd = wx.createRewardedVideoAd({
    //     adUnitId: 'adunit-2ce6db3cb1e45a86'
    //   })
    //   videoAd.onLoad(() => { })
    //   videoAd.onError((err) => {
    //     console.log('onError event emit', err)
    //     wx.showToast({

    //       title: '稍后再试',
    //     })
    //   })
    //   videoAd.onClose((res) => {
    //     if (res && res.isEnded) {
    //       // 正常播放结束，可以下发游戏奖励 
    //       that.jumpToPage(that.data.guid)
    //     } else {
    //       // 播放中途退出，不下发游戏奖励 
    //       wx.showToast({
    //         title: '求支持啊',
    //       })
    //     }
    //   })
    // }
  },

  getArtList: function (pageNo) {
    var that = this
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
    wx.request({
      url: 'https://mp1.91demo.top/mp3/artList',
      data: {
        'pageNo': pageNo,
      },
      methed: 'GET',
      success: (res) => {
        that.loading = false
        wx.hideLoading()
        console.log(res)
        const result = res.data;
        if (result.code == 1) {
          const articles = result.data;
          that.setData({
            page: pageNo, //当前的页号
            pages: result.count, //总页数
            artList: that.data.artList.concat(articles)
          })
        }

      },
      fail: (err) => {
        that.loading = false
        wx.hideLoading()
        console.log(err)
      }
    })

  },
  searchArt: function (pageNo, keyword) {
    var that = this
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
    wx.request({
      url: 'https://mp1.91demo.top/mp3/searchArt',
      data: {
        'pageNo': pageNo,
        'keyword': keyword
      },
      methed: 'GET',
      success: (res) => {
        that.loading = false
        wx.hideLoading()
        console.log(res)
        const result = res.data;
        if (result.code == 1) {
          const articles = result.data;
          that.setData({
            page: pageNo, //当前的页号
            pages: result.count, //总页数
            artList: that.data.artList.concat(articles)
          })
        }
      },
      fail: (err) => {
        that.loading = false
        wx.hideLoading()
        console.log(err)
      }
    })

  },
  getArticles: function (pageNo) {
    var that = this
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
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getLibList',
      // 传递给云函数的event参数
      data: {
        keyword: that.data.keyword,
        pageNo: pageNo,
      }
    }).then(res => {
      that.loading = false
      wx.hideLoading()
      console.log(res.result)
      const articles = res.result.list
      that.setData({
        page: pageNo, //当前的页号
        pages: res.result.pages, //总页数
        artList: that.data.artList.concat(articles)
      })

    }).catch(err => {
      // handle 
      console.log(err)
      that.loading = false
      wx.hideLoading()
    })

  },

  jump: function (e) {
    var that = this;
    that.setData({
      guid: e.currentTarget.dataset.guid,
    })
    console.log(e.currentTarget.dataset)
    that.jumpToPage(e.currentTarget.dataset.guid)
    // if (e.currentTarget.dataset.stars >= 5) {
    //   if (videoAd) {
    //     videoAd.show().catch(() => {
    //       // 失败重试 
    //       videoAd.load()
    //         .then(() => videoAd.show())
    //         .catch(err => {
    //           console.log('激励视频 广告显示失败')
    //         })
    //     })
    //   }
    // } else {
    //   that.jumpToPage(e.currentTarget.dataset.guid)
    // }

  },


  jumpToPage: function (guid) {
    // 调整到文章页面 
    wx.navigateTo({
      url: 'mkart/index?guid=' + guid,
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
    if (!this.loading && this.data.page < this.data.pages) {
      this.searchArt(this.data.page + 1, this.data.keyword)
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      artList: [],
    })
    // this.getArticles(1)
    this.getArtList(1)
    wx.stopPullDownRefresh()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})