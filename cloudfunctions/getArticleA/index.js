// 云函数入口文件
const cloud = require('wx-server-sdk')
const Towxml = require('towxml')
const cloudDir = "cloud://visit-3c98f4.7669-visit-3c98f4/"

cloud.init({
  env: 'visit-3c98f4'
})
const towxml = new Towxml();
// 云函数入口函数
// articleName
// 
exports.main = async (event, context) => {
  const articleName = event.articleName
  const tag = event.tag
  const fileID = cloudDir +tag+'/'+articleName
  const res = await cloud.downloadFile({
    fileID,
  })
  const buffer = res.fileContent
  //Markdown转towxml数据
  const data = towxml.toJson(buffer.toString('utf8'), 'markdown');
  return data
}