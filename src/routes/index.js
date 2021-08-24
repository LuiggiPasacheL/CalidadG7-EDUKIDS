const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index');
});

router.get('/avatar',(req,res)=>{
    res.render('layouts/avatar');
});



module.exports = router;
