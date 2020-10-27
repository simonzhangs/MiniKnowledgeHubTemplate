// example/book/book.js
const db = wx.cloud.database()
let bid = ''
let skip = 0
let search = ''
let acount = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articlesList: [],
    tag:''
  },
  searchArticle(e) {
    let key = e.detail.value.toLowerCase();
    search = key
    let a = {
      skip: 0,
      bid: bid,
      search: search,
    }
    this.getArticles(a)
    this.getArticlesCount(a)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 根据传过来的参数获取章节列表
    bid = options.bid
    this.setData({
      tag:options.tag
    })
    console.log(bid,skip,acount,this.data.tag)

    let a = {
      skip: 0,
      bid: bid,
      search: '',
    }
    this.getArticles(a)
    this.getArticlesCount(a)
    this.updateBookWeight(bid)
  },
  updateBookWeight:function(bid){
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'updateBookWeight',
      // 传递给云函数的event参数
      data: {
        bid: bid,
      }
    }).then(res => {
     console.log(res)
    }).catch(err => {
     console.log(err)
    })
  },
  next:function(){
    console.log(skip)
    skip = skip + 10
    if (skip > acount){
      wx.showToast({
        title: '没有数据了！',
      })
      return
    }
    let a = {
      skip: skip,
      bid: bid,
      search: search,
    }
    this.getArticles(a)
  },
  getArticlesCount:function(e){
    var that = this
    // 查询记录总数
    db.collection('articles').where({
      bid: e.bid,
      aname: db.RegExp({
        regexp: e.search,
        options: 'i',
      })
    }).count().then(res => {
      console.log(res.total)
      acount = res.total
    })
  },
  getArticles: function(e) {
    var that = this
    const skip = e.skip
   
    // 查询章节
    db.collection('articles')
      .where({
        bid: e.bid,
        aname: db.RegExp({
          regexp: e.search,
          options: 'i',
        })
      })
      .skip(skip) // 跳过结果集中的前 10 条，从第 11 条开始返回
      .limit(10) // 限制返回数量为 10 条
      .get()
      .then(res => {
        console.log(res.data)
        that.setData({
          articlesList:res.data
        })

      })
      .catch(err => {
        console.error(err)
      })
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
    skip = 0
    acount = 0

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