// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数

const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  const guid = event.guid
  await db.collection('detailList').where({
      guid: guid
    })
    .update({
      data: {
        views: _.inc(1),
        updateTime:db.serverDate(),
      },
    })
  result = await db.collection('detailList')
    .field({
      title: true,
      content: true,
      url: true,
      lang: true,
      views: true,
      createTime:true,
    })
    .where({
      status: 1,
      guid: guid,
    })
    .get()
  return result

}