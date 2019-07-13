// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const fs = require('fs')
const path = require('path')
var request = require("request")
// 云函数入口函数
exports.main = async (event, context) => {
  request('https://www.baidu.com', function (error, response, body) {
    console.log(body)//打印百度首页html内容
  })
  
}