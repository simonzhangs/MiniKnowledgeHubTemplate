//app.js
require('./libs/Mixins.js');

const themeListeners = [];
App({
  // 引入`towxml3.0`解析方法
	towxml:require('/towxml/index'),
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        //env: 'visit-prod-d4ca13',
        env: 'visit-3c98f4',
        traceUser: true,
      })
    }

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
  globalData: {
    TagsList: ["demo", "java", "c", "c++", "basic", "php", "csharp", "javascript",
      "dart", "python", "ruby", "perl", "golang", "assembly language", "dephi", "swift", "object-c", "r", "matlab", "sql", "d", "cobol"
    ],
    OPENID: '',
    theme: 'light', // dark
  }
});