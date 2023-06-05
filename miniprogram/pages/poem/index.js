// pages/poem/index.js
const app = getApp();
const utils = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poem: {},

    // poem:{
    //   title:[{'py':'jing','hz':'静'},{'py':'ye','hz':'夜'},{'py':'si','hz':'思'}],
    //   dynasty:[{'py':'tang','hz':'唐'}],
    //   poet:[{'py':'li','hz':'李'},{'py':'bai','hz':'白'}],
    //   verses: [[{ 'py': 'chuang', 'hz': '窗' }, { 'py': 'qian', 'hz': '前' }, { 'py': 'ming', 'hz': '明' }, { 'py': 'yue', 'hz': '月' }, { 'py': 'guang', 'hz': '光' },{'py':'','hz':'，'}], [{ 'py': 'chuang', 'hz': '窗' }, { 'py': 'qian', 'hz': '前' }, { 'py': 'ming', 'hz': '明' }, { 'py': 'yue', 'hz': '月' }, { 'py': 'guang', 'hz': '光' }],[{ 'py': 'chuang', 'hz': '窗' }, { 'py': 'qian', 'hz': '前' }, { 'py': 'ming', 'hz': '明' }, { 'py': 'yue', 'hz': '月' }, { 'py': 'guang', 'hz': '光' }],[{ 'py': 'chuang', 'hz': '窗' }, { 'py': 'qian', 'hz': '前' }, { 'py': 'ming', 'hz': '明' }, { 'py': 'yue', 'hz': '月' }, { 'py': 'guang', 'hz': '光' }]],
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    const _ts = this;
    wx.showLoading({
      title: '加载中',
    })

    utils.httpGet('/poemDetail', {
      uuid: options.guid,
    }).then((res) => {

      const result = res.data;
      if (result.code == 1) {
        let content = result.data;
        const obj = JSON.parse(content)
        console.log('content,', content)
        console.log('obj,',obj)
        _ts.setData({
          poem: obj,
        });
        console.log('p,', _ts.data.poem);
        wx.hideLoading({
          success: (res) => {},
        })
      } else {
        wx.hideLoading()
      }
    }).catch((err) => {
      console.log(err);
      wx.hideLoading({
        success: (res) => {},
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