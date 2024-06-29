const express = require('express');
const app = express();
const connectDB = require('./config/connectDB');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');


const session = require('express-session');

const authRoutes = require('./routes/auth');

const initializeDatabase = require('./init');




//Configurar el middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));//Valida lo que viene del body
app.use(express.json());

//Rutas
app.use('/productos', productsRouter);
//localhost:3050/productos/shop
app.use('/admin', adminRouter);

//Rutas Get
app.get('/', (req, res) => {
    res.render('page/home')
})
app.get('/about', (req, res) => {
    res.render('page/about')
})
app.get('/contact', (req, res) => {
    res.render('page/contact')
})


/* Session */
// Configurar express-session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

/*Login y Register*/

app.get('/register', (req, res) => {
    res.render('page/register')
})

app.get('/login', (req, res) => {
    res.render('page/login')
})

//**esto es prueba */
// Importar y usar rutas
const indexRoutes = require('./routes/index');
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/product');

app.use('/', indexRoutes);
app.use('/', cartRoutes);
app.use('/', productRoutes);

//** hasta aca */


//Función para iniciar la conexión
const iniciar = async () => {
    try {
        // Inicializar la base de datos
        await initializeDatabase();
        // Conectar a MongoDB
        await connectDB('mongodb://localhost:27017/panaderiaMongo');
        console.log('Conectado a MongoDB');
        // Rutas
        app.use('/auth', authRoutes);
        app.use('/', indexRoutes);


        //await connectDB('mongodb://localhost:27017')
    }
    catch (err) {
        console.error('Error inicializando la aplicación:', err);
    }
}
iniciar();

//Definir puerto
const port = 3050; //configurar puerto
app.listen(port, () => {
    console.log(`App escuchando en http://localhost:${port}`);
})