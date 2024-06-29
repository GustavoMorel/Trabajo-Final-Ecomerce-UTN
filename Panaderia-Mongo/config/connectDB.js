const mongoose = require('mongoose');


const connectDB = async ()=>{
    try{
        const conection = await mongoose.connect('mongodb://localhost:27017/panaderiaMongo') ///panderiaMongo - nombre de la BD
        console.log('Se conectó la base de datos de Mongo')
    }
    catch(error){
        console.log(error)
    }
}

module.exports=connectDB