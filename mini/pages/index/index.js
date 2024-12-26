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
      id: 'markdown.md',
      img: './../../images/note.png',
      name: 'Markdown 语法教程',
    }, {
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
      name: 'Rust (1) 基础',
    }],
    databases: [{
      id: 'redis.md',
      img: './../../images/link.png',
      name: 'Redis 常用命令',
    }, {
      id: 'sqlite3.md',
      img: './../../images/link.png',
      name: 'Sqlite3',
    }, {
      id: 'mongodb.md',
      img: './../../images/link.png',
      name: 'Mongodb',
    }, {
      id: 'mysql.md',
      img: './../../images/link.png',
      name: 'Mysql',
    } ,{
      id: 'postgresql.md',
      img: './../../images/link.png',
      name: 'Postgresql',
    } ,{
      id: 'oracle.md',
      img: './../../images/link.png',
      name: 'Oracle',
    },{
      id: 'sqlserver.md',
      img: './../../images/link.png',
      name: 'Sqlserver',
    },{
      id: 'minio.md',
      img: './../../images/link.png',
      name: 'Minio',
    }],
    libs: [{
      id: 'gostd.md',
      img: './../../images/earth.png',
      name: 'Golang 标准库',
    }, {
      id: 'gonet.md',
      img: './../../images/earth.png',
      name: 'Golang 网络库',
    }, {
      id: 'rust.md',
      img: './../../images/earth.png',
      name: 'Rust',
    }],
    tools: [{
      id: 'awk.md',
      img: './../../images/tool.png',
      name: 'Awk',
    }, {
      id: 'docker.md',
      img: './../../images/tool.png',
      name: 'Docker',
    }, {
      id: 'ffmpeg.md',
      img: './../../images/tool.png',
      name: 'Ffmpeg',
    }, {
      id: 'frp.md',
      img: './../../images/tool.png',
      name: 'Frp',
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