const express = require('express')
const router = express.Router()
const listController = require('../controller/listController.js')
const carController = require('../controller/carController.js')


router.get(/^\/$|^\/admin$|^\/index$/, (request, response) => {
    response.render('index.html')
})

router.get('/cartoonList', listController.cartoonList)

router.get('/queryCategory', listController.queryCategory)

router.post('/deleteCategory', listController.deleteCategory)

router.get('/cartoonAdd',listController.getCartoonAdd)

router.post('/cartoonAdd',listController.postCartoonAdd)

router.get('/editPage',listController.getEditPage)

router.post('/querySingle',listController.postQuerySingle)

router.post('/editName',listController.postEditName)

router.get('/cartoonPage',carController.getCartoonPage)

router.get('/cartoonInfo',carController.getCartoonInfo)

router.get('/cartoonAddPage',carController.getCartoonAddPage)

router.post('/cartoon_Add',carController.postCartoonAdd)
module.exports = router
