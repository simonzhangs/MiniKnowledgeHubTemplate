// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  
  const id = event.id 
  try {
    return await db.collection('artList').where({
      _id: id
    })
      .update({
        data: {
          num: _.inc(1)
        },
      })
  } catch (e) {
    console.error(e)
  }
}