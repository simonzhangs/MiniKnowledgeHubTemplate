// example/addbook/addbook.js
const app = getApp()
const utils = require('../../utils/utils.js')
const imageType = "png,jpeg,jpg,gif"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    imgList: [],
    TagsList: app.globalData.TagsList,
    resultMessage: '',
    disabled:false
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        this.setData({
          imgList: res.tempFilePaths
        })
      }
    });
  },
  formReset() {
    this.setData({
      index: 0,
      imgList: [],
      disabled:false
    })

  },
  formSubmit(e) {
    var that = this
    
    wx.showLoading({
      title: '提交中...',
    })
    var logo = ''
    var cloudpath = ''
    var filepath = ''
    if (utils.isEmpty(e.detail.value.title)) {
      wx.showToast({
        title: '未输入标题！',
      })
      return
    }
    if (utils.isEmpty(that.data.imgList)) {
      wx.showToast({
        title: '请选择Logo！',
      })
      return
    }
    filepath = that.data.imgList[0]
    // 确认图片大小尺寸,图片格式
    wx.getImageInfo({
      src: filepath,
      success(res) {
        var imgtype = res.type
        
        if (imageType.indexOf(imgtype) == -1) {
          wx.showToast({
            title: '图片格式不支持',
          })
          return
        }
        if (res.width > 256 && res.height > 256) {
          wx.showToast({
            title: '图片尺寸太大',
          })
          return
        }
        that.setData({
          disabled: true
        })
        cloudpath = 'logo/' + utils.formatDate(new Date()) + '.' + imgtype
        // 上传图片
        wx.cloud.uploadFile({
          cloudPath: cloudpath,
          filePath: filepath,
          success: res => {
            var fileid = res.fileID
            wx.cloud.callFunction({
              name: 'addBook',
              data: {
                title: e.detail.value.title,
                logo: fileid,
                tag: that.data.TagsList[that.data.index]
              }
            }).then(res => {
              console.log(res)
              wx.hideLoading()
              that.setData({
                resultMessage: '提交成功'
              })
            }).catch(err => {
              console.log(err)
              wx.hideLoading()
              that.setData({
                resultMessage: '入库失败，错误原因为：' + err
              })
            })
          },
          fail: err => {
            console.log(err)
            wx.hideLoading()
            that.setData({
              resultMessage: 'Logo上传失败，错误原因为：' + err
            })
          },
        })

      }
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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