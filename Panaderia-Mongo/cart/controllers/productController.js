// controllers/productController.js

exports.getAddProduct = (req, res) => {
    res.render('add-product');
};

exports.postAddProduct = (req, res) => {
    const { name, price } = req.body;
    const newProduct = {
        id: req.session.products.length + 1,
        name,
        price: parseFloat(price)
    };
    req.session.products.push(newProduct);
    res.redirect('/');
};
