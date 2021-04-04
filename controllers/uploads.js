const path = require('path');
const fs = require('fs');
// API
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require("express");
const { uploadFile } = require("../helpers");

const { User, Product } = require('../models');

// Carga de archivos
// Informacion extraida de :
// https://github.com/richardgirges/express-fileupload/blob/master/example/server.js
const fileManager = async( req, res = response ) => {

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

    // Limpiar imagenes previas
    if ( model.img ) {
        // borrar imagen del servidor
        const pathImage = path.join( __dirname, '../uploads', collection, model.img );
        if ( fs.existsSync( pathImage ) ) {
            fs.unlinkSync( pathImage );
        }
        
    }

    // asociar y almacenar imagen al modelo
    const fileName = await uploadFile( req.files, undefined, collection );
    model.img = fileName;

    await model.save();

    res.json({ model });

}


const showImage = async( req, res = response ) => {

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

    const pathImage = path.join( __dirname, '../assets/no-image.jpg' );
    res.sendFile( pathImage );

}


//
const updateImageCloudinary = async( req, res = response ) => {

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

    // Limpiar imagenes previas en cloudinary
    if ( model.img ) {
        const nameArr = model.img.split('/');
        const name = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    // Almacenar imagen a cloudinary utilizando API
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    model.img = secure_url;
    await model.save();

    res.json( model );

}



module.exports = {
    fileManager,
    updateImage,
    updateImageCloudinary,
    showImage
}