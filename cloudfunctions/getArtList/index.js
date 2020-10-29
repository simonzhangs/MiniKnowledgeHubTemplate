// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  // 获取集合中的内容
  // 搜索获取内容
  var keyword = event.keyword
  var result = {}
  // 获取前50项
  if (keyword !== "") {
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
      .limit(20)
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
      .limit(20)
      .get()
  }

  return result

}