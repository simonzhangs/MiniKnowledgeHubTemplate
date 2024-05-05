// pages/upart/index.js
const app = getApp();
import {
  isEmpty,
  httpPost
} from "../../utils/utils";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1: ['请选择','Rust', 'Go', '小程序', 'H5', '数据库', '开发环境'],
    value1: 0,
    array2: ['请选择', '代码片段','编程库'],
    value2: 0,
    lockstate: 1,
    switch1Checked:true,
  },
  bindPicker1Change(e) {
    this.setData({
      value1: e.detail.value,
    });
  },
  bindPicker2Change(e) {
    this.setData({
      value2: e.detail.value,
    });
  },
  switch1Change(e) {
    console.log(e.detail.value)
    if(e.detail.value){
      this.setData({
        lockstate:1
      })
    }else{
      this.setData({
        lockstate:0,
      })
    }
    this.setData({
      switch1Checked: e.detail.value,
    })
    console.log(this.data.lockstate)
  },
  upart(e) {
    const that = this;
    console.log(e.detail.value,that.data.lockstate);
    const formObj = e.detail.value;
   
    if (isEmpty(formObj.title)) {
      wx.showToast({
        title: '标题为空',
      })
      return
    }
    if (isEmpty(formObj.desc)) {
      wx.showToast({
        title: '描述为空',
      })
      return
    }
    if (that.data.value1==0) {
      wx.showToast({
        title: '请选择语言类目',
      })
      return
    }
    if (that.data.value2==0) {
      wx.showToast({
        title: '请选择文章类型',
      })
      return
    }else if(that.data.value2==1){
      if(isEmpty(formObj.snippet)){
        wx.showToast({
          title: '代码片段为空',
        })
        return
      }
    }else if (that.data.value2==2){
      if(isEmpty(formObj.github)){
        wx.showToast({
          title: 'Github为空',
        })
        return
      }
    }

    const curpoints = app.getPoints();
    if (curpoints < 1) {
      wx.showToast({
        title: '点数不足',
      })
      return
    }

    wx.getSetting({
      withSubscriptions: true,
      success (res) {
        console.log(res.subscriptionsSetting)
        if(isEmpty(res.subscriptionsSetting.DJrFZAlByd5L1xVLS8193hqxafgI6gj7I7n2Pprqs5k)){
          wx.requestSubscribeMessage({
            tmplIds: ['DJrFZAlByd5L1xVLS8193hqxafgI6gj7I7n2Pprqs5k'],
            success (res) { 
              console.log('sub,',res)
              if(res.DJrFZAlByd5L1xVLS8193hqxafgI6gj7I7n2Pprqs5k=="accept"){
                that.submitArt(that.data.value2,formObj.title,formObj.desc,that.data.value1,formObj.github,formObj.snippet,that.data.lockstate)
              }
            }
          })
        }else{
          if (res.subscriptionsSetting.DJrFZAlByd5L1xVLS8193hqxafgI6gj7I7n2Pprqs5k=="accept"){
            that.submitArt(that.data.value2,formObj.title,formObj.desc,that.data.value1,formObj.github,formObj.snippet,that.data.lockstate)
          }else{
            wx.showToast({
              title: '请打开订阅通知',
            })
          }
        }
      }
    })

  },

  submitArt(atype,title,desc,tags,github,snippet,lockstate){
    wx.showLoading({
      title: '上传文章中',
    })
    httpPost('/upArt', {
      'atype':Number(atype),
      'title': title,
      'desc': desc,
      'tags': Number(tags),
      'github':github,
      'snippet':snippet,
      'lockstate': lockstate,
    }).then((res)=>{
      wx.hideLoading();
      console.log(res);
      // const result = JSON.parse(res.data);
      if (res.data.code == 1) {
        app.costPoints();
        wx.showToast({
          title: '提交成功',
        })
      } else {
        wx.showToast({
          title: res.data.msg,
        })
      }
    }).catch((err)=>{
      console.log(err);
      wx.hideLoading()
      wx.showToast({
        title: '网络异常请重试',
      })
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