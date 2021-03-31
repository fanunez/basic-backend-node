
const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { fieldValidator,
        validateJWT,
        hasRole
} = require('../middlewares');

// Controllers
const { getCategory,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory 
} = require('../controllers/category');

const { existCategoryById } = require('../helpers/db-validators');


const router = Router();

// Obtener todas las categorias ( publico )
router.get('/', getCategory );

// Obtener una categoria por id ( publico )
router.get('/:id', [
    check('id', 'No es ID valido').isMongoId(),
    check('id').custom( existCategoryById ),
    fieldValidator
], getCategoryById );

// Crear categoria ( privado - cualquier persona con token valido )
router.post('/', [ 
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    fieldValidator
], createCategory );

// Actualizar ( privado - cualquier persona con token valido )
router.put('/:id', [
    validateJWT,
    check('id', 'No es ID valido').isMongoId(),
    check('id').custom( existCategoryById ),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    fieldValidator
], updateCategory);

// Borrar una categoria
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existCategoryById ),
    fieldValidator
], deleteCategory );



module.exports = router;