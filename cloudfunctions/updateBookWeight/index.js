// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'visit-prod-d4ca13'
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const bid = event.bid
  try {
    return await db.collection('books').where({
      _id: bid
    })
      .update({
        data: {
          weight: _.inc(1)
        },
      })
  } catch (e) {
    console.error(e)
  }
}