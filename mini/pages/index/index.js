const app = getApp();

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
    qtype: 1, // 1 最火 2 最新 3 最冷 4 我的 5 同城 6 最赞
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
    const that = this;
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
      case "btnProject":
        // 我的项目
        qtype = 1;
        break;
      case "btnProtocol":
        // RFC协议
        qtype = 2;
        break;
      case "btnCode":
        // 编程语言
        qtype = 3;
        break;
      case "btnDB":
        // 数据库
        qtype = 4;
        break;
      case "btnLib":
        // 开源编程库
        qtype = 5;
        break;
      case "btnTool":
        // 常用工具
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("index onload")
    // 检查是否需要更新版本
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
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})