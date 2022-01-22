// 云函数入口文件
const cloud = require('wx-server-sdk')
const utils = require('./utils.js')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
// status 1，待审核 2，审核通过 3，审核不通过 4，已处理
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 1，处理上传的文章
  const getdata = await db.collection('postArticle')
    .where({
      status: 2
    })
    .field({
      _id:true,
      title: true,
      desc: true,
      content: true,
      url: true,
      lang: true,
      openid:true,
    })
    .orderBy('createTime', 'asc')
    .get()

  console.log(getdata.data.length)
  for (let i = 0; i < getdata.data.length; i++) {
    let objrec = getdata.data[i]
    let guid = utils.guid()
    await db.collection('homeList').add({
      data: {
        guid: guid,
        title: objrec.title,
        desc: objrec.desc,
        openid:objrec.openid,
        status: 1,
        stars:0,
        createTime: db.serverDate(),
      },
    });
    await db.collection('detailList').add({
      data: {
        guid: guid,
        title: objrec.title,
        content: objrec.content,
        url:objrec.url,
        lang:objrec.lang,
        views:0,
        lastNum:0,
        status: 1,
        createTime: db.serverDate(),
        updateTime: db.serverDate(),
      },
    });
    await db.collection('postArticle').doc(objrec._id)
        .update({
          data: {
            status:4,
            updateTime:db.serverDate()
          }
        })
  }


  return 'ok'
}