
const express = require('express');
const router = express.Router();

router.get('/:operacion/:i', (req, res, next) => {
    res.render('juegos/operaciones/' + req.params.operacion + '/' + req.params.operacion + req.params.i + '/' + req.params.operacion + '.hbs');
});

module.exports = router;