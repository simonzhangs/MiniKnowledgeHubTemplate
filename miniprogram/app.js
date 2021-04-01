//app.js
require('./libs/Mixins.js');

const themeListeners = [];

App({

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
       
        env: 'visit-prod-d4ca13',
         //env: 'visit-3c98f4',
        traceUser: true,
      })
    }

  },

  // 引入`towxml3.0`解析方法
  towxml: require('/towxml/index'),



  globalData: {
    theme: 'light', // dark
  },
  themeChanged(theme) {
    this.globalData.theme = theme;
    themeListeners.forEach((listener) => {
      listener(theme);
    });
  },
  watchThemeChange(listener) {
    if (themeListeners.indexOf(listener) < 0) {
      themeListeners.push(listener);
    }
  },
  unWatchThemeChange(listener) {
    const index = themeListeners.indexOf(listener);
    if (index > -1) {
      themeListeners.splice(index, 1);
    }
  },
});