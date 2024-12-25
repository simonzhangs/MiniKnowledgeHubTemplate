const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    languages: [{
      id:'go1.md',
      img:'./../../images/note.png',
      name:'Golang(1)',
    },{
      id:'go2.md',
      img:'./../../images/note.png',
      name:'Golang(2)',
    },{
      id:'go3.md',
      img:'./../../images/note.png',
      name:'Golang(3)',
    },{
      id:'rust.md',
      img:'./../../images/note.png',
      name:'Rust',
    }],
    databases: [],
    tools: [],
    editors: [],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("index onload")
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