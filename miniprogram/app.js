//app.js


App({
  towxml:require('/towxml/index'),
  getText: (url, callback) => {
		wx.request({
			url: url,
			header: {
				'content-type': 'application/json'
			},
			success: (res) => {
				if (typeof callback === 'function') {
					callback(res);
				};
			}
		});
	},
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
       
        env: 'visit-prod-d4ca13',
        // env: 'visit-3c98f4',
        traceUser: true,
      })
    }

  },
  
});