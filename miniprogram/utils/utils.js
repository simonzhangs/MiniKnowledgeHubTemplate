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
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

module.exports = {
  formatTime: formatTime,
  isEmpty: isEmpty,
  formatDate: formatDate,
  formatDateShort: formatDateShort,
  guid:guid,
}