// example/index.js
const app = getApp();

let skip = 0
let bcount = 0
Page({
  mixins: [require('../mixin/themeChanged')],

  /**
   * 页面的初始数据
   */
  data: {
    artList: [{
        title: 'Golang 1.5版本发布',
        num: 1,
        tag: 'golang',
        fileid: '1',
      },
      {
        title: 'Golang 1.6版本发布',
        num: 1,
        tag: 'golang',
        fileid: '2',
      },
      {
        title: 'Golang 1.7版本发布',
        num: 1,
        tag: 'golang',
        fileid: '3',
      },
      {
        title: 'Golang 1.8版本发布',
        num: 1,
        tag: 'golang',
        fileid: '4',
      },
    ],
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //this.getBooks(0)
  },
  getBooks: function (skip) {
    var that = this
    wx.showLoading({
      title: '加载中...',
    })

    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getBooks',
      // 传递给云函数的event参数
      data: {
        skip: skip
      }
    }).then(res => {
      console.log(res.result)
      wx.hideLoading()
      openid = res.result.openid
      app.globalData.OPENID = res.result.openid
      that.setData({
        bookList: res.result.bookList.data,
        bcount: res.result.bcount.total
      })
    }).catch(err => {
      // handle 
      console.log(err)
      wx.hideLoading()
    })
  },

  next: function () {
    console.log(skip)
    // 刷新一下，满足不够10的情况
    this.getBooks(skip)
    var prenum = skip
    skip = skip + 10
    if (skip > bcount) {
      wx.showToast({
        title: '没有数据了！',
      })
      skip = prenum
      return
    }

    this.getBooks(skip)
  },
 jump:function(e){
   console.log(e.currentTarget.dataset.fileid)

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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