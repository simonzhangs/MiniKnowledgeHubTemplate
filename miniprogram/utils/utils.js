// 正式环境
const baseUrl = "https://mp1.91demo.top/mp3";


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day, hour, minute, second].map(formatNumber).join('')
}

const formatDateShort = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()


  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function isEmpty(obj) {
  if (!obj) {
    return true;
  }
  if (obj === '' || obj === "") {
    return true;
  }


  if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
    return true;
  }

  if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function formatDateStr(str) {
  const date = new Date(str)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')

}
// 获取毫秒时间戳
function getNowMsTime() {
  return new Date().getTime();
}
// 获取昨天的毫秒时间戳
function getYestMsTime() {
  return new Date().getTime() - 24 * 60 * 60 * 1000;
}

function decodeBase64(data) {
  let decode = atob(data);
  return decodeURIComponent(decode);
}


const http = ({
  url = "",
  param = {},
  ...other
} = {}) => {
  // wx.showLoading({
  //   title: "网络请求中..",
  // });
  let timeStart = Date.now();
  // let cookie = wx.getStorageSync("sessionKey");
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      data: param,
      header: {
        "content-type": "application/json", // 默认值
        // Cookie: cookie,
      },
      ...other,
      timeout: 3000,
      complete: (res) => {
        // wx.hideLoading();
        console.log(`耗时${Date.now() - timeStart}`);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res);
        } else {
          reject(res);
        }
      },
    });
  });
};

// get方法
function httpGet(url, param = {}) {
  return http({
    url,
    param,
  });
}
// post方法
function httpPost(url, param = {}) {
  return http({
    url,
    param,
    method: "post",
  });
}

module.exports = {
  formatTime: formatTime,
  isEmpty: isEmpty,
  formatDate: formatDate,
  formatDateShort: formatDateShort,
  guid: guid,
  formatDateStr: formatDateStr,
  getNowMsTime: getNowMsTime,
  getYestMsTime: getYestMsTime,
  decodeBase64: decodeBase64,
  httpPost: httpPost,
  httpGet: httpGet,
}