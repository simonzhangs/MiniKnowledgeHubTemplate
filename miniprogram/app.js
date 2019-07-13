//app.js

App({
  onLaunch: function () {
    console.log('App Launch')
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env: 'visit-prod-d4ca13',
        env: 'visit-3c98f4',
        traceUser: true,
      })
    }

    this.globalData = {}
  },


  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
  
    TagsList: ["golang","java","javascript","dart","python","ruby","csharp"]
  }
});