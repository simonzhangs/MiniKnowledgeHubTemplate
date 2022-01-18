// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 数据库结构，openid，title，desc，lang，url，content，status，createTime
  // 上传的参数，title,desc,lang,url,content
  // 1 上传成功 2 重复提交 3 提交失败
  const openid = wxContext.OPENID
  const title = event.title
  const desc = event.desc
  const lang = event.lang
  const url = event.url
  const content = event.content
  const q1 = await db.collection('postArticle').where({
    openid: openid,
    title: title,
  })
  .field({
    _id: true,
  }).get()
  if (q1.data.length != 0) {
    return 2
  }

  const res = await db.collection('postArticle').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      openid: openid,
      title: title,
      desc: desc,
      lang: lang,
      url: url,
      content: content,
      status: 1,
      createTime: db.serverDate()
    },
  })

  console.log(res)
  
  return 1
}