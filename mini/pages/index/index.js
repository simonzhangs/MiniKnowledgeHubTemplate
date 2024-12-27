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
      id: 'bash.md',
      img: './../../images/note.png',
      name: 'Bash 脚本',
    }, {
      id: 'bat.md',
      img: './../../images/note.png',
      name: 'Bat 脚本',
    }, {
      id: 'go.md',
      img: './../../images/note.png',
      name: 'Golang 语言',
    }, {
      id: 'rust.md',
      img: './../../images/note.png',
      name: 'Rust 语言',
    }, {
      id: 'miniapp.md',
      img: './../../images/note.png',
      name: '微信小程序',
    }, {
      id: 'freepascal.md',
      img: './../../images/note.png',
      name: 'Free Pascal 语言',
    }, {
      id: 'c.md',
      img: './../../images/note.png',
      name: 'C 语言',
    }],
    protocols: [{
      id: 'socks5.md',
      img: './../../images/note.png',
      name: 'Socks 5协议',
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
    }, {
      id: 'postgresql.md',
      img: './../../images/link.png',
      name: 'Postgresql',
    }, {
      id: 'oracle.md',
      img: './../../images/link.png',
      name: 'Oracle',
    }, {
      id: 'sqlserver.md',
      img: './../../images/link.png',
      name: 'Sqlserver',
    }, {
      id: 'minio.md',
      img: './../../images/link.png',
      name: 'Minio',
    }],
    libs: [{
      id: 'gostd.md',
      img: './../../images/earth.png',
      name: 'Golang 标准库',
    }, {
      id: 'golib.md',
      img: './../../images/earth.png',
      name: 'Golang 常用库',
    }, {
      id: 'rust.md',
      img: './../../images/earth.png',
      name: 'Rust 常用库',
    }],
    tools: [{
      id: 'asterisk.md',
      img: './../../images/tool.png',
      name: 'Asterisk',
    }, {
      id: 'awk.md',
      img: './../../images/tool.png',
      name: 'Awk',
    }, {
      id: 'caddy.md',
      img: './../../images/tool.png',
      name: 'Caddy',
    }, {
      id: 'docker.md',
      img: './../../images/tool.png',
      name: 'Docker',
    }, {
      id: 'ffmpeg.md',
      img: './../../images/tool.png',
      name: 'FFmpeg',
    }, {
      id: 'firewall.md',
      img: './../../images/tool.png',
      name: 'Firewall',
    }, {
      id: 'frp.md',
      img: './../../images/tool.png',
      name: 'Frp',
    }, {
      id: 'git.md',
      img: './../../images/tool.png',
      name: 'Git',
    }, {
      id: 'hugo.md',
      img: './../../images/tool.png',
      name: 'Hugo',
    }, {
      id: 'iperf3.md',
      img: './../../images/tool.png',
      name: 'Iperf3',
    }, {
      id: 'mdbook.md',
      img: './../../images/tool.png',
      name: 'Mdbook',
    }, {
      id: 'mosquitto.md',
      img: './../../images/tool.png',
      name: 'Mosquitto',
    }, {
      id: 'netstat.md',
      img: './../../images/tool.png',
      name: 'netstat',
    }, {
      id: 'nginx.md',
      img: './../../images/tool.png',
      name: 'Nginx',
    }, {
      id: 'rsync.md',
      img: './../../images/tool.png',
      name: 'Rsync',
    }, {
      id: 'rustdesk.md',
      img: './../../images/tool.png',
      name: 'Rustdesk',
    }, {
      id: 'scp.md',
      img: './../../images/tool.png',
      name: 'Scp',
    }, {
      id: 'sed.md',
      img: './../../images/tool.png',
      name: 'sed',
    }, {
      id: 'seelog.md',
      img: './../../images/tool.png',
      name: 'Log',
    }, {
      id: 'setip.md',
      img: './../../images/tool.png',
      name: 'IPconfig',
    }, {
      id: 'vim.md',
      img: './../../images/tool.png',
      name: 'vim (上)',
    }, {
      id: 'vim2.md',
      img: './../../images/tool.png',
      name: 'vim (下)',
    }, {
      id: 'wsl.md',
      img: './../../images/tool.png',
      name: 'Wsl',
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