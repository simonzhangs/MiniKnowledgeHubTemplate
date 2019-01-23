// example/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [{
                id: 'intro',
                name: '包、变量和函数',
                open: false,
                pages: [
                    { id: 'packages', name: '包' },
                    { id: 'imports', name: '导入' },
                    { id: 'exported-namse', name: '导出名' },
                    { id: 'functions', name: '函数' },
                    { id: 'functions-continued', name: '函数（续）' },
                    { id: 'multiple-results', name: '多值返回' },
                    { id: 'named-results', name: '命名返回值' },
                    { id: 'variables', name: '变量' },
                    { id: 'variables-with-initializers', name: '变量初始化' },
                    { id: 'short-variable-declarations', name: '短变量声明' },
                    { id: 'basic-types', name: '基本类型' },
                    { id: 'zeros', name: '零值' },
                    { id: 'type-conversions', name: '类型转换' },
                    { id: 'type-inference', name: '类型推导' },
                    { id: 'constants', name: '常量' },
                    { id: 'numeric-constants', name: '数值常量' }
                ]

            },
            {
                id: 'widget',
                name: '流程控制语句',
                open: false,
                pages: ['article', 'badge', 'flex', 'footer', 'gallery', 'grid', 'icons', 'loadmore', 'panel', 'preview', 'progress']
            },
            {
                id: 'feedback',
                name: '结构体、切片和映射',
                open: false,
                pages: ['actionsheet', 'dialog', 'msg', 'picker', 'toast']
            },
            {
                id: 'nav',
                name: '方法和接口',
                open: false,
                pages: ['navbar', 'tabbar']
            },
            {
                id: 'search',
                name: '并发',
                open: false,
                pages: ['searchbar']
            }
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