// app.js
const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Configurar EJS
app.set('view engine', 'ejs');

// Middleware para archivos estáticos
app.use(express.static('public'));

// Middleware para manejar sesiones
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Middleware para parsear cuerpos de solicitudes POST
app.use(express.urlencoded({ extended: true }));

// Importar y usar rutas
const indexRoutes = require('./routes/index');
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/product');

app.use('/', indexRoutes);
app.use('/', cartRoutes);
app.use('/', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
