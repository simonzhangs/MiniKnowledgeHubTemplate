// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'visit-prod-d4ca13'
})

const db = cloud.database()
// 云函数入口函数
// title,logo,tag,
// 
exports.main = async (event, context) => {
  const { ENV, OPENID, APPID } = cloud.getWXContext()
  const title = event.title
  const logo = event.logo
  const tag = event.tag
 // data 字段表示需新增的 JSON 数据
      // weight 代表权重，用于排序
  try {
    return await db.collection('books').add({
     
      data: {
        openid:OPENID,
        title:title,
        tag:tag,
        logo:logo,
        status:1,
        weight:0,
        createtime: db.serverDate()
      }
    })
  } catch (e) {
    console.error(e)
  }
}