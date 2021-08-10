
const express = require('express');
const router = express.Router();


router.get('/instrucciones',(req,res)=>{
    res.render('juegos/rompecabezas/instruccion_rompecabezas');
});

router.get('/catalogo',(req,res,next)=>{
    res.render('juegos/rompecabezas/catalogo');
});


router.get('/leon', (req, res, next) =>{
    res.render('juegos/rompecabezas/elsa1');
});

router.get('/elefante', (req, res, next) =>{
    res.render('juegos/rompecabezas/elsa2');
});

router.get('pikachu', (req, res, next) =>{
    res.render('juegos/rompecabezas/pikachu');
});


router.get('/elsa1',(req,res)=>{
    res.render('juegos/rompecabezas/elsa1');
});

router.get('/elsa2',(req,res)=>{
    res.render('juegos/rompecabezas/elsa2');
});

router.get('/elsa3',(req,res)=>{
    res.render('juegos/rompecabezas/RC_1');
});

router.get('/pikachu',(req,res)=>{
    res.render('juegos/rompecabezas/pikachu');
});

router.get('/RC_1',(req,res)=>{
    res.render('juegos/rompecabezas/RC_1');
});

router.get('/RC_2',(req,res)=>{
    res.render('juegos/rompecabezas/RC_2');
});


module.exports = router;
