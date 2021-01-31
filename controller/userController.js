const connection = require("../model/sqlConfig")
const fs = require('fs')
let userController = {}
userController.getLoginPage = (request, response) => {
    if (request.session.userInfo) {
        return response.render('index.html')
    }
    response.render('login.html')
}

userController.postLoginCheck = async (request, response) => {
    let { username, password } = request.body
    let sql = `select * from users where username='${username}' and password=md5('${password }')`
    let result = await connection.querySingle(sql)
    if (result.length) {
        let userInfo = result[0]
        request.session.userInfo = userInfo
        return response.json({ statusCode: 0 })
    }
    return response.json({ statusCode: 1001 })
}

userController.getLoginOut = (request, response) => {
    request.session.destroy((error) => {
        if (error) throw error
        response.json({ statusCode: 0 })
    })
}
// 
userController.getUserInfo = async (request, response) => {
    let { userID } = request.session.userInfo
    let sql = `select * from users where userID=${userID}`
    let result = await connection.querySingle(sql)
    let { username, avatar, name, Signature: signature } = result[0]
    response.json({
        username, avatar, name, signature
    })
}

userController.postAvatarUpload = async (request, response) => {

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

userController.postEditUserInfo = async (request, response) => {
    let { newPassword, signature, avatar, name } = request.body
    let { userID } = request.session.userInfo
    let set = `avatar='${avatar}',`
    newPassword && (set += `password=md5('${newPassword}'),`)
    signature && (set += `Signature='${signature}',`)
    name && (set += `name='${name}',`)
    set = set.substr(0, set.length - 1)
    let sql = `update users set ${set} where userID=${userID}`
    let result = await connection.querySingle(sql)
    if (result.affectedRows) {
        response.json({ statusCode: 0 })
    }
}
module.exports = userController