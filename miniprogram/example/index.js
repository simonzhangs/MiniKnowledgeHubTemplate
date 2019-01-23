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
                    { id: 'go-imports', name: '导入' },
                    { id: 'exported-names', name: '导出名' },
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
                id: 'control',
                name: '流程控制语句',
                open: false,
                pages: [
                    { id: 'go-for', name: 'for' },
                    { id: 'for-continued', name: 'for（续）' },
                    { id: 'for-is-gos-while', name: 'for是Go中的“while”' },
                    { id: 'forever', name: '无限循环' },
                    { id: 'go-if', name: 'if' },
                    { id: 'if-with-a-short-statement', name: 'if的简短语句' },
                    { id: 'if-and-else', name: 'if和else' },
                    { id: 'go-switch', name: 'switch' },
                    { id: 'switch-evaluation-order', name: 'switch的求值顺序' },
                    { id: 'switch-with-no-condition', name: '没有条件的switch' },
                    { id: 'go-defer', name: 'defer' },
                    { id: 'defer-multi', name: 'defer栈' }
                ]
            },
            {
                id: 'struct',
                name: '结构体、切片和映射',
                open: false,
                pages: [
                    { id: 'pointers', name: '指针' },
                    { id: 'structs', name: '结构体' },
                    { id: 'struct-fields', name: '结构体字段' },
                    { id: 'struct-pointers', name: '结构体指针' },
                    { id: 'struct-literals', name: '结构体文法' },
                    { id: 'go-array', name: '数组' },
                    { id: 'slices', name: '切片' },
                    { id: 'slices-pointers', name: '切片就像数组的引用' },
                    { id: 'slice-literals', name: '切片文法' },
                    { id: 'slice-bounds', name: '切片的默认行为' },
                    { id: 'slice-len-cap', name: '切片的长度与容量' },
                    { id: 'nil-slices', name: 'nil切片' },
                    { id: 'making-slices', name: '用make创建切片' },
                    { id: 'slices-of-slice', name: '切片的切片' },
                    { id: 'append', name: '向切片追加元素' },
                    { id: 'range', name: 'Range' },
                    { id: 'range-continued', name: 'range（续）' },
                    { id: 'go-maps', name: '映射' },
                    { id: 'map-literals', name: '映射文法' },
                    { id: 'map-literals-continued', name: '映射文法（续）' },
                    { id: 'mutating-maps', name: '修改映射' },
                    { id: 'function-values', name: '函数值' },
                    { id: 'function-closures', name: '函数的闭包' }


                ]
            },
            {
                id: 'method',
                name: '方法和接口',
                open: false,
                pages: [
                    { id: 'methods', name: '方法' },
                    { id: 'methods-funcs', name: '方法即函数' },
                    { id: 'methods-continued', name: '方法（续）' },
                    { id: 'methods-pointers', name: '指针接收者' },
                    { id: 'methods-pointers-explained', name: '指针与函数' },
                    { id: 'indirection', name: '方法与指针重定向' },
                    { id: 'indirection-values', name: '方法与指针重定向（续）' },
                    { id: 'methods-with-pointer-receivers', name: '选择值或指针作为接收者' },
                    { id: 'interfaces', name: '接口' },
                    { id: 'interfaces-are-satisfied-implicitly', name: '接口与隐式实现' },
                    { id: 'interface-values', name: '接口值' },
                    { id: 'interface-values-with-nil', name: '底层值为nil的接口值' },
                    { id: 'nil-interface-values', name: 'nil接口值' },
                    { id: 'empty-interface', name: '空接口' },
                    { id: 'type-assertions', name: '类型断言' },
                    { id: 'type-switches', name: '类型选择' },
                    { id: 'stringer', name: 'Stringer' },
                    { id: 'errors', name: '错误' },
                    { id: 'reader', name: 'Reader' },
                    { id: 'go-images', name: '图像' }
                ]
            },
            {
                id: 'concurrent',
                name: '并发',
                open: false,
                pages: [
                    { id: 'goroutines', name: 'Go程' },
                    { id: 'channels', name: '信道' },
                    { id: 'buffered-channels', name: '带缓存的信道' },
                    { id: 'range-and-close', name: 'range和close' },
                    { id: 'select', name: 'select语句' },
                    { id: 'default-selection', name: '默认选择' },
                    { id: 'mutex-counter', name: 'sync.Mutex' },
                    { id: 'exercise-web-crawler', name: 'Web爬虫' }
                ]
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