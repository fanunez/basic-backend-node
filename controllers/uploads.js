const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { response } = require("express");


// Carga de archivos
// Informacion extraida de :
// https://github.com/richardgirges/express-fileupload/blob/master/example/server.js
const uploadFile = ( req, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      res.status(400).send({
          msg: 'No hay archivo que subir'
      });
      return;
    }

    // console.log('req.files >>>', req.files); // eslint-disable-line
  
    const { file } = req.files;

    // Validar extension
    const name = file.name.split('.');
    const ext = name[ name.length - 1 ];
    
    const validExtension = ['png', 'jpg', 'jpeg', 'gif'];
    if( !validExtension.includes( ext ) ) {
        res.status(400).json({
            msg: `La extension ${ ext } no es permitida. Por favor utilizar: ${ validExtension }`
        })
    }
    
    const tempName = uuidv4() + '.' + ext;
    const uploadPath = path.join(__dirname, '../uploads/', tempName );
    
    file.mv( uploadPath, (err) => {
      if (err) {
          console.log( err );
        return res.status(500).json({ err });
      }
  
      res.json({ msg: 'File uploaded to ' + uploadPath});
    });

}

module.exports = {
    uploadFile
}