const express = require('express');
const router = express.Router();

router.get('/partes_cuerpo',(req,res)=>{
    res.render('videos/partes_cuerpo');
});

module.exports = router;
