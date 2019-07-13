// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'visit-prod-d4ca13'
})

const db = cloud.database()
exports.main = async(event, context) => {
  const {
    OPENID,
    APPID,
    UNIONID,
    ENV,
  } = cloud.getWXContext()
  var resid = ''
  var bid = event.bid
  var tag = event.tag
  var aname = event.title
  var acontent = event.content
  var timestamp = new Date().getTime()
  var aid = 'wx' + timestamp
  await db.collection('articles').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      aid: aid,
      aname: aname,
      bid: bid,
      _openid: OPENID
    }
  }).then(res => {
    console.log(res)
    resid = res._id
  }).catch(err => {
    console.log(err)
    return false
  })
  const fileStream = Buffer.from(acontent)
  await cloud.uploadFile({
    cloudPath: tag + '/' + resid + '.md',
    fileContent: fileStream,
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
    return false
  })

  return true

}