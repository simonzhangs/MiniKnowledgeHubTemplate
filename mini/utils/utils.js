const md5util = require("./md5");
// 正式环境
const baseUrl = "https://mp.91demo.top/mp3";
const sharekey = "20!I@LOVE#CHINA$24";


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
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
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
// 获取秒时间戳
function getSecTs() {
  return Math.floor(Date.now() / 1000);
}

// 获取当前时间字符串
function getNowStr() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 获取昨天的毫秒时间戳
function getYestMsTime() {
  return new Date().getTime() - 24 * 60 * 60 * 1000;
}

function decodeBase64(data) {
  let decode = atob(data);
  return decodeURIComponent(decode);
}

function getVCode() {
  const now = getSecTs();
  const str = sharekey + now + "Eagle";
  const md5str = md5util.md5(str);
  const vcode = now + md5str;
  return vcode;
}

function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  var len = Math.max(v1.length, v2.length)
  while (v1.length < len) {
    v1.push('0')
  }

  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

const getUrl = (url) => {
  // let baseUrl = getBaseUrl();
  if (url.indexOf("://") == -1) {
    url = baseUrl + url;
  }
  return url;
};



const http = ({
  url = "",
  param = {},
  ...other
} = {}) => {
  // wx.showLoading({
  //   title: "网络请求中..",
  // });
  let timeStart = Date.now();
  let cookie = wx.getStorageSync("sessionKey");
  let vcode = getVCode();
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      data: param,
      header: {
        "content-type": "application/json", // 默认值
        Cookie: cookie,
        "icode": vcode,
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

function uploadImage(url, file, param = {}) {
  let timeStart = Date.now();
  let cookie = wx.getStorageSync("sessionKey");
  let vcode = getVCode();

  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: getUrl(url),
      filePath: file,
      name: 'file',
      formData: param,
      header: {
        Cookie: cookie,
        "icode": vcode,
      },
      timeout: 10000,
      complete: (res) => {
        // wx.hideLoading();
        console.log(`耗时${Date.now() - timeStart}`);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res);
        } else {
          reject(res);
        }
      },
    })
  });

}

function downloadImage(url, filepath) {
  let timeStart = Date.now();
  let cookie = wx.getStorageSync("sessionKey");
  let vcode = getVCode();
  let myurl = baseUrl + url + '/' + filepath;
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: myurl,
      header: {
        Cookie: cookie,
        "icode": vcode,
      },
      complete(res) {
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
}



// 以逗号分割，先替换中文逗号
function str2arr(str) {
  let str1 = str.replaceAll("，", ",");
  return str1.split(',');
}


// 获取x分钟后时间戳
function getXMinTimeStamp(x) {
  var date = new Date();
  var min = date.getMinutes();
  date.setMinutes(min + x);
  var timestamp = date.getTime();
  return Math.floor(timestamp / 1000);
}


// 获取x秒后时间戳
function getXSecTimeStamp(x) {
  const now = Math.floor(Date.now() / 1000);
  return now + x;
}

// 获取与当前时间戳的差值
function diffNowTs(t) {
  const now = getSecTs();
  return t - now;
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
  getSecTs: getSecTs,
  compareVersion,
  getNowStr,
  uploadImage,
  downloadImage,
  str2arr,
  getXMinTimeStamp,
  getXSecTimeStamp,
  diffNowTs,

}