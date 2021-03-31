
const { Role, User, Category } = require('../models');

// Verificacion de rol
const roleValidator =  async( role = '' ) => {
    const exist = await Role.findOne({ role });
    if( !exist ) {
        throw new Error(`El rol ${ role } no está registrado en la base de datos`);
    }
}

// Verificacion de correo 
const emailValidator = async( email = '' ) => {
    const exist = await User.findOne({ email });
    if( exist ) {
        throw new Error(`El email ${ email } ya está registrando en la base de datos`);
    }
}

// Verificacion de existencia de id de usuario
const existUserById = async( id ) => {
    const exist = await User.findById( id );
    if( !exist ) {
        throw new Error(`No existe usuario con id ${ id }`);
    }
}

// Verificacion de existencia de id de categoria
const existCategoryById = async( id ) => {
    const exist = await Category.findById( id );
    if( !exist ) {
        throw new Error(`No existe categoria con id ${ id }`);
    }
}



module.exports = {
    roleValidator,
    emailValidator,
    existUserById,
    existCategoryById
}