const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const session = require('express-session');

//configuración de sesion
router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

//Ruta Get de login
router.get('/login', (req, res) => {
    console.log('Estoy renderizando Login');
    res.render('page/login');
    console.log('Rendericé Login');
});

//Ruta Post de login
router.post('/login', async (req, res) => {
    //console.log(username);
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    //VERIFICA USUARIO Y CONTRASEÑA
    if (user && await bcrypt.compare(password, user.password)) {
        console.log(username);
        req.session.userId = user._id;
        return res.redirect('/admin/read');
        console.log(user.username);
    }
    console.log('No login');
    res.redirect('/auth/login');
   
});


//Ruta Get de Register
router.get('/register', (req, res) => {
    console.log('Entrando a Registrar');
    res.render('page/register');
    console.log('Rendericé Register');
});


//Ruta Post de Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Tratando de registrar');
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);
        // Crear un nuevo usuario
        const newUser = new User({ username, email, password });

        // Guardar el usuario en la base de datos
        await newUser.save();

         //res.status(201).send('Usuario registrado exitosamente');
        
           
            res.render('page/exito_register');
    } catch (err) {
        if (err.code === 11000) {
            // Error de duplicado de clave
            res.status(400).send('El usuario o el correo ya están registrados');
        } else {
            res.status(500).send('Error al registrar el usuario');
        }

    }
});


//Ruta Get de Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;