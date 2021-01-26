const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const listController = require('../controller/listController.js')
const carController = require('../controller/carController.js')
const userController = require('../controller/userController.js')

router.get(/^\/$|^\/admin$|^\/index$/, (request, response) => {
    response.render('index.html')
})

router.get('/cartoonList', listController.cartoonList)

router.get('/queryCategory', listController.queryCategory)

router.post('/deleteCategory', listController.deleteCategory)

router.get('/cartoonAdd', listController.getCartoonAdd)

router.post('/cartoonAdd', listController.postCartoonAdd)

router.get('/editPage', listController.getEditPage)

router.post('/querySingle', listController.postQuerySingle)

router.post('/editName', listController.postEditName)


router.get('/cartoonPage', carController.getCartoonPage)

router.get('/cartoonInfo', carController.getCartoonInfo)

router.get('/cartoonAddPage', carController.getCartoonAddPage)

router.post('/cartoon_Add', carController.postCartoonAdd)

router.post('/uploadCover', upload.single('file'), carController.uploadCover)

router.post('/delCartoon', carController.postDelCartoon)

router.get('/cartoonEdit', carController.getcartoonEditPage)

router.get('/cartoonEcho', carController.getCartoonEcho)

router.post('/cartoon_update', carController.postCartoon_update)

router.get('/modifyStatus', carController.modifyStatus)

router.get('/queryCartoonCounts', carController.queryCartoonCounts)

router.get('/login', userController.getLoginPage)

router.post('/loginCheck', userController.postLoginCheck)
module.exports = router
