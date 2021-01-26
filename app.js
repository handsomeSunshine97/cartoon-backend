const express = require('express')
const app = express()
const artTemplate = require('art-template')
const express_artTemplate = require('express-art-template')
const session = require('express-session')
const router = require('./router/router.js')
// 开放静态资源
app.use('/layui', express.static('./public/layui'))
app.use('/public', express.static('./public'))
app.use('/uploads', express.static('./uploads'))

// request.body 中间件
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// art-template 三件套
app.set('views', __dirname + '/views')
app.engine('html', express_artTemplate)
app.set('view engine', 'html')

let options = {
    name: "SESSIONID", // 待会写入到cookie中标识
    secret: "yaojunguangshigedashuaige", // 用来加密会话，防止篡改。
    cookie: {
        httpOnly: true,
        secure: false, // false-http(默认), true-https
        rolling: true,
        maxAge: 60000 * 24, // session在cookies存活24分钟，
        // 再次访问，时间重置为24分钟， 24分钟内只要不访问则会失效
    }
};

app.use(session(options))
//防止翻墙
app.use(function (request, response, next) {
    let path = request.path
    let arr = ['/login', '/loginCheck','/loginOut']
    if (arr.includes(path)) {
        next();
    } else {
        if (request.session.userInfo) {
            next()
        } else {
            response.redirect('/login')
        }
    }
})


// 路由中间件
app.use(router)



app.listen(6898, _ => console.log('running...'))