
const mongoose = require('mongoose');
const colours = require('colors');

const dbConn = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false 
        });

        console.log('¡Base de datos en linea!'.bgGreen.white);

    } catch (error) {
        console.log(error);
        throw new Error('Error iniciando la base de datos...'.bgRed.red);
    }

}


module.exports = {
    dbConn

}