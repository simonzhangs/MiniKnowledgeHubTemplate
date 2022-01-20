// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})


// 云函数入口函数
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
    const getdata = await db.collection('detailList')
        .where({
            num: _.gt(0),
            status:1,
        })
        .field({
            _id:true,
            guid: true,
            views: true,
            lastNum:true,
            
        })
        .orderBy('views', 'desc')
        .get()
    console.log(getdata.data.length)
    for (let i = 0; i < getdata.data.length; i++) {
        let objrec = getdata.data[i]
        if (objrec.views - objrec.lastNum >= 10) {
            let star = objrec.views / 10
            await db.collection('homeList').where(
                {
                    status:1,
                    guid:objrec.guid
                }
            ).update({
                    data: {
                        stars: parseInt(star),
                    }
                })

                await db.collection('detailList').doc(objrec._id).update({
                    data:{
                        lastNum:objrec.views,
                    }
                })
        }
    }

    return 'ok'

}