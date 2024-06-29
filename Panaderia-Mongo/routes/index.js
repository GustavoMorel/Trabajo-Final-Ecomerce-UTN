const express = require('express');
const router = express.Router();
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login');
    }
    next();
};

router.get('/', (req, res) => {
    res.redirect('/auth/login');
});

router.get('/page/login', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/auth/login');
        }
        res.render('login', { user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.redirect('/auth/login');
    }
});

module.exports = router;
