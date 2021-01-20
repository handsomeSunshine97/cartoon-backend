const express = require('express')
const router = express.Router()
const listController = require('../controller/listController.js')


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

module.exports = router
