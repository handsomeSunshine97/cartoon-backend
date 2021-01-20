const express = require('express')
const app = express()
const artTemplate = require('art-template')
const express_artTemplate = require('express-art-template')
const router = require('./router/router.js')

// 开放静态资源
app.use('/layui', express.static('./public/layui'))
app.use('/public', express.static('./public'))

// request.body 中间件
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// art-template 三件套
app.set('views', __dirname + '/views')
app.engine('html', express_artTemplate)
app.set('view engine', 'html')

// 路由中间件
app.use(router)

app.listen(6898, _ => console.log('running...'))