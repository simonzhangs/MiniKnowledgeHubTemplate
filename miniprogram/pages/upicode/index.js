const app = getApp();
import {
  isEmpty,
  uploadImage,
  downloadImage,
  str2arr
} from "../../utils/utils";

// pages/upicode/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc: '',
    location: '',
    samples: ['https://mp.91demo.top/static/images/icode.webp'],
    files: [],
    dgImg: '',
    info: '显示调试信息',
  },
  chooseImage() {
    const that = this;
    wx.chooseMedia({
      sizeType: ['original'],
      sourceType: ['album',],
      mediaType: ['image'],
      count: 1,
      success(res) {
        // 检查第一张图片大小
        var tempFiles = res.tempFiles;
        var tempFileSize = tempFiles[0].size;
        if (tempFileSize <= 2048000) {
          let myfiles = [];
          myfiles.push(tempFiles[0].tempFilePath);
          console.log(myfiles);
          that.setData({
            files: myfiles,
          });
        } else {
          wx.showToast({
            title: '图片超过2M',
          })
        }
      },
    });
  },

  bindLocation(e) {
    const that = this;
    let obj = e.detail.value
    console.log(obj)
    that.setData({
      location: obj
    })
  },

  bindDesc(e) {
    const that = this;
    let obj = e.detail.value
    console.log(obj)
    that.setData({
      desc: obj
    })
  },

  previewImage(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files, // 需要预览的图片http链接列表
    });
  },

  previewSamplesImage() {
    const that = this;
    wx.previewImage({
      urls: that.data.samples, // 需要预览的图片http链接列表
    });
  },

  previewDebugImage() {
    const that = this;
    if (isEmpty(that.data.dgImg)) {
      return
    }
    wx.previewImage({
      urls: [that.data.dgImg], // 需要预览的图片http链接列表
    });
  },

  uploadCardTmpl() {
    // 提交模板
    // 申请推送订阅
    const that = this;
    if (isEmpty(that.data.desc)) {
      wx.showToast({
        title: '描述为空',
      })
      return
    }
    if (isEmpty(that.data.files)) {
      wx.showToast({
        title: '图片为空',
      })
      return
    }
    if (isEmpty(that.data.location)) {
      wx.showToast({
        title: '位置为空',
      })
      return
    }

    var arr = str2arr(that.data.location)
    console.log(arr)
    if (arr.length != 4) {
      wx.showToast({
        title: '位置格式错误',
      })
      return
    }

    const curpoints = app.getPoints();
    if (curpoints < 1) {
      wx.showToast({
        title: '点数不足',
      })
      return
    }

    wx.getSetting({
      withSubscriptions: true,
      success(res) {
        console.log(res.subscriptionsSetting)
        if (!isEmpty(res.subscriptionsSetting.DJrFZAlByd5L1xVLS8193hqxafgI6gj7I7n2Pprqs5k) && res.subscriptionsSetting.DJrFZAlByd5L1xVLS8193hqxafgI6gj7I7n2Pprqs5k !== "accept") {
          wx.showToast({
            title: '请打开订阅通知',
          })
        } else {
          wx.requestSubscribeMessage({
            tmplIds: ['DJrFZAlByd5L1xVLS8193hqxafgI6gj7I7n2Pprqs5k'],
            success(res) {
              console.log('sub,', res)
              if (res.DJrFZAlByd5L1xVLS8193hqxafgI6gj7I7n2Pprqs5k == "accept") {
                var arr = str2arr(that.data.location)
                var f = that.data.files[0]
                var desc = that.data.desc
                console.log(arr, f, desc)
                that.submitCardTmpl(f, arr, desc)
              } else {
                wx.showToast({
                  title: '请接受订阅通知',
                })
              }
            }
          })
        }
      }
    })

  },

  submitCardTmpl(file, arr, desc) {
    wx.showLoading({
      title: '上传卡片模板',
    })
    uploadImage('/upCardTmpl', file, {
      'x': arr[0],
      'y': arr[1],
      'width': arr[2],
      'height': arr[3],
      'desc': desc,
    }).then((res) => {
      wx.hideLoading();
      console.log(res);
      const result = JSON.parse(res.data);
      if (result.code == 1) {
        app.costPoints();
        wx.showToast({
          title: '提交成功',
        })
      } else {
        wx.showToast({
          title: result.msg,
        })
      }
    }).catch((err) => {
      console.log(err);
      wx.hideLoading()
      wx.showToast({
        title: '网络异常请重试',
      })
    })
  },

  async debugCardTmpl() {
    const that = this;
    if (isEmpty(that.data.desc)) {
      wx.showToast({
        title: '描述为空',
      })
      return
    }
    if (isEmpty(that.data.files)) {
      wx.showToast({
        title: '图片为空',
      })
      return
    }
    if (isEmpty(that.data.location)) {
      wx.showToast({
        title: '位置为空',
      })
      return
    }

    var arr = str2arr(that.data.location)

    if (arr.length != 4) {
      wx.showToast({
        title: '位置格式错误',
      })
      return
    }
    console.log('debug,', that.data.desc, that.data.location)
    const curpoints = app.getPoints();
    if (curpoints < 1) {
      wx.showToast({
        title: '点数不足',
      })
      return
    }

    wx.showLoading({
      title: '调试卡片模板',
    })

    const upResult = await uploadImage('/dgCardTmpl', that.data.files[0], {
      'x': arr[0],
      'y': arr[1],
      'width': arr[2],
      'height': arr[3],
    });

    console.log(upResult);
    const result = JSON.parse(upResult.data);
    if (result.code == 1) {
      app.costPoints();
      let rspdata = result.data;
      console.log(rspdata)
      var info = "底图宽高:" + rspdata.bgW + "," + rspdata.bgH + "\n" + "二维码宽高:" + rspdata.qrW + "," + rspdata.qrH + "\n" + "位置边长:" + rspdata.side;
      const dgfiles = await downloadImage('/files', rspdata.url)
      that.setData({
        dgImg: dgfiles.tempFilePath,
        info: info,
      })
      wx.hideLoading();
    } else {
      wx.hideLoading();
      wx.showToast({
        title: '点数不足',
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})