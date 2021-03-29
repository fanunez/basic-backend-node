
// Si se apunta a la carpeta Middlewares, esta utilizara index.js por defecto como archivo principal
const fieldValidator = require('../middlewares/field-validator.js');
const validateJWT = require('../middlewares/jwt-validator.js');
const validateRole = require('../middlewares/validate-role.js');



module.exports = {
    ...fieldValidator,
    ...validateJWT,
    ...validateRole
}