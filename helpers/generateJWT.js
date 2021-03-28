
const jwt = require('jsonwebtoken');



// User identifier es lo unico a almacenar en el jwt
const generateJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };
        // firma del token
        jwt.sign( payload,  process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token) => { //callback
            if( err ) {
                console.log( err );
                reject('No se pudo generar el token');
            }
            else {
                resolve( token );
            }
        });

    });

}

module.exports = generateJWT;