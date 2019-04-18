// example/package-bytes/package-bytes.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //article将用来存储towxml数据
    article: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: "正在加载文章中..."
    });
    const _ts = this;
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: "getArticle",
      // 传递给云函数的参数
      data: {
        articleName: "package-bytes.md"
      },
      success: res => {
        console.log(res.result);
        _ts.setData({
          article: res.result
        });
      },
      fail: err => {
        wx.showToast({
          title: "获取文章失败"
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
