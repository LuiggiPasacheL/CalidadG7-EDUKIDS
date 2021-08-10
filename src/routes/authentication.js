const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const helpers = require('../lib/helpers');

//rutador para renderizar el formulario
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

//rutador para recibir los datos del usuario

router.post('/signup', passport.authenticate('local.signup', {
    //successRedirect: '/profile', // redirecionar a un archivo 'profile' si el logeo a sido correcto
    successRedirect: '/',
    failureRedirect: '/signup', //iwal pero solo carga de nuevo
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/',
    failureRedirect: '/signup', //iwal pero solo carga de nuevo
    failureFlash: true
}));

router.get('/edit-profile', (req, res, next) => {
    res.render('edit_profile');
});

router.post('/edit-profile', async (req, res, next) => {
    let user = req.body;
    console.log(user);
    if (user.password != user.passwordOld) {
        user.password = await helpers.encryptPassword(user.password);
    }
    await pool.query('UPDATE users SET username=? , password=?, name=?, surname=?, email=? WHERE id=?'
        , [user.username, user.password, user.name, user.surname, user.email, user.id]);
    res.redirect('/profile');
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;
