// example/miniprogram/miniprogram.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      id: 'intro',
      name: '小程序简介',
      open: false,
      pages: [{
        id: 'mp_1-1',
        name: '技术发展史'
      },
        {
          id: 'mp_1-2',
          name: '与普通网页开发的区别'
        }, 
        {
          id: 'mp_1-3',
          name: '小程序体验'
        },
      
      ]

    },
    {
      id: 'framework',
      name: '小程序框架',
      open: false,
      pages: [{
        id: 'mp_2-1',
        name: '小程序代码构成'
      }, 
      {
          id: 'mp_2-2',
          name: 'JSON配置'
        },
        {
          id: 'mp_2-3',
          name: 'WXML模板'
        }, 
        {
          id: 'mp_2-4',
          name: 'WXSS样式'
        },
        
        {
          id: 'mp_2-5',
          name: 'WXML语法'
        },
        {
          id: 'mp_2-6',
          name: 'WXS语法'
        },
        {
          id: 'mp_2-7',
          name: 'JavaScript脚本'
        },
      ]
    },
    {
      id: 'component',
      name: '小程序组件',
      open: false,
      pages: [{
        id: 'mp_3-1',
        name: '视图容器'
      },
        {
          id: 'mp_3-2',
          name: '基础内容'
        },
        {
          id: 'mp_3-3',
          name: '表单组件'
        },
        {
          id: 'mp_3-4',
          name: '导航'
        },
        {
          id: 'mp_3-5',
          name: '媒体组件'
        },
        {
          id: 'mp_3-6',
          name: '地图'
        },
        {
          id: 'mp_3-7',
          name: '画布'
        },
        {
          id: 'mp_3-8',
          name: '开放能力'
        },

      ]
    },
    {
      id: 'cloud',
      name: '小程序云开发',
      open: false,
      pages: [{
        id: 'mp_4-1',
        name: '简介'
      },
        {
          id: 'mp_4-2',
          name: '数据库'
        },
        {
          id: 'mp_4-3',
          name: '存储'
        },
        {
          id: 'mp_4-4',
          name: '云函数'
        },
        {
          id: 'mp_4-5',
          name: '云调用'
        },
      
      ]
    },
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