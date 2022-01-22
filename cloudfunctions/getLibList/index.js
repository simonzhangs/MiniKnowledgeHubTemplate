// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
const MAX_LIMIT = 50
// 云函数入口函数
exports.main = async (event, context) => {
  const countResult = await db.collection('homeList').count()
  const total = countResult.total
  const pages = Math.ceil(total / MAX_LIMIT)
  // 获取openid，作为记录搜索记录使用
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  // 搜索获取内容
  var keyword = event.keyword
  const pageNo = event.pageNo
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
        guid: true,
        stars: true,
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
      .skip((pageNo-1) * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get()

  } else {
    result = await db.collection('homeList')
      .field({
        title: true,
        desc: true,
        guid: true,
        stars: true,
      })
      .where({
        status: 1,
      })
      .orderBy('createTime', 'desc')
      .skip(pageNo * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get()

  }

  return {
    "list": result.data,
    "pages": pages,
  }
}