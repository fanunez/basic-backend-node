
const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const User = require('../models/user');

// JWT se envia desde los headers
const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header( 'Authorization' );

    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    
    try {
        // verificar token
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );        
        // leer usuario que corresponde al uid
        const userAuth = await User.findById( uid );
        // verificar usuario
        if( !userAuth ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en db'
            })
        }
        // verificar state = true
        if( !userAuth.state ) {
            return res.status(401).json({
                msg: 'Token no válido - state: false'
            })
        }

        req.userAuth = userAuth;

        // se utiliza la request para utilizar por referencia y entregar datos mediante esta
        req.uid = uid;
        next();

    } catch (error) {
        console.log( error );
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validateJWT  

} 