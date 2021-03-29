
const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignin } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();


router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    fieldValidator
],login);

router.post('/google', [
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    fieldValidator
], googleSignin );



module.exports = router;