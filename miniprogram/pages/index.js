// example/index.js
const app = getApp();

Page({
  mixins: [require('../mixin/themeChanged')],

  /**
   * 页面的初始数据
   */
  data: {
    artList: [],
    inputShowed: false,
    inputVal: "",
    keyword: "",
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
      keyword:""
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
    if(options.id==='wander'){
      wx.showModal({
        title: '提示',
        content: '看到本页面说明您通过其它小程序跳转过来。欢迎您，朋友！',
        showCancel:false,
        confirmText:'欢迎光临',
        success (res) {
        
        },
        complete:function(){
          that.getArticles()
        }
      })
    }else{
      that.getArticles()
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
      name: 'getArtList',
      // 传递给云函数的event参数
      data: {
        keyword: that.data.keyword,
      }
    }).then(res => {
      
      wx.hideLoading()
      that.setData({
        artList: res.result.data
      })
    }).catch(err => {
      // handle 
      console.log(err)
      wx.hideLoading()
    })

  },

  jump: function (e) {
   
    // 更新点击量
    wx.cloud.callFunction({
      name: 'updateArtViews',
      data: {
        id: e.currentTarget.dataset.id
      },
      fail: err => {
        console.error(err)
      }
    })
    // 调整到文章页面
    wx.navigateTo({
      url: './common/common?fileid=' + e.currentTarget.dataset.fileid,
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    this.getArticles()
    wx.stopPullDownRefresh()


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