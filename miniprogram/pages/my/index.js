// pages/my/index.js
const app = getApp();
const utils = require('../../utils/utils.js')
let videoAd = null;
let isLoadAd = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    points:50,
    artnum:20,
    views:10000,
    lockviews:500,
    sharepoints:20,
    tmplpoints:10,
  },

  loadAd() {
    const that = this;
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-2ce6db3cb1e45a86'
      })
      videoAd.onLoad(() => {
        that.isLoadAd = true;
      })
      videoAd.onError((err) => {
        console.error('激励视频光告加载失败', err)
        that.isLoadAd=false;
      })
      videoAd.onClose((res) => {
        // 用户点击了【关闭广告】按钮
        if (res && res.isEnded) {
          // 正常播放结束，可以下发游戏奖励
          console.log('1')
        } else {
          // 播放中途退出，不下发游戏奖励
          console.log('2')
        }
      })
    }
  },

  playAd() {
    // 限制当前用户看广告次数，半小时只允许看2次。
    wx.showLoading({
      title: '加载广告中',
    })
    if(!isLoadAd){
      this.loadAd();
      
    }
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      wx.hideLoading()
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => {
            
            videoAd.show()})
          .catch(err => {
            wx.showToast({
              title: '请重试一次',
            })
            console.error('激励视频 广告显示失败', err)
          })
      })
    }else{
      wx.showToast({
        title: '请重试一次',
      })
    }
  },

  myicode(){
    wx.navigateTo({
      url: '../myicode/index',
    })
  },
  upart(){
    wx.navigateTo({
      url: '../upart/index',
    })
  },
  upicode(){
    wx.navigateTo({
      url: '../upicode/index',
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
    videoAd = null;
    isLoadAd = false;
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