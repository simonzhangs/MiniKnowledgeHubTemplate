// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
// 先比较更新时间，再比较查找，每10个view换取一个星星
// 云函数入口函数
const db = cloud.database()
const _ = db.command
const StarsRatio = 10 // 10个浏览换一个小星星
const TimeStampDiff = 86400000// 时间戳的差值 24 * 60 * 60 * 1000
exports.main = async (event, context) => {
    let ts = new Date().getTime();
    let diff =  TimeStampDiff; // 差异时间戳  24 * 60 * 60 * 1000
    let yts = ts - diff;
    // 查询详情浏览数
    const getdata = await db.collection('detailList')
        .where({
            status: 1,
            uts:_.gt(yts),
        })
        .field({
            _id: true,
            guid: true,
            views: true,
            lastNum: true,
        })
        .orderBy('views', 'desc')
        .get()
    console.log('arr len',getdata.data.length)
    // 根据浏览数计算小星星，目前算法为10个浏览换一个小星星
    for (let i = 0; i < getdata.data.length; i++) {
        let objrec = getdata.data[i]
        if (objrec.views - objrec.lastNum >= StarsRatio) {
            console.log('有效记录')
            let star = objrec.views / StarsRatio
            await db.collection('homeList').where({
                status: 1,
                guid: objrec.guid
            }).update({
                data: {
                    stars: parseInt(star),
                }
            })

            await db.collection('detailList').doc(objrec._id).update({
                data: {
                    lastNum: objrec.views,
                    uts:ts,
                }
            })
        }
    }
    // 更新文章标识，小程序端根据该标识来展示文章是否新上传
    await db.collection('homeList').where({
        status: 1,
        flag:true,
        cts:_.lt(yts),
    }).update({
        data: {
            flag: false,
        }
    })

    return 'ok'

}