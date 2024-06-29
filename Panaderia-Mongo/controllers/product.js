const Productos = require('../models/product');



const obtenerTodosLosProductos = async (req, res) => {
    //peticion o consulta
    const products = await Productos.find({});
    // res.status(200).json({products}) //muestra información en json puro
    res.render('page/shop', { products: products });
    console.log('Va bien busqueda mongo');
}




//Funcion carrito de compra 
//solo carrito
const carrito_vacio = async (req, res) => {
    res.render('page/carrito_vacio');
};

const compra = [];
const carritoDeCompra = async (req, res) => {
    const idReq = { _id: req.params.id } //lo guarda en la ruta
    let products = await Productos.findOne(idReq)

        .then(product => {
            // Función para agregar elementos al arreglo
            compra.push(product);
            // Mostrar el arreglo actualizado en la consola
            console.log("Arreglo con elementos:", compra);

            res.render('page/carrito', { compra })
           
            compra.push(product);
            // Mostrar el arreglo actualizado en la consola
            console.log("Arreglo con elementos:", compra);
            // Verificar que el arreglo no esté vacío
            if (compra.length > 0) {
                // Acceder al último elemento del arreglo
                let ultimoElemento = compra[compra.length - 1];

                // Mostrar la propiedad 'nombre' del último elemento
                console.log("Nombre del último elemento:", ultimoElemento.nombre);
            } else {
                console.log("El arreglo está vacío");
            }
            /* function agregarCompra(product) {
                 compra.push(product);
                 console.log(`Elemento ${product} agregado. Arreglo actual:`, compra);
                 const nombre = product.nombre;
                 console.log('El producto es: ' + nombre);
             }
             agregarCompra(product);*/
        })
        .catch(error => {
            console.log(error)
        })
     
};

exports.purchase = (req, res) => {
    const cart = req.session.compra || [];
    req.session.compra = [];
    res.render('purchase', { compra });
};






const addToCart = (req, res) => {
    const { productId } = req.body;
    const product = req.session.products.find(p => p.id == productId);

    if (!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push(product);
    res.redirect('/cart');
};

const ir_purchase = (req, res) => {
    res.render('page/purchase');
};

module.exports = {
    obtenerTodosLosProductos,
    carrito_vacio,
    carritoDeCompra,
    ir_purchase
}