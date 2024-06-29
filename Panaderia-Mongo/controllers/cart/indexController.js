// controllers/indexController.js
const products = require('../products');

exports.getIndex = (req, res) => {
    // Si la sesión no tiene productos, inicializarla con productos por defecto
    if (!req.session.products) {
        req.session.products = products;
    }
    res.render('index', { products: req.session.products });
};
