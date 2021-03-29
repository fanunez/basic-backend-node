
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const generateJWT = require('../helpers/jwt-generator');
const { googleVerify } = require('../helpers/google-verify');



// Login de usuario
const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({ email });
        if( !user ) {
            return res.status(400).json({
                msg: 'Email / Password no son correctos - email'
            })
        }
        // Si el usuario esta activo
        if( !user.state ) {
            return res.status(400).json({
                msg: 'Usuario inactivo - state: false'
            })
        }
        // Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Email / Password no son correctos - password'
            })
        }
        // Generar JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
    
        })
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: 'Algo salio mal :('
        })
    }

}

// Google sign in
const googleSignin = async(req, res = response) => {

    const { id_token } = req.body;
        
    try {    
        const { name, email, img } = await googleVerify( id_token );

        // Verificar si existe el correo
        let user = await User.findOne({ email });
        // Si no existe        
        if( !user ) {
            // crear
            const data = {
                name,
                email,
                password: 'GooglePassword',
                img,
                google: true
            };

            user = new User( data );
            await user.save();
        }
        // Si el usuario en DB se encuentra bloqueado o inactivo del serivicio ( state: false )
        if( !user.state ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }
        // Generar JWT
        const token = await generateJWT( user.id );


        res.json({
            user,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es valido'
        })
    }

}



module.exports = {
    login,
    googleSignin
}