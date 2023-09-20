const express = require('express');
const router = express.Router();

const userRoutes = require('./users/userRoute');
const productRoutes = require('./products/productRoute');

router.use('/user',userRoutes);
router.use('/product',productRoutes);

module.exports = router;