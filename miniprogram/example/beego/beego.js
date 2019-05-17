// example/beego/beego.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: "intro",
        name: "简介",
        open: false,
        pages: [
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

        ]
      },
      {
        id: "quickstart",
        name: "快速入门",
        open: false,
        pages: [
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
          }
        ]
      },
      {
        id: "mvc_controller_3",
        name: "Beego的MVC架构之Controller",
        open: false,
        pages: [
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
            id:"beego_3_11",
            name:"表单数据验证"

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
      {
        id: "mvc_model_4",
        name: "Beego的MVC架构之Model",
        open: false,
        pages: [
          {
            id: "beego_4_1",
            name: "概述"
          },
          {
            id: "beego_4_2",
            name: "ORM使用"
          },
          {
            id: "beego_4_3",
            name: "CRUD操作"
          },
          {
            id: "beego_4_4",
            name: "高级查询"
          },
          {
            id: "beego_4_5",
            name: "原生SQL查询"
          },
          {
            id: "beego_4_6",
            name: "构造查询"
          },
          {
            id: "beego_4_7",
            name: "事务处理"
          },
          {
            id: "beego_4_8",
            name: "模块定义"
          },
          {
            id: "beego_4_9",
            name: "命令模式"
          },
          {
            id: "beego_4_10",
            name: "测试用例"
          },
          {
            id: "beego_4_11",
            name: "自定义字段"
          }
        ]
      },
      {
        id: "mvc_view_5",
        name: "Beego的MVC架构之View",
        open: false,
        pages: [
          {
            id: "beego_5_1",
            name: "模板语法指南"
          },
          {
            id: "beego_5_2",
            name: "模板处理"
          },
          {
            id: "beego_5_3",
            name: "模板函数"
          },
          {
            id: "beego_5_4",
            name: "静态文件处理"
          },
          {
            id: "beego_5_5",
            name: "模板分页处理"
          }
        ]
      },
      {
        id: "app_deploy_6",
        name: "应用部署",
        open: false,
        pages: [
          {
            id: "beego_6_1",
            name: "独立部署"
          },
          {
            id: "beego_6_2",
            name: "supervisor部署"
          },
          {
            id: "beego_6_3",
            name: "nginx独立部署"
          },
          {
            id: "beego_6_4",
            name: "apache独立部署"
          }
        ]
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  jump: function (options) {
    // console.log(options.currentTarget.dataset.pageid)
    wx.navigateTo({
      url: '../common/common?title=' + options.currentTarget.dataset.pageid,
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