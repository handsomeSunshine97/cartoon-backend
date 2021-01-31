const mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'yjg161225',
    database: 'dm5'
});

connection.connect(_ => {
    console.log('connect database success.');
});
// 查询分类表所有filed
connection.queryCategoryAll = function () {
    let sql = 'select * from categoryTable'
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, rows) => {
            if (error) reject(error)
            resolve(rows)
        })
    })
}

connection.deleteCategory = function (id) {
    let sql = `delete from categoryTable where cateId=${id}`
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

connection.insert = function (param) {
    sql = `insert into categoryTable(name) values('${param}')`
    return new Promise((resolve, reject) => {
        connection.query(sql,(error,result)=>{
            if(error) reject(error)
            resolve(result)
        })
    })
}

connection.querySingle = function (sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql,(error,result)=>{
            if(error) reject(error)
            resolve(result)
        })
    })
}

connection.insertInto = function (sql,bind) {
    return new Promise((resolve, reject) => {
        connection.query(sql,bind,(error,result)=>{
            if(error) reject(error)
            resolve(result)
        })
    })
}

module.exports = connection