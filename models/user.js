
const { Schema, model } = require('mongoose');


const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE' ,
        name: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

/*
    Sobreescribir metodo toJSON.
    Tiene que ser una funcion normal, porque se utilizara "this". Una funcion de flecha mantiene
    a lo que apunta el this fuera de la misma.
    Se necesita solo para la instancia creada.
*/
UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}



module.exports = model( 'User', UserSchema );