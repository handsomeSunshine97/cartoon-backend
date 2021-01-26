const { request } = require('express')
const connection = require('../model/sqlConfig.js')

let listController = {}

listController.cartoonList = (request, response) => {
    response.render('categoryPage.html')
}

listController.queryCategory = async (request, response) => {
    let result = await connection.queryCategoryAll()
    response.json(result)
}

listController.deleteCategory = async (request, response) => {
    let { cateId } = request.body
    let result = await connection.deleteCategory(cateId)
    if (result.affectedRows) {
        response.render('index.html')
    }
}

listController.getCartoonAdd = (request, response) => {
    response.render('addPage.html')
}

listController.postCartoonAdd = async (request, response) => {
    let { name } = request.body
    let result = await connection.insert(name)
    if (result.affectedRows) {
        response.json({ statusCode: 0 })
    } else {
        response.json({ statusCode: 1001 })
    }
}

listController.getEditPage = (request, response) => {
    response.render('editPage.html')
}

listController.postQuerySingle = async (request, response) => {
    let { data_id } = request.body
    let sql = `select * from categoryTable where cateId=${data_id}`
    let result = await connection.querySingle(sql)
    if (result.length) {
        response.json(result[0])
    }
}

listController.postEditName = async (request, response) => {
    let { name, data_id } = request.body
    let sql = `update categoryTable set name='${name}' where cateId=${data_id}`
    let result = await connection.querySingle(sql)
    if (result.affectedRows) {
        response.json({ statusCode: 0 })
    }
}



module.exports = listController