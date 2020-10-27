// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = wx.cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // 获取集合中的内容

  const result = await db.collection('artList').where({
    status: true,
  }).get()

  return result

}