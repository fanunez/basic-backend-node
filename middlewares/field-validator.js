
const { validationResult } = require('express-validator');


const fieldValidator = ( req, res, next ) => {
    // validar campos
    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.status(400).json( errors );
    }
    // proximo middleware, si no hay mas, el controlador
    next();

}



module.exports = {
    fieldValidator
}