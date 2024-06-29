// routes/cart.js
const express = require('express');
const router = express.Router();
products = [];
router.post('/add-to-cart', (req, res) => {
    const { productId } = req.body;
    const product = req.session.products.find(p => p.id == productId);

    if (!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push(product);
    res.redirect('/cart');
});

router.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    res.render('carrito', { cart });
});

router.post('/purchase', (req, res) => {
   
    res.render('purchase');
});

router.get('/purchase', (req, res) => {
   
    res.render('purchase');
});

module.exports = router;
