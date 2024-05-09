// pages/cardtmpl/index.js
const app = getApp();
import {
  httpGet,
  isEmpty
} from '../../utils/utils.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardTmplList: [],
    qtype: 1,
    pages: 0,
    page: 1,
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
      default:
        break;
    }
    this.setData({
      cardTmplList: [],
      qtype: qtype,
    })

    this.getCardTmplList(1, qtype)
  },
  // 根据类型查询
  getCardTmplList: function (pageNo, qtype) {
    const that = this

    that.loading = true
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    if (pageNo === 1) {
      that.setData({
        cardTmplList: [],
      })
    }

    httpGet('/getCardTmplList', {
      'pageNo': pageNo,
      'qtype': qtype,
    }).then((res) => {
      that.loading = false
      wx.hideLoading()

      const result = res.data;
      if (result.code == 1) {
        const cards = result.data;
        console.log(cards)
        that.setData({
          page: pageNo, //当前的页号
          pages: result.count, //总页数
          cardTmplList: that.data.cardTmplList.concat(cards)
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

  jump(e){
    const that = this;
    // 获取文章内容，看看是否有锁标志，然后判断点数是否足够，不足够唤起广告。
    const idx = e.currentTarget.dataset.idx;
    const card = that.data.cardTmplList[idx];
    wx.navigateTo({
      url: '../cardtmpl/detail?id=' + card.id +'&desc='+card.desc+'&url='+card.url,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      cardTmplList: [],
      page: 1
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (!this.loading && this.data.page < this.data.pages) {
      this.getCardTmplList(this.data.page + 1, this.data.qtype)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})