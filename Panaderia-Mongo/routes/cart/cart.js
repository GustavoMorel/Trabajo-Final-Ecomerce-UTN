// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add-to-cart', cartController.addToCart);
router.get('/cart', cartController.getCart);
router.post('/purchase', cartController.purchase);

module.exports = router;
