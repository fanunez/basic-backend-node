
const { response } = require("express");
const { uploadFile } = require("../helpers");

const { User, Product } = require('../models');

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
    try {
        // Only texts and markdowns
        // const fileName = await uploadFile( req.files, ['txt', 'md'], 'texts' );
        // Images
        const fileName = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ fileName });
        
    } catch ( error ) {
        res.status(400).json({ error })
    }

}

//
const updateImage = async( req, res = response ) => {

    const { id, collection } = req.params;

    //valor condicional
    let model;

    switch ( collection ) {
        case 'users':
            model = await User.findById( id ); 
            if( !model ) {
                return res.status(400).json({ 
                    msg: `No existe usuario con id ${ id }`
                })
            }
            break;
        
        case 'products':
            model = await Product.findById( id ); 
            if( !model ) {
                return res.status(400).json({ 
                    msg: `No existe producto con id ${ id }`
                })
            }
            break;
                    
        default:
            return res.status(500).json({ msg: 'Coleccion no implementada' });
    }

    // asociar y almacenar imagen al modelo
    const fileName = await uploadFile( req.files, undefined, collection );
    model.img = fileName;

    await model.save();

    res.json({ model });

}





module.exports = {
    fileManager,
    updateImage
}