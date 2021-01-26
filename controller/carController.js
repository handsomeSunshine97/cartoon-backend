const connection = require('../model/sqlConfig.js')
const fs = require('fs')

const carController = {}

carController.getCartoonPage = (request, response) => {
    response.render('cartoonPage.html')
}

carController.getCartoonInfo = async (request, response) => {
    let { page, limit, keyword, selectStatus } = request.query
    let where = 'where 1'
    keyword && (where += ' and t1.title like "%' + keyword + '%"')
    selectStatus && (where += ' and t1.status=' + selectStatus)
    let sqlCount = `select count(*) as count from cartoon;`
    let limitStart = (page - 1) * limit
    let sql = `select t1.*,t2.name from cartoon t1 left join categorytable t2 on t1.tagID=t2.cateId ${where} order by ID desc limit ${limitStart},${limit}`
    let p1 = connection.querySingle(sqlCount)
    let p2 = connection.querySingle(sql)
    let result = await Promise.all([p1, p2])
    response.json({
        "code": 0,
        "msg": "",
        "count": result[0][0].count,
        "data": result[1]
    })
}

carController.getCartoonAddPage = (request, response) => {
    response.render('cartoonAddPage.html')
}

carController.postCartoonAdd = async (request, response) => {
    let { title, author, cover, cartoonURl, tagID, status, publishTime, content } = request.body
    if (publishTime) {
        var sql = `insert into cartoon(title,cartoonURl,cover,author,content,status,tagID,publishTime)
                    values(?,?,?,?,?,?,?,?)`
        var bind = [title, cartoonURl, cover, author, content, status, tagID, publishTime]
    } else {
        var sql = `insert into cartoon(title,cartoonURl,cover,author,content,status,tagID)
        values(?,?,?,?,?,?,?)`
        var bind = [title, cartoonURl, cover, author, content, status, tagID]
    }
    let result = await connection.insertInto(sql, bind)
    if (result.affectedRows) {
        return response.json({ statusCode: 0 })
    }
    response.json({ statusCode: 1001 })
}

carController.uploadCover = async (request, response) => {
    let { originalname, filename, destination } = request.file
    let suffIndex = originalname.lastIndexOf('.') // 后缀下标
    let suffixes = originalname.slice(suffIndex)  // 获取.jpg
    let oldPath = destination + filename
    let newPath = destination + filename + suffixes
    await fs.rename(oldPath, newPath, error => {
        if (error) throw error
    })
    response.json({ src: newPath })
}

carController.postDelCartoon = async (request, response) => {
    let { ID } = request.body
    let sql = `delete from cartoon where ID=${ID}`
    let result = await connection.querySingle(sql)
    if (result.affectedRows) {
        return response.json({ statusCode: 0 })
    }
    return response.json({ statusCode: 1001 })
}

carController.getcartoonEditPage = (request, repsonse) => {
    repsonse.render('cartoonEditPage.html')
}

carController.getCartoonEcho = async (request, response) => {
    let { data_id } = request.query
    let sql = `select * from cartoon where ID = ${data_id}`
    let result = await connection.querySingle(sql)
    result.length ? response.json({ statusCode: 0, data: result }) : response.render('cartoonPage.html')
}

carController.postCartoon_update = async (request, response) => {
    let { ID, title, author, cartoonURl, cover, tagID, status, content } = request.body
    let sql1 = `select cover from cartoon where ID=${ID}`
    let sql2 = `update cartoon set title='${title}',author='${author}',cartoonURl='${cartoonURl}',cover='${cover}',tagID=${tagID},status=${status},content='${content}',lastUpdateTime=now() where ID=${ID};`
    let p1 = connection.querySingle(sql1)
    let p2 = connection.querySingle(sql2)
    let [lodCover, result] = await Promise.all([p1, p2])
    if (lodCover[0].cover !== cover) {
        fs.unlink('./' + lodCover[0].cover, (err) => {
            if (err) throw err;
        })
    }
    result.affectedRows && response.json({ statusCode: 0 })
}

carController.modifyStatus = async (request, response) => {
    let { ID, status } = request.query
    let sql = `update cartoon set status=${status} where ID=${ID}`
    let result = await connection.querySingle(sql)
    if (result.affectedRows) {
        return response.json({ statusCode: 0 })
    }
    return response.json({ statusCode: 10001 })
}

carController.queryCartoonCounts = async (request, response) => {
    let sql = ` select count(*) as counts,t2.cateId,t2.name from cartoon t1 left join categorytable t2 on t1.tagID=t2.cateId group by t2.cateId;`
    let result = await connection.querySingle(sql)
    response.json(result)
}
module.exports = carController