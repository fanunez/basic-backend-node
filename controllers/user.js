
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
/*
    RECORDAR!
    Validar todos los endpoints sin importar las validaciones del frontend

*/

// Mostrar usuarios
const getUser = async(req = request, res = response) => {

    const { limit = 5, since = 0 } = req.query;
    
    const query = { state: true };

    // //buscar los usuarios "activos"
    // const users = await User.find( query )
    //     .skip( Number(since) )
    //     .limit( Number(limit) );

    // // Conteo total de documentos
    // const total = await User.countDocuments( query );

    /*
        La busqueda y conteo de usuarios son independientes una de otra, esto es:
        Si busqueda demora 4s y conteo 3s, estos se ejecutan uno despues del otro, 
        ocacionando 7s de espera por consulta a la bd. 
        
        Promise.all() permite enviar todas las promesas que quieren que se ejecuten.
    */
    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number(since) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        users
    });
}

// Crear usuario
const postUser = async(req, res) => {

    // const body = req.body;
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encriptar password
    const salt = bcryptjs.genSaltSync(); //Numero de vueltas para dificultar descifrado
    user.password = bcryptjs.hashSync( password, salt ); // hashing

    // Guardar en db y esperar guardado
    await user.save();

    res.json( user );
}

// Actualizar usuario
const putUser = async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, email, ...remainder } = req.body;

    if( password ) {
        // Encriptar password
        const salt = bcryptjs.genSaltSync(); //Numero de vueltas para dificultar descifrado
        remainder.password = bcryptjs.hashSync( password, salt ); // hashing
    }

    const user = await User.findByIdAndUpdate( id, remainder );

    res.json( user );
}

// Eliminar usuario
const deleteUser = async(req, res) => {

    const { id } = req.params;

    // fisicamente lo borramos
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { state: false } );
    res.json( user );
}


// const patchUser = (req, res) => {
//     res.json({
//         msg: 'patch API - Controller'
//     });
// }



module.exports = {
    getUser,
    postUser,
    putUser,
    // patchUser,
    deleteUser
}