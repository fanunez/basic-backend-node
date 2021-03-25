
const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Middlewares: Funciones que siempre se ejecutan al levantar el servidor
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();
    }


    middlewares() {
        // CORS
        this.app.use( cors() );
        
        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public'));


    }


    routes() {

        this.app.use( this.usersPath, require('../routes/user') );
    
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log(`App running in port ${ this.port }`);
        });
    }

}


module.exports = Server;