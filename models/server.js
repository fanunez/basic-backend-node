
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConn } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            authPath: '/api/auth',
            userPath: '/api/users',
            categoryPath: '/api/categories',
            productPath: '/api/products',
            searchPath: '/api/search',
            uploadPath: '/api/uploads'
        }

        // Conectar a base de datos
        this.connectDatabase();

        // Middlewares: Funciones que siempre se ejecutan al levantar el servidor
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();
    }


    async connectDatabase() {
        await dbConn();
    }


    middlewares() {
        // CORS
        this.app.use( cors() );
        
        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public'));

        // Manejo de archivos, fileupload
        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));


    }


    routes() {

        this.app.use( this.paths.authPath, require('../routes/auth') );
        this.app.use( this.paths.userPath, require('../routes/user') );
        this.app.use( this.paths.categoryPath, require('../routes/category') );
        this.app.use( this.paths.productPath, require('../routes/product') );
        this.app.use( this.paths.searchPath, require('../routes/search') );
        this.app.use( this.paths.uploadPath, require('../routes/uploads') )

    }


    listen() {
        this.app.listen( this.port, () => {
            console.log(`App running on port ${ this.port }`);
        });
    }

}


module.exports = Server;