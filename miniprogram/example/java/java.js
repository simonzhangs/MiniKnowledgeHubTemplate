// example/java/java.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: "intro",
        name: "Java简介",
        open: false,
        pages: [
          {
            id: "java_1-1",
            name: "Java发展史"
          },
          {
            id: "java_1-2",
            name: "Java开发环境配置"
          }
        ]
      },
      {
        id: "base",
        name: "Java基础",
        open: false,
        pages: [
          {
            id: "java_2-1",
            name: "Java基础数据类型"
          },
          {
            id: "java_2-2",
            name: "Java变量类型"
          },
          {
            id: "java_2-3",
            name: "Java修饰符"
          },
          {
            id: "java_2-4",
            name: "Java运算符"
          },
          {
            id: "java_2-5",
            name: "Java循环结构"
          },
          {
            id: "java_2-6",
            name: "Java条件语句"
          },
          {
            id: "java_2-7",
            name: "Java Number & Math类"
          },
          {
            id: "java_2-8",
            name: "Java Character类"
          },
          {
            id: "java_2-9",
            name: "Java String类"
          },
          {
            id: "java_2-10",
            name: "Java StringBuffer"
          },
          {
            id: "java_2-11",
            name: "Java数组"
          },
          {
            id: "java_2-12",
            name: "Java日期时间"
          },
          {
            id: "java_2-13",
            name: "Java正则表达式"
          },
          {
            id: "java_2-14",
            name: "Java对象和类"
          },
          {
            id: "java_2-15",
            name: "Java Stream、File、IO"
          },
          {
            id: "java_2-16",
            name: "Java异常处理"
          }
        ]
      },
      {
        id: "object",
        name: "Java面向对象",
        open: false,
        pages: [
          {
            id: "java_3-1",
            name: "Java继承"
          },
          {
            id: "java_3-2",
            name: "Java重载"
          },
          {
            id: "java_3-3",
            name: "Java多态"
          },
          {
            id: "java_3-4",
            name: "Java抽象类"
          },
          {
            id: "java_3-5",
            name: "Java封装"
          },
          {
            id: "java_3-6",
            name: "Java接口"
          },
          {
            id: "java_3-7",
            name: "Java包"
          }
        ]
      },
      {
        id: "advance",
        name: "Java高级编程",
        open: false,
        pages: [
          {
            id: "java_4-1",
            name: "Java数据结构"
          },
          {
            id: "java_4-2",
            name: "Java集合框架"
          },
          {
            id: "java_4-3",
            name: "Java泛型"
          },
          {
            id: "java_4-4",
            name: "Java序列化"
          },
          {
            id: "java_4-5",
            name: "Java网络编程"
          },
          {
            id: "java_4-6",
            name: "Java多线程编程"
          },
          {
            id: "java_4-7",
            name: "Java文档注释"
          },
          {
            id: "java_4-8",
            name: "Java实例"
          },
          {
            id: "java_4-9",
            name: "Java Mysql连接"
          },
          {
            id: "java_4-10",
            name: "Java8 新特性"
          },
          {
            id: "java_4-11",
            name: "Java9 新特性"
          }
        ]
      }
    ]
  },
  kindToggle: function(e) {
    var id = e.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
  },
  jump: function(options) {
    // console.log(options.currentTarget.dataset.pageid)
    wx.navigateTo({
      url: "../common/common?title=" + options.currentTarget.dataset.pageid
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   // this.uploadArticle(this.data.list[4].pages)
  },

  uploadArticle: function (pages) {
    const bid = "c28d0146-09f8-4c3b-aa57-8488073d1369"
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
  upload1: function (aid, aname, bid) {
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
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
