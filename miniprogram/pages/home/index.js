// example/index.js
const app = getApp();
const utils = require('../../utils/utils.js')
let videoAd = null;
let adFen = 0;
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
    op: 1, // 1 搜索查询 2 按时间查询 3 按年级查询
    qtype: 1, // 1 最火 2 最新 3 最冷
    grade: 1,// 1-18 分别对应小初上下
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


  initAdData: function () {
    const that = this;
    let vad1 = wx.getStorageSync("ad");
    if (utils.isEmpty(vad1)) {
      that.adFen = 20;
      wx.setStorageSync('ad', that.adFen);
    } else {
      that.adFen = vad1;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;

    that.initAdData();
    that.setData({
      yestTime: utils.getYestMsTime()
    })
  },

  searchArt: function (pageNo, keyword) {
    const that = this
    if (that.adFen < 1) {
      // 弹窗错误
      wx.showModal({
        title: '提示',
        content: '您现在使用频繁，需要观看广告补充能量',
        confirmText: '观看广告',
        cancelText: '关闭',
        success(res) {
          if (res.confirm) {
            // 播放广告
            that.showAd();
          } else if (res.cancel) {

          }
        }
      })
      return
    }
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

    utils.httpGet('/searchArt', {
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
        that.adFen = that.adFen - 1;
        wx.setStorageSync('ad', that.adFen);
      } else {
        wx.showToast({
          title: '没有找到记录',
        })
      }
    }).catch((err) => {
      that.loading = false
      wx.hideLoading()
    })
    // wx.request({
    //   // url:'http://106.15.188.202:9981/mp3/searchArt',
    //   url: 'https://mp1.91demo.top/mp3/searchArt',
    //   data: {
    //     'pageNo': pageNo,
    //     'keyword': keyword
    //   },
    //   methed: 'GET',
    //   success: (res) => {
    //     that.loading = false
    //     wx.hideLoading()
    //     console.log(res)
    //     const result = res.data;
    //     if (result.code == 1) {
    //       const articles = result.data;
    //       that.setData({
    //         page: pageNo, //当前的页号
    //         pages: result.count, //总页数
    //         artList: that.data.artList.concat(articles)
    //       })
    //       that.adFen = that.adFen - 2;
    //       wx.setStorageSync('ad', that.adFen);
    //     } else {
    //       wx.showToast({
    //         title: '没有找到记录',
    //       })
    //     }
    //   },
    //   fail: (err) => {
    //     that.loading = false
    //     wx.hideLoading()
    //     console.log(err)
    //   }
    // })

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
    console.log(this.data.qtype);
    this.getArtList(1, qtype)
  },
  // 根据类型查询
  getArtList: function (pageNo, qtype) {
    const that = this
    if (that.adFen < 1) {
      // 弹窗错误
      wx.showModal({
        title: '提示',
        content: '您现在使用频繁，需要观看广告补充能量',
        confirmText: '观看广告',
        cancelText: '关闭',
        success(res) {
          if (res.confirm) {
            // 播放广告
            that.showAd();
          } else if (res.cancel) {

          }
        }
      })
      return
    }
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

    utils.httpGet('/getArtList', {
      'pageNo': pageNo,
      'qtype': qtype,
    }).then((res) => {
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
        that.adFen = that.adFen - 1;
        wx.setStorageSync('ad', that.adFen);
      } else {
        wx.showToast({
          title: '没有找到记录',
        })
      }
    }).catch((err) => {
      that.loading = false
      wx.hideLoading()
      console.log(err)
    })
    // wx.request({
    //   // url:'http://106.15.188.202:9981/mp3/getArtList',
    //   url: 'https://mp1.91demo.top/mp3/getArtList',
    //   data: {
    //     'pageNo': pageNo,
    //     'qtype': qtype,
    //   },
    //   methed: 'GET',
    //   success: (res) => {
    //     that.loading = false
    //     wx.hideLoading()
    //     console.log(res)
    //     const result = res.data;
    //     if (result.code == 1) {
    //       const articles = result.data;
    //       that.setData({
    //         page: pageNo, //当前的页号
    //         pages: result.count, //总页数
    //         artList: that.data.artList.concat(articles)
    //       })
    //       that.adFen = that.adFen - 2;
    //       wx.setStorageSync('ad', that.adFen);
    //     } else {
    //       wx.showToast({
    //         title: '没有找到记录',
    //       })
    //     }
    //   },
    //   fail: (err) => {
    //     that.loading = false
    //     wx.hideLoading()
    //     console.log(err)
    //   }
    // })

  },

  bindGrade: function (e) {
    let btnId = e.target.id;
    let grade = parseInt(btnId);
    this.setData({
      artList: [],
      grade: grade,
      op: 3,
    })
    console.log(this.data.qtype);
    this.getPoemListByGrade(1, grade)
  },

  getPoemListByGrade: function (pageNo, grade) {
    const that = this
    if (that.adFen < 1) {
      // 弹窗错误
      wx.showModal({
        title: '提示',
        content: '您现在使用频繁，需要观看广告补充能量',
        confirmText: '观看广告',
        cancelText: '关闭',
        success(res) {
          if (res.confirm) {
            // 播放广告
            that.showAd();
          } else if (res.cancel) {

          }
        }
      })
      return
    }
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

    utils.httpGet('/getPoemListByGrade', {
      'pageNo': pageNo,
      'grade': grade,
    }).then((res) => {
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
        that.adFen=that.adFen-1;
        console.log('adfen,',that.adFen);
        wx.setStorageSync('ad', that.adFen);
      } else {
        wx.showToast({
          title: '没有找到记录',
        })
      }
    }).catch((err) => {
      that.loading = false
      wx.hideLoading()
      console.log(err)
    })

  },


  jump: function (e) {
    const that = this;
    // console.log(e.currentTarget.dataset)
    that.jumpToPage1(e.currentTarget.dataset.guid)
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

  // // 审核跳转
  // jumpV2: function (e) {
  //   const that = this;
  //   that.jumpToPageV2(e.currentTarget.dataset.guid, '1')
  // },

  jumpToPage: function (guid) {
    // 调整到文章页面 
    wx.navigateTo({
      url: '../mkart/index?guid=' + guid,
    })

  },

  jumpToPage1: function (guid) {
    // 调整到文章页面 
    wx.navigateTo({
      url: '../poem/index?guid=' + guid,
    })

  },
  loadAd: function () {
    const that = this;
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-2ce6db3cb1e45a86'
      })
      videoAd.onLoad(() => { })
      videoAd.onError((err) => {
        console.log('onError event emit', err)
        wx.showToast({
          title: '请稍后再试',
        })
      })
      videoAd.onClose((res) => {
        // 用户点击了【关闭广告】按钮
        if (res && res.isEnded) {
          // 正常播放结束，可以下发游戏奖励
          that.adFen = that.adFen + 20;
          wx.setStorageSync('ad', that.adFen);

          wx.showToast({
            title: '获得奖励',
          })
        } else {
          // 播放中途退出，不下发游戏奖励
        }
      })
    }
  },

  showAd: function () {
    wx.showLoading({
      title: '广告加载中',
    });
    const that = this;
    if (videoAd) {

    } else {
      that.loadAd();
    }

    if (videoAd) {
      videoAd.show().then(() => {
        wx.hideLoading();
      }).catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show().then(() => {
            wx.hideLoading();
          }))
          .catch(err => {
            console.log('激励视频 广告显示失败')
            wx.hideLoading();
          })
      })
    } else {
      wx.hideLoading();
      wx.showToast({
        title: '请稍后再试',
      })
      return
    }
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
        this.getPoemListByGrade(this.data.page + 1, this.data.grade)
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