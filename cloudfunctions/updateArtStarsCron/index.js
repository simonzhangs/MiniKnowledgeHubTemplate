// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})


// 云函数入口函数
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
    const getdata = await db.collection('artList')
        .where({
            num: _.gt(0)
        })
        .field({
            _id: true,
            num: true,
            lastnum: true,
        })
        .orderBy('num', 'desc')
        .get()
    console.log(getdata.data.length)
    for (let i = 0; i < getdata.data.length; i++) {
        let objrec = getdata.data[i]
        let lastnum = 0
        if (objrec.hasOwnProperty(lastnum)) {
            lastnum = objrec.lastnum
        }

        if (objrec.num - lastnum >= 10) {
            let star = objrec.num / 10
            await db.collection('artList').doc(objrec._id)
                .update({
                    data: {
                        stars: parseInt(star),
                        lastnum: objrec.num
                    }
                })
        }
    }

    return 'ok'

}