// controllers/cartController.js

exports.addToCart = (req, res) => {
    const { productId } = req.body;
    const product = req.session.products.find(p => p.id == productId);

    if (!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push(product);
    res.redirect('/cart');
};

exports.getCart = (req, res) => {
    const cart = req.session.cart || [];
    res.render('carrito', { cart });
};

exports.purchase = (req, res) => {
    const cart = req.session.cart || [];
    req.session.cart = [];
    res.render('purchase', { cart });
};

