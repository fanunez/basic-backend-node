
const { Router } = require('express');
// Middlewares


// Controllers
const { search } = require('../controllers/search');

const router = Router();


router.get('/:collection/:term', search);



module.exports = router;