// pages/mkart/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		isLoading: true,					// 判断是否尚在加载中
		article: {}						// 内容数据
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const _ts = this;
		app.getText('https://www.vvadd.com/wxml_demo/demo.txt?v=2',res => {
			let obj = app.towxml(res.data,'markdown',{
				theme:'light',
				events:{
					tap:(e)=>{
						console.log('tap',e);
					}
				}
			});

			_ts.setData({
				article:obj,
				isLoading: false
			});
		});
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