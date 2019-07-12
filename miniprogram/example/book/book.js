// example/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articlesList:[
      {
        id: "beego_Introduction",
        name: "beego 简介"
      },
      {
        id: "beego_contributing",
        name: "为 beego 做贡献"
      },
      {
        id: "beego_releases",
        name: "发布版本"
      },
      {
        id: "beego_upgrade",
        name: "升级指南"
      },
      {
        id: "beego_new",
        name: "bee 工具新建项目"
      },
      {
        id: "beego_router",
        name: "路由设置"
      },
      {
        id: "beego_controller",
        name: "controller 运行机制"
      },
      {
        id: "beego_model",
        name: "model 逻辑"
      },
      {
        id: "beego_view",
        name: "view 渲染"
      },
      {
        id: "beego_static",
        name: "静态文件处理"
      },
      {
        id: "beego_3_1",
        name: "参数配置"

      },
      {
        id: "beego_3_2",
        name: "路由设置"
      },
      {
        id: "beego_3_3",
        name: "控制器函数"
      },
      {
        id: "beego_3_4",
        name: "xsrf 过滤"
      },
      {
        id: "beego_3_5",
        name: "请求数据处理"
      },
      {
        id: "beego_3_6",
        name: "session 控制"
      },
      {
        id: "beego_3_7",
        name: "过滤器"
      },
      {
        id: "beego_3_8",
        name: "flash 数据"
      },
      {
        id: "beego_3_9",
        name: "URL构建"
      },
      {
        id: "beego_3_10",
        name: "多种格式数据输出"
      },
      {
        id: "beego_3_11",
        name: "表单数据验证"
      },
      {
        id: "beego_3_12",
        name: "错误处理"
      },
      {
        id: "beego_3_13",
        name: "日志处理"
      }
    ]
  },
  searchArticle(e) {
    let key = e.detail.value.toLowerCase();
    let list = this.data.icon;
    for (let i = 0; i < list.length; i++) {
      let a = key;
      let b = list[i].name.toLowerCase();
      if (b.search(a) != -1) {
        list[i].isShow = true
      } else {
        list[i].isShow = false
      }
    }
    this.setData({
      icon: list
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})