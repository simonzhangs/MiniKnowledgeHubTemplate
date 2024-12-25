// pages/mkart/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid: '',
    article: {}, // 内容数据
    dltime: 0, // 下载时间
    rdtime: 0, // 渲染时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let n1 = utils.getNowMsTime();
    const that = this;
    that.setData({
      uuid: options.guid,
    })
    wx.showLoading({
      title: '加载中...',
    })

    httpGet('/artd', {
      uuid: options.guid,
      v: '1',
    }).then((res) => {
      let n2 = utils.getNowMsTime();
      let dltime = n2 - n1;
      wx.hideLoading()
      const result = res.data;
      if (result.code == 1) {
        let content = result.data;
        let obj = app.towxml(content.artcont, 'markdown', {
          theme: 'light',
          events: {
            tap: (e) => {
              console.log('tap', e);
            }
          }
        });

        let bn = "点赞";
        let isstar = content.isstar;
        if (isstar) {
          bn = "已点赞";
        }

        that.setData({
          article: obj,
          isstar: isstar,
          btnName: bn,
        });

        let n3 = utils.getNowMsTime();
        let rdtime = n3 - n2;
        that.setData({
          dltime: dltime,
          rdtime: rdtime,
        })

      } else {
        wx.showToast({
          title: '系统错误请重试',
        })
      }
    }).catch((err) => {
      console.log(err);
      wx.hideLoading()
      wx.showToast({
        title: '网络异常请重试',
      })
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})