
const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateJWT,
        fieldValidator,
        hasRole
} = require('../middlewares');

// Controller
const { getProduct,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct
} = require('../controllers/product');

// Helpers
const { existProductById, existCategoryById } = require('../helpers/db-validators');


const router = Router();

// Obtener todos los productos
router.get('/', getProduct);

// Obtener producto por id
router.get('/:id', [
    check('id', 'No es ID valido').isMongoId(),
    check('id').custom( existProductById ),
    fieldValidator
], getProductById);

// Crear producto ( privado - cualquier persona con token valido )
router.post('/', [ 
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es ID valido').isMongoId(),
    check('category').custom( existCategoryById ),
    fieldValidator
], createProduct );

// Actualizar producto 
router.put('/:id', [
    validateJWT,
    check('id', 'No es ID valido').isMongoId(),
    check('id').custom( existProductById ),
    fieldValidator
], updateProduct);

// Borrar un producto
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existProductById ),
    fieldValidator
], deleteProduct);



module.exports = router;