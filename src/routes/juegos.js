
const express = require('express');
const router = express.Router();

const pool = require('../database'); //cualquier modificacion a la base de datos con el pool

router.use('/preguntas', require('./preguntas.js'));
router.use('/rompecabezas', require('./rompecabezas.js'));

router.post('/correcto', async (req, res, next) => {
    if (req.user.exp < 100) {
        req.user.exp += 25;
    } else {
        req.user.exp = 0;
        req.user.lvl++;
    }
    await pool.query('UPDATE users SET exp = ?, lvl = ? WHERE id = ?  ', [req.user.exp, req.user.lvl, req.user.id]);
    res.redirect('/juegos/preguntas/generalidades');
})

router.post('/cambiarAvatar',async (req,res,next)=>{
    let img = req.body;
    console.log(img);
    await pool.query('UPDATE users SET img = ? WHERE id = ?',[img.img,img.id]);
    res.redirect('/juegos/cambiarAvatar');
})

module.exports = router;
