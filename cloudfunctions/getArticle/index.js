// 云函数入口文件
const cloud = require('wx-server-sdk')
const Towxml = require('towxml')
const cloudDir = "cloud://visit-prod-d4ca13.7669-visit-prod-d4ca13/articles/"

cloud.init({
  env: 'visit-prod-d4ca13'
})
const towxml = new Towxml();
// 云函数入口函数
// articleName
// 
exports.main = async(event, context) => {
  const fileID = cloudDir + event.articleName
  const res = await cloud.downloadFile({
    fileID,
  })
  const buffer = res.fileContent
  //Markdown转towxml数据
  const data = towxml.toJson(buffer.toString('utf8'), 'markdown');
  return data
}