//CRUD
const express = require('express');
const router = express.Router();

const {verProductos, mostrarAgregarProducto, enviarProducto, productoActual, editarProducto, eliminarProducto} = require('../controllers/admin')


//Ruta para ver los productos
router.route('/read').get(verProductos)

//Ruta para agg los productos 
router.route('/agregate').get(mostrarAgregarProducto)
router.route('/nuevoproducto').post(enviarProducto)

//Ruta para editar los productos
router.route('/editarproducto/:id').get(productoActual)
router.route('/enviarproducto/:id').post(editarProducto)

//Ruta para eliminar los productos
router.route('/delete/:id').post(eliminarProducto)

module.exports=router