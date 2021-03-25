
const { Router } = require('express');

const { getUser, 
        putUser, 
        postUser, 
        patchUser,
        deleteUser
} = require('../controllers/user');

const router = Router();

router.get( '/', getUser);

// Usualmente para crear recursos
router.post( '/', postUser);

// Usualmente para actualizar recursos
router.put( '/:id', putUser);

// Actualizacion parcial de datos
router.patch( '/', patchUser);

router.delete( '/', deleteUser);


module.exports = router;