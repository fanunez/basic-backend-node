
const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { fieldValidator } = require('../middlewares');

// Controllers
const { fileManager } = require('../controllers/uploads');

const router = Router();

// crear nuevo recurso
router.post( '/', fileManager )



module.exports = router;