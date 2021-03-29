
const { response } = require("express")

// La respuesta de validacion de token se encuentra en la request del usuario autenticado
const isAdminRole = (req, res = response, next) => {

    if( !req.userAuth ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin el token'
        })
    }

    const { role, name } = req.userAuth;

    if( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } no es administrador`
        })
    }

    next();
}

// Verificacion de multiples roles
const hasRole = ( ...remainder ) => {
    // se necesita el retorno de una funcion
    return (req, res = response, next) => {

        if( !req.userAuth ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin el token'
            })
        }
        
        if( !remainder.includes( req.userAuth.role )) {
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${ remainder }`
            })
        }

        next();
    }
}


module.exports = {
    isAdminRole,
    hasRole
}