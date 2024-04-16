// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
exports.main = async (event, context) => {
  // 数据库结构，openid，title，浏览数量num，标签，创建时间，文件名（对应云存储），状态（是否显示）
  // 上传的参数，文件名，文件简介，标签，title
  var openid = event.openid
  var tag = event.tag
  var title = event.title
  var fileid = event.fileid
  var desc = event.desc
  var stars = parseInt(event.stars)
  // 查看该记录是否存在，title 唯一

  try {
    const res1 = await db.collection('artList').where({
        openid: openid,
        title: title,
      })
      .field({
        _id: true,
        fileid: true,
      }).get()

    if (res1.data.length != 0) {
      // 删除原文件，然后更新信息。
      console.log(res1.data)
      const fileIDs = [res1.data[0].fileid]
      const dfResp = await cloud.deleteFile({
        fileList: fileIDs,
      })
      console.log(dfResp.fileList)
      db.collection('artList').doc(res1.data[0]._id).update({
        // data 传入需要局部更新的数据
        data: {
          desc: desc,
          fileid: fileid,
          tag: tag,
          stars: stars,
          createTime: db.serverDate()
        },
        success: function (res) {
          console.log(res.data)
        }
      })

    } else {
      const res2 = await db.collection('artList').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          openid: openid,
          title: title,
          desc: desc,
          num: 0,
          tag: tag,
          stars: stars,
          fileid: fileid,
          status: true,
          createTime: db.serverDate()
        }
      })

      console.log(res2._id)

    }
    return 'ok'

  } catch (e) {
    console.log(e)
    return 'fail'
  }

}
