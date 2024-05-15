// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  // 获取openid，作为记录搜索记录使用
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  // 搜索获取内容
  var keyword = event.keyword
  var result = {}
  if (keyword !== "") {
    // 当搜索不为空时，记录搜索内容
    await db.collection('searchHis').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openid: openid,
        keyword: keyword,
        createTime: db.serverDate()
      }
    })
    result = await db.collection('homeList')
      .field({
        title: true,
        desc: true,
        guid:true,
        views:true,
      })
      .where(
        _.and([{
            status: 1,
          },
          _.or([{
              title: db.RegExp({
                regexp: keyword,
                options: 'i',
              })
            },
            {
              desc: db.RegExp({
                regexp: keyword,
                options: 'i',
              })
            }

          ])

        ])
      )
      .orderBy('createTime', 'desc')
      .limit(20)
      .get()
  } else {
    result = await db.collection('homeList')
      .field({
        title: true,
        desc: true,
        guid:true,
        views:true,
      })
      .where({
        status: 1,
      })
      .orderBy('createTime', 'desc')
      .limit(20)
      .get()
      
  }

  return result

}