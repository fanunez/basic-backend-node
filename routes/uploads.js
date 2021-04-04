
const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { fieldValidator, validateFile } = require('../middlewares');

// Controllers
const { fileManager, updateImage, showImage } = require('../controllers/uploads');

// Helpers
const { collectionAllowed } = require('../helpers');


const router = Router();

// crear nuevo recurso
router.post( '/', validateFile,fileManager );

router.put('/:collection/:id', [
    validateFile,
    check('id', 'No es ID valido').isMongoId(),
    check('collection').custom( c => collectionAllowed( c, ['users', 'products']) ),
    fieldValidator
], updateImage);


router.get('/:collection/:id', [
    check('id', 'No es ID valido').isMongoId(),
    check('collection').custom( c => collectionAllowed( c, ['users', 'products']) ),
    fieldValidator
], showImage);


module.exports = router;