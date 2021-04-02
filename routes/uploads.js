
const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { fieldValidator } = require('../middlewares');

// Controllers
const { fileManager, updateImage } = require('../controllers/uploads');

// Helpers
const { collectionAllowed } = require('../helpers');


const router = Router();

// crear nuevo recurso
router.post( '/', fileManager );

router.put('/:collection/:id', [
    check('id', 'No es ID valido').isMongoId(),
    check('collection').custom( c => collectionAllowed( c, ['users', 'products']) ),
    fieldValidator
], updateImage);


module.exports = router;