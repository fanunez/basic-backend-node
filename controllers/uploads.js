
const { response } = require("express");
const { uploadFile } = require("../helpers");


// Carga de archivos
// Informacion extraida de :
// https://github.com/richardgirges/express-fileupload/blob/master/example/server.js
const fileManager = async( req, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      res.status(400).send({
          msg: 'No hay archivo que subir'
      });
      return;
    }

    // console.log('req.files >>>', req.files); // eslint-disable-line
    // Images
    const fileName = await uploadFile( req.files );
    
    res.json({
        fileName
    })

}

module.exports = {
    fileManager
}