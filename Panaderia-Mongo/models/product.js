const mongoose = require('mongoose'); //paquete que realiza la conexion con MongoDb

//----* variable para el modelo
const productos = new mongoose.Schema({
        nombre: String,
        descripcion: String,
        precio: Number,
        imagen: String
})

//--------------------------------collection   * variable
const Productos = mongoose.model('Productos', productos)


module.exports = Productos