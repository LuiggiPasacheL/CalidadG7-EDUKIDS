const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/partes_cuerpo',(req,res)=>{
    res.render('videos/partes_cuerpo');
});

module.exports = router;