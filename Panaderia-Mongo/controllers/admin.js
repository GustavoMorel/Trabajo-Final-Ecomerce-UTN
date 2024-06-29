const Productos = require('../models/product');

const verProductos = async (req, res) => {
    //peticion o consulta
    const products = await Productos.find({});
    // res.status(200).json({products}) //muestra información en json puro
    res.render('page/read', { products: products });
    console.log('Va bien lectura mongo Admin');
}

//CREATE
const mostrarAgregarProducto = (req, res) => {
    console.log('Estamos mostrando la pagina de agregar')
    res.render('page/agregate')
};
console.log('Enviar Producto funcionando')


const enviarProducto = async (req, res) => {
    const nombreProducto = req.body.nombre_producto;
    const descripcionProducto = req.body.descripcion;
    const precioProducto = req.body.precio;

    console.log(nombreProducto)

    const agregateProduct = await Productos.insertMany({
        nombre: nombreProducto,
        descripcion: descripcionProducto,
        precio: precioProducto
    }
    )
    res.render('page/exito')
}

//Update
//Función Get
const productoActual = async (req, res) => {
    const idReq = { _id: req.params.id }
    let products = await Productos.findOne(idReq)
        .then(products => {
            res.render('page/update', { products: products })
            console.log('El resultado es: ', products)
        })

        .catch(error => {
            console.log(error)
        })


    res.render('page/update')
}

//Función Post
const editarProducto = async (req, res) => {
    console.log('Estamos Editando')
    const idReq = { _id: req.params.id }

    Productos.updateOne(idReq, {
        $set: {
        nombre: req.body.nombre_producto,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
    }
})

.then(respuesta => {
        console.log('Editando bien: ', respuesta)
        res.render('page/exito')
    })

    .catch(error => {
        console.log(error)
    })

}

//Delete
const eliminarProducto = async (req, res) => {
    console.log('Estamos Eliminando')
    const idReq = {_id: req.params.id}

    let resultado = await Productos.deleteOne(idReq)

    .then(respuesta => {
        console.log('Producto eliminado')
        res.render('page/exito')
    })
    .catch(error => {
        console.log(error)
    })
}

module.exports = {
    verProductos,
    mostrarAgregarProducto,
    enviarProducto,
    productoActual,
    editarProducto,
    eliminarProducto
}