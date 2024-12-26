const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    projects: [{
      id: 'visit.md',
      title: '豆子碎片',
      desc: '这是一个什么样的项目？它介绍了什么？如何去更好的使用它？我如何为它做贡献？',
    }],
    languages: [{
      id: 'go.md',
      img: './../../images/note.png',
      name: 'Golang (1) 基础',
    }, {
      id: 'go2.md',
      img: './../../images/note.png',
      name: 'Golang (2) 循环条件',
    }, {
      id: 'go3.md',
      img: './../../images/note.png',
      name: 'Golang (3) 高级数据结构',
    }, {
      id: 'go4.md',
      img: './../../images/note.png',
      name: 'Golang (4) 并发',
    }, {
      id: 'rust.md',
      img: './../../images/note.png',
      name: 'Rust',
    }],
    databases: [{
      id: 'go1.md',
      img: './../../images/link.png',
      name: 'Golang(1)',
    }, {
      id: 'go2.md',
      img: './../../images/link.png',
      name: 'Golang(2)',
    }, {
      id: 'go3.md',
      img: './../../images/link.png',
      name: 'Golang(3)',
    }, {
      id: 'rust.md',
      img: './../../images/link.png',
      name: 'Rust',
    }],
    libs: [{
      id: 'go1.md',
      img: './../../images/earth.png',
      name: 'Golang(1)',
    }, {
      id: 'go2.md',
      img: './../../images/earth.png',
      name: 'Golang(2)',
    }, {
      id: 'go3.md',
      img: './../../images/earth.png',
      name: 'Golang(3)',
    }, {
      id: 'rust.md',
      img: './../../images/earth.png',
      name: 'Rust',
    }],
    tools: [{
      id: 'go1.md',
      img: './../../images/tool.png',
      name: 'Golang(1)',
    }, {
      id: 'go2.md',
      img: './../../images/tool.png',
      name: 'Golang(2)',
    }, {
      id: 'go3.md',
      img: './../../images/tool.png',
      name: 'Golang(3)',
    }, {
      id: 'rust.md',
      img: './../../images/tool.png',
      name: 'Rust',
    }],
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