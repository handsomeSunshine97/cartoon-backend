const connection = require('../model/sqlConfig.js')

const carController = {}

carController.getCartoonPage = (request, response) => {
    response.render('cartoonPage.html')
}

carController.getCartoonInfo = async (request, response) => {
    let { page, limit } = request.query
    let sqlCount = `select count(*) as count from cartoon;`
    let limitStart = (page - 1) * limit
    let sql = `select * from cartoon order by ID desc limit ${limitStart},${limit}`
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
    let { title, author, cartoonURl, cover, tagID, status, publishTime, content } = request.body
    if (publishTime) {
        var sql = `insert into cartoon(title,cartoonURl,cover,author,content,status,tagID,publishTime)
                    values(?,?,?,?,?,?,?,?)`
        var bind = [title, author, cartoonURl, cover, tagID, status, publishTime, content]
    } else {
        var sql = `insert into cartoon(title,cartoonURl,cover,author,content,status,tagID)
        values(?,?,?,?,?,?,?)`
        var bind = [title, author, cartoonURl, cover, tagID, status, content]
    }
    let result = await connection.insertInto(sql, bind)
    if (result.affectedRows) {
        return response.json({ statusCode: 0 })
    }
    response.json({ statusCode: 1001 })
}
module.exports = carController