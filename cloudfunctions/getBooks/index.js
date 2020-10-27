// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'visit-prod-d4ca13'
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
  const {
    OPENID,
    APPID,
    UNIONID,
    ENV,
  } = cloud.getWXContext()
  const skip = event.skip
  var bcount = await db.collection('books')
    .where(_.or([{
      status: 99
    },
    {
      openid: OPENID
    }
    ]))
    .count()

  
  var bookList = await db.collection('books')
    .where(_.or([{
        status: 99
      },
      {
        openid: OPENID
      }
    ]))
    .skip(skip) // 跳过结果集中的前 10 条，从第 11 条开始返回
    .limit(10) // 限制返回数量为 10 条
    .orderBy('weight', 'desc')
    .get()

  return {
    bcount:bcount,
    openid: OPENID,
    bookList: bookList,
  }
}