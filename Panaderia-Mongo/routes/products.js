const express = require('express');
const router = express.Router();
const {obtenerTodosLosProductos, carrito_vacio, carritoDeCompra, ir_purchase} = require('../controllers/product');


router.route('/shop').get(obtenerTodosLosProductos)

//Carrito de compra
router.route('/carrito_vacio').get(carrito_vacio)
router.route('/carrito/:id').get(carritoDeCompra)

//purchase
router.route('/purchase').get(ir_purchase)
module.exports=router