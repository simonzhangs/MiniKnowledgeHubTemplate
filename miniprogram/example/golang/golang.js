// example/golang/golang.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        id: 'intro',
        name: '包、变量和函数',
        open: false,
        pages: [{
            id: 'packages',
            name: '包'
          },
          {
            id: 'go-imports',
            name: '导入'
          },
          {
            id: 'exported-names',
            name: '导出名'
          },
          {
            id: 'functions',
            name: '函数'
          },
          {
            id: 'functions-continued',
            name: '函数（续）'
          },
          {
            id: 'multiple-results',
            name: '多值返回'
          },
          {
            id: 'named-results',
            name: '命名返回值'
          },
          {
            id: 'variables',
            name: '变量'
          },
          {
            id: 'variables-with-initializers',
            name: '变量初始化'
          },
          {
            id: 'short-variable-declarations',
            name: '短变量声明'
          },
          {
            id: 'basic-types',
            name: '基本类型'
          },
          {
            id: 'zeros',
            name: '零值'
          },
          {
            id: 'type-conversions',
            name: '类型转换'
          },
          {
            id: 'type-inference',
            name: '类型推导'
          },
          {
            id: 'constants',
            name: '常量'
          },
          {
            id: 'numeric-constants',
            name: '数值常量'
          }
        ]

      },
      {
        id: 'control',
        name: '流程控制语句',
        open: false,
        pages: [{
            id: 'go-for',
            name: 'for'
          },
          {
            id: 'for-continued',
            name: 'for（续）'
          },
          {
            id: 'for-is-gos-while',
            name: 'for是Go中的“while”'
          },
          {
            id: 'forever',
            name: '无限循环'
          },
          {
            id: 'go-if',
            name: 'if'
          },
          {
            id: 'if-with-a-short-statement',
            name: 'if的简短语句'
          },
          {
            id: 'if-and-else',
            name: 'if和else'
          },
          {
            id: 'go-switch',
            name: 'switch'
          },
          {
            id: 'switch-evaluation-order',
            name: 'switch的求值顺序'
          },
          {
            id: 'switch-with-no-condition',
            name: '没有条件的switch'
          },
          {
            id: 'go-defer',
            name: 'defer'
          },
          {
            id: 'defer-multi',
            name: 'defer栈'
          }
        ]
      },
      {
        id: 'struct',
        name: '结构体、切片和映射',
        open: false,
        pages: [{
            id: 'pointers',
            name: '指针'
          },
          {
            id: 'structs',
            name: '结构体'
          },
          {
            id: 'struct-fields',
            name: '结构体字段'
          },
          {
            id: 'struct-pointers',
            name: '结构体指针'
          },
          {
            id: 'struct-literals',
            name: '结构体文法'
          },
          {
            id: 'go-array',
            name: '数组'
          },
          {
            id: 'slices',
            name: '切片'
          },
          {
            id: 'slices-pointers',
            name: '切片就像数组的引用'
          },
          {
            id: 'slice-literals',
            name: '切片文法'
          },
          {
            id: 'slice-bounds',
            name: '切片的默认行为'
          },
          {
            id: 'slice-len-cap',
            name: '切片的长度与容量'
          },
          {
            id: 'nil-slices',
            name: 'nil切片'
          },
          {
            id: 'making-slices',
            name: '用make创建切片'
          },
          {
            id: 'slices-of-slice',
            name: '切片的切片'
          },
          {
            id: 'append',
            name: '向切片追加元素'
          },
          {
            id: 'range',
            name: 'Range'
          },
          {
            id: 'range-continued',
            name: 'range（续）'
          },
          {
            id: 'go-maps',
            name: '映射'
          },
          {
            id: 'map-literals',
            name: '映射文法'
          },
          {
            id: 'map-literals-continued',
            name: '映射文法（续）'
          },
          {
            id: 'mutating-maps',
            name: '修改映射'
          },
          {
            id: 'function-values',
            name: '函数值'
          },
          {
            id: 'function-closures',
            name: '函数的闭包'
          }


        ]
      },
      {
        id: 'method',
        name: '方法和接口',
        open: false,
        pages: [{
            id: 'methods',
            name: '方法'
          },
          {
            id: 'methods-funcs',
            name: '方法即函数'
          },
          {
            id: 'methods-continued',
            name: '方法（续）'
          },
          {
            id: 'methods-pointers',
            name: '指针接收者'
          },
          {
            id: 'methods-pointers-explained',
            name: '指针与函数'
          },
          {
            id: 'indirection',
            name: '方法与指针重定向'
          },
          {
            id: 'indirection-values',
            name: '方法与指针重定向（续）'
          },
          {
            id: 'methods-with-pointer-receivers',
            name: '选择值或指针作为接收者'
          },
          {
            id: 'interfaces',
            name: '接口'
          },
          {
            id: 'interfaces-are-satisfied-implicitly',
            name: '接口与隐式实现'
          },
          {
            id: 'interface-values',
            name: '接口值'
          },
          {
            id: 'interface-values-with-nil',
            name: '底层值为nil的接口值'
          },
          {
            id: 'nil-interface-values',
            name: 'nil接口值'
          },
          {
            id: 'empty-interface',
            name: '空接口'
          },
          {
            id: 'type-assertions',
            name: '类型断言'
          },
          {
            id: 'type-switches',
            name: '类型选择'
          },
          {
            id: 'stringer',
            name: 'Stringer'
          },
          {
            id: 'errors',
            name: '错误'
          },
          {
            id: 'reader',
            name: 'Reader'
          },
          {
            id: 'go-images',
            name: '图像'
          }
        ]
      },
      {
        id: 'concurrent',
        name: '并发',
        open: false,
        pages: [{
            id: 'goroutines',
            name: 'Go程'
          },
          {
            id: 'channels',
            name: '信道'
          },
          {
            id: 'buffered-channels',
            name: '带缓存的信道'
          },
          {
            id: 'range-and-close',
            name: 'range和close'
          },
          {
            id: 'select',
            name: 'select语句'
          },
          {
            id: 'default-selection',
            name: '默认选择'
          },
          {
            id: 'mutex-counter',
            name: 'sync.Mutex'
          },
          {
            id: 'exercise-web-crawler',
            name: 'Web爬虫'
          }
        ]
      },
      {
        id: 'packages',
        name: 'Golang自带常用包',
        open: false,
        pages: [{
            id: 'package-fmt',
            name: 'Fmt包'
          },
          {
            id: 'package-log',
            name: 'Log包'
          },
          {
            id: 'package-time',
            name: 'Time包'
          },
          {
            id: 'package-math',
            name: 'Math包'
          },
          {
            id: 'package-os',
            name: 'Os包'
          },
          {
            id: 'package-context',
            name: 'Context包'
          },
          {
            id: 'package-archive',
            name: 'Archive包'
          },
          {
            id: 'package-bufio',
            name: 'Bufio包'
          },
          {
            id: 'package-builtin',
            name: 'Builtin包'
          },
          {
            id: 'package-bytes',
            name: 'Bytes包'
          },
          {
            id: 'package-compress',
            name: 'Compress包'
          },
          {
            id: 'package-container',
            name: 'Container包'
          },
          {
            id: 'package-crypto',
            name: 'crypto包'
          },
          {
            id: 'package-database',
            name: 'Database包'
          },
          {
            id: 'package-encoding',
            name: 'Encoding包'
          },
          {
            id: 'package-flag',
            name: 'Flag包'
          },
          {
            id: 'package-hash',
            name: 'Hash包'
          },
          {
            id: 'package-html',
            name: 'Html包'
          },
          {
            id: 'package-image',
            name: 'Image包'
          },
          {
            id: 'package-index',
            name: 'Index包'
          },
          {
            id: 'package-io',
            name: 'IO包'
          },
          {
            id: 'package-net',
            name: 'Net包'
          },
          {
            id: 'package-path',
            name: 'Path包'
          },
          {
            id: 'package-regexp',
            name: 'Regexp包'
          },
          {
            id: 'package-runtime',
            name: 'Runtime包'
          },
          {
            id: 'package-sort',
            name: 'Sort包'
          },
          {
            id: 'package-strconv',
            name: 'Strconv包'
          },
          {
            id: 'package-strings',
            name: 'Strings包'
          },
          {
            id: 'package-sync',
            name: 'Sync包'
          },
          {
            id: 'package-text',
            name: 'Text包'
          }

        ]
      },
      {

        id: 'third_packages',
        name: 'Golang第三方常用包',
        open: false,
        pages: [{
            id: 'third-toml',
            name: 'toml文件格式golang包'
          },
          {
            id: 'third-ini',
            name: 'ini文件格式golang包'
          },
          {
            id: 'third-gorm',
            name: 'go数据库框架gorm'
          },
          {
            id: 'third-excelize',
            name: 'go Excel操作包'
          },
          {
            id: 'third-qrcode',
            name: 'go 二维码编码包'
          }

        ]

      },
      {
        id: 'practices',
        name: 'Golang Gin实践',
        open: false,
        pages: [{
            id: 'gin-01',
            name: '连载一 Golang介绍与环境安装'
          },
          {
            id: 'gin-02',
            name: '连载二 搭建Blog API\'s（一）'
          },
          {
            id: 'gin-03',
            name: '连载三 搭建Blog API\'s（二）'
          },
          {
            id: 'gin-04',
            name: '连载四 搭建Blog API\'s（三）'
          },
          {
            id: 'gin-05',
            name: '连载五 使用JWT进行身份校验'
          },
          {
            id: 'gin-06',
            name: '连载六 编写一个简单的文件日志'
          },
          {
            id: 'gin-07',
            name: '连载七 Golang优雅重启HTTP服务'
          },
          {
            id: 'gin-08',
            name: '连载八 为它加上Swagger'
          },
          {
            id: 'gin-09',
            name: '连载九 将Golang应用部署到Docker'
          },
          {
            id: 'gin-10',
            name: '连载十 定制 GORM Callbacks'
          },
          {
            id: 'gin-11',
            name: '连载十一 Cron定时任务'
          },
          {
            id: 'gin-12',
            name: '连载十二 优化配置结构及实现图片上传'
          },
          {
            id: 'gin-13',
            name: '连载十三 优化你的应用结构和实现Redis缓存'
          },
          {
            id: 'gin-14',
            name: '连载十四 实现导出、导入 Excel'
          },
          {
            id: 'gin-15',
            name: '连载十五 生成二维码、合并海报'
          },
          {
            id: 'gin-16',
            name: '连载十六 在图片上绘制文字'
          },
          {
            id: 'gin-17',
            name: '连载十七 用 Nginx 部署 Go 应用'
          },
          {
            id: 'gin-18',
            name: '番外 Golang交叉编译'
          },
          {
            id: 'gin-19',
            name: '番外 请入门 Makefile'
          }
        ]
      },


    ]
  },
  kindToggle: function(e) {
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
  jump: function(options) {
    // console.log(options.currentTarget.dataset.pageid)
    wx.navigateTo({
      url: '../common/common?title=' + options.currentTarget.dataset.pageid,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   //this.uploadArticle(this.data.list[8].pages)

  },

  uploadArticle: function(pages) {
    const bid = "3024ecb1-114e-45d8-bede-33ea5925573c"
    console.log(pages.length)
    // 从列表中读取name，和id，存储到临时列表中
    // 插入到数据库，返回_id
    // 根据_id,从files文件夹中读取文件并上传到云存储。名称为返回的_id 
    for (let j = 0; j < pages.length; j++) {
      console.log(bid, pages[j].id, pages[j].name)
      setTimeout(this.upload1, 1000, pages[j].id, pages[j].name, bid)
    }
    clearTimeout()
     
  },
  upload1:function(aid,aname,bid){
    db.collection('articles').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        aid: aid,
        aname: aname,
        bid: bid
      }
    })
      .then(res => {
        console.log(res)
       
      })
      .catch(console.error)

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})