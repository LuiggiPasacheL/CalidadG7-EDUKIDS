
const express = require('express');
const router = express.Router();

router.get('/:operacion/:i', (req, res) => {
    res.render('juegos/operaciones/' + req.params.operacion + '/' + req.params.operacion + req.params.i + '/' + req.params.operacion + '.hbs');
});

router.get('/:operacion/:i/ganador', (req, res) =>{
    res.render('juegos/operaciones/' + req.params.operacion + '/' + req.params.operacion + req.params.i + '/' + 'Ganador.hbs');
})

router.get('/instrucciones', (req,res)=>{
    res.render('juegos/operaciones/instruccion_operaciones');
});

module.exports = router;
