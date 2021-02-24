const express = require('express')
const app = express()
const router = express.Router()
const connection = require('../model/sqlConfig.js')

router.get('/categoryTable',async (request,response)=>{
    let sql = 'select * from categorytable'
    let result = await connection.querySingle(sql)
    response.json(result)
})

router.get('/cartoon',async (request,response)=>{
    let {page,pageSize} = request.query
    let offset = (page - 1) * pageSize
    let sql = `select t1.*,t2.name from cartoon t1 left join categorytable t2 on t1.tagID = t2.cateId where status=0 order by ID desc limit ${offset},${pageSize};`
    let result = await connection.querySingle(sql)
    response.json(result)
})
router.get('/categoryCartoon',async (request,response)=>{
    let {page,pageSize,tagID} = request.query
    let offset = (page - 1) * pageSize
    let sql = `select t1.*,t2.name from cartoon t1 left join categorytable t2 on t1.tagID = t2.cateId where status=0 and tagID=${tagID} order by ID desc limit ${offset},${pageSize};`
    let result = await connection.querySingle(sql)
    response.json(result)
})
router.get('/getCartoon',async (request,response)=>{
    let {id} = request.query
   
    let sql = `select t1.*,t2.name from cartoon t1 left join categorytable t2 on t1.tagID = t2.cateId where ID =${id}`
    let result = await connection.querySingle(sql)
    response.json(result)
})
module.exports = router