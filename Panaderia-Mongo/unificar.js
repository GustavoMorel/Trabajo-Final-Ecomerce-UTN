const connectDB = require('./config/connectDB');

const Productos = require('./models/product');

const jsonProduct = require('./datos.json');



const createProduct = async()=>{
    try{
        await connectDB('mongodb://localhost:27017')

        await Productos.create(jsonProduct); //datos
        console.log('Se agregaron los datos con exito')
    }
    catch{
        console.log(error)
    }
}


createProduct();