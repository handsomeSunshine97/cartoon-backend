const connection = require("../model/sqlConfig")

let userController = {}

userController.getLoginPage = (request, response) => {
    if (request.session.userInfo) {
        return response.render('index.html')
    }
    response.render('login.html')
}

userController.postLoginCheck = async (request, response) => {
    let { username, password } = request.body
    let sql = `select * from users where username='${username}' and password='${password}'`
    let result = await connection.querySingle(sql)
    if (result.length) {
        let userInfo = result[0]
        request.session.userInfo = userInfo
        return response.json({ statusCode: 0})
    }
    return response.json({ statusCode: 1001 })
}


module.exports = userController