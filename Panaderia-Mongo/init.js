const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const initializeDatabase = async () => {
    try {
        // Conectar a la base de datos temporalmente para verificar la colección
        await mongoose.connect('mongodb://localhost:27017/auth-app');

        // Verificar si la colección 'users' existe
        const collections = await mongoose.connection.db.listCollections({ name: 'users' }).toArray();
        if (collections.length === 0) {
            // Si no existe, creamos la colección y cargamos los datos iniciales
            console.log("La colección 'users' no existe. Creando y cargando datos iniciales...");

            const users = [
                { username: 'admin', password: await bcrypt.hash('admin123', 10) },
                { username: 'user1', password: await bcrypt.hash('user1234', 10) }
            ];

            await User.insertMany(users);
            console.log('Datos iniciales cargados.');
        } else {
            console.log("La colección 'users' ya existe.");
        }
    } catch (err) {
        console.error('Error inicializando la base de datos:', err);
    } finally {
        // Cerrar la conexión temporal
        mongoose.connection.close();
    }
};

module.exports = initializeDatabase;
