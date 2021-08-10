
const express = require('express');
const router = express.Router();

router.get('/instrucciones',(req,res)=>{
    res.render('juegos/preguntas/instruccion_pregunta');
});

router.get('/generalidades',(req,res)=>{
    res.render('juegos/preguntas/pregunta');
});

module.exports = router;
