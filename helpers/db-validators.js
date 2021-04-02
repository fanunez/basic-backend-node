
const { Role, User, Category, Product } = require('../models');

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

// Verificacion de existencia de id de producto
const existProductById = async( id ) => {
    const exist = await Product.findById( id );
    if( !exist ) {
        throw new Error(`No existe categoria con id ${ id }`);
    }
}

// // Verificacion de existencia de categoria con nombre
// const existCategoryByName = async( name = '' ) => {
//     name = name.toUpperCase();
//     const exist = await Category.findOne({ name });
//     if( !exist ) {
//         throw new Error(`No existe categoria con nombre ${ name }`);
//     }
// }

// Verificacion de colecciones
const collectionAllowed = ( collection = '', collections = [] ) => {
    
    const include = collections.includes( collection );
    if( !include ) {
        throw new Error(`No existe la coleccion ${ collection }. Por favor, utilice: ${ collections }`)
    }

    return true;
}



module.exports = {
    roleValidator,
    emailValidator,
    existUserById,
    existCategoryById,
    existProductById,
    collectionAllowed
}