
const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validator.js');
const { roleValidator,
        emailValidator,
        existUserById 
} = require('../helpers/db-validators');

const { getUser, 
        putUser, 
        postUser,
        deleteUser
} = require('../controllers/user');

const Role = require('../models/role');

const router = Router();



router.get( '/', getUser);

// Usualmente para actualizar recursos
router.put( '/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existUserById ),
        check('role').custom( roleValidator ),
        fieldValidator
], putUser);

// Usualmente para crear recursos
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
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existUserById ),
        fieldValidator
],deleteUser);


module.exports = router;