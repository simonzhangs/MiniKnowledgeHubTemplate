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
  // 获取12条记录，根据实际情况测试，获取12条记录就可以了。
  if (keyword !== "") {
    // 当搜索不为空时，记录搜索内容
    await db.collection('searchHis').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openid: openid,
        keyword: keyword,
        createTime:db.serverDate()
      }
    })
    result = await db.collection('artList')
      .field({
        title: true,
        tag: true,
        num: true,
        fileid: true,
      })
      .where(
        _.and([{
            status: true,
          },
          _.or([{
              title: db.RegExp({
                regexp: keyword,
                options: 'i',
              })
            },
            {
              tag: keyword
            }

          ])

        ])


      )
      .orderBy('createTime', 'desc')
      .orderBy('num', 'desc')
      .limit(12)
      .get()
  } else {
    result = await db.collection('artList')
      .field({
        title: true,
        tag: true,
        num: true,
        fileid: true,
      })
      .where({
        status: true,
      })
      .orderBy('createTime', 'desc')
      .orderBy('num', 'desc')
      .limit(12)
      .get()
  }

  return result

}