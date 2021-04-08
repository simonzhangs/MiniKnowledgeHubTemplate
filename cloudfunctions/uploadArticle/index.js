// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
exports.main = async(event, context) => {
  // 数据库结构，openid，title，浏览数量num，标签，创建时间，文件名（对应云存储），状态（是否显示）
  // 上传的参数，文件名，文件简介，标签，title
  var openid = event.openid
  var tag = event.tag
  var title = event.title
  var fileid = event.fileid 
  var desc = event.desc
  try{
    const result=await db.collection('artList').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openid: openid,
        title: title,
        desc:desc,
        num: 0,
        tag:tag,
        fileid:fileid,
        status:true,
        createTime:db.serverDate()
      }
    })
    return result

  }catch(e){
    console.error(e)
    
  }

}