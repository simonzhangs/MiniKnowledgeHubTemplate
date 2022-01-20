// example/index.js
const app = getApp();
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
    guid:"",
    index:0,
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
      keyword: ""
    });
    this.getArticles()
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
    this.getArticles()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getArticles()
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-2ce6db3cb1e45a86'
      })
      videoAd.onLoad(() => {})
      videoAd.onError((err) => {
        console.log('onError event emit', err)
        wx.showToast({

          title: '稍后再试',
        })
      })
      videoAd.onClose((res) => {
        if (res && res.isEnded) {
          // 正常播放结束，可以下发游戏奖励 
          that.jumpToPage(that.data.guid)
        } else {
          // 播放中途退出，不下发游戏奖励 
          wx.showToast({
            title: '求支持啊',
          })
        }
      })
    }


  },
  getArticles: function () {
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getLibList',
      // 传递给云函数的event参数
      data: {
        keyword: that.data.keyword,
      }
    }).then(res => {

      wx.hideLoading()
      console.log(res.result)
      that.setData({
        artList: res.result.data
      })

    }).catch(err => {
      // handle 
      console.log(err)
      wx.hideLoading()
    })

  },

  contribute: function () {
    wx.navigateTo({
      url: 'chip/index',
    })
  },

  jump: function (e) {
    var that = this;
    that.setData({
      guid:e.currentTarget.dataset.guid,
      
    })
    //that.jumpToPage(e.currentTarget.dataset.guid)
    if (e.currentTarget.dataset.stars >= 5) {

      if (videoAd) {
        videoAd.show().catch(() => {
          // 失败重试 
          videoAd.load()
            .then(() => videoAd.show())
            .catch(err => {
              console.log('激励视频 广告显示失败')
            })
        })
      }
    } else {
      console.log(e.currentTarget.dataset.guid);
      that.jumpToPage(e.currentTarget.dataset.guid)
    }

  },


  jumpToPage: function (guid) {

    // 调整到文章页面 
    wx.navigateTo({
      url: './article/index?guid=' + guid,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})