const connection = require('../model/sqlConfig.js')

const carController = {}

carController.getCartoonPage = (request, response) => {
    response.render('cartoonPage.html')
}

carController.getCartoonInfo = async (request, response) => {
    let { page, limit } = request.query
    let sqlCount = `select count(*) as count from cartoon;`
    let limitStart = (page - 1) * limit
    let sql = `select * from cartoon limit ${limitStart},${limit}`
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
module.exports = carController