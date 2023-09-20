let express = require('express');
let router = express.Router();
let productCntrl = require('./productCntrl')
let auth = require('../auth')

router
    .post('/getList', auth, productCntrl.productList)
    .post('/create', auth, productCntrl.create)
    .delete('/delete/:id', auth, productCntrl.deleteProduct)
    .put('/update/:id', auth, productCntrl.updateProduct)


module.exports = router;