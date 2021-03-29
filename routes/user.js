// Importaciones Node
const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { fieldValidator,
        validateJWT,
        isAdminRole,
        hasRole
} = require('../middlewares');

// Helpers
const { roleValidator,
        emailValidator,
        existUserById 
} = require('../helpers/db-validators');

const { getUser, 
        putUser, 
        postUser,
        deleteUser
} = require('../controllers/user');

// Modelos
const Role = require('../models/role');

const router = Router();


// Traer recursos paginados
router.get( '/', getUser);

// Actualizar recursos
router.put( '/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existUserById ),
        check('role').custom( roleValidator ),
        fieldValidator
], putUser);

// Crear recursos
router.post( '/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña debe tener más de 6 carácteres').isLength({ min: 6 }),
        check('email', 'El correo no es válido').isEmail(),
        check('email').custom( emailValidator ),
        // check('role', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( roleValidator ),
        fieldValidator
], postUser);

// Eliminar un usuario ( no se recomienda eliminar fisicamente debido a la integridad referencial, esto es: Si el usuario a modificado cosas dentro de la aplicacion )
router.delete( '/:id', [
        validateJWT,
        // isAdminRole,
        hasRole('ADMIN_ROLE'), // tantos roles como el endpoint necesite 
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existUserById ),
        fieldValidator
], deleteUser);


module.exports = router;