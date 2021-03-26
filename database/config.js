
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

        console.log('¡Base de datos en linea!'.green);

    } catch (error) {
        console.log(error);
        throw new Error('Error iniciando la base de datos...'.red);
    }

}


module.exports = {
    dbConn

}