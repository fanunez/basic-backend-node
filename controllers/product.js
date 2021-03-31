
const { response } = require("express");

const { Product } = require('../models');


// Obtener todos los productos
const getProduct = async( req, res = response ) => {

    const { limit = 5, since = 0 } = req.query;

    const query = { state: true };

    const [ total, products ] = await Promise.all([
        Product.countDocuments( query ),
        Product.find( query )
            .skip( Number(since) )
            .limit( Number(limit) )
            .populate( 'user', 'name')
            .populate( 'category', 'name' )
    ]);


    res.json({
        total,
        products
    })

}


// Obtener producto mediante id
const getProductById = async( req, res = response ) => {

    const { id } = req.params;

    const product = await Product.findById( id )
        .populate( 'user', 'name' )
        .populate( 'category', 'name' )
        

    res.json({
        product 
    });

}


// Crear producto
const createProduct = async( req, res = response ) => {

    const { state, user, ...remainder } = req.body;
    
    const productDB = await Product.findOne({ name: remainder.name });

    if( productDB ) {
        return res.status(400).json({
            msg: `El producto ${ productDB.name } ya se encuentra registrado`
        })
    }

    // Generar la data
    const data = {
        name: remainder.name.toUpperCase(),
        user: req.userAuth._id,
        ...remainder
    }

    // Guardar en db
    const product = new Product( data );
    await product.save();

    res.status(201).json( product );

}


//
const updateProduct = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, state, user, ...remainder} = req.body;
    
    if( remainder.name ) {
        remainder.name = remainder.name.toUpperCase();
    }

    remainder.user = req.userAuth._id;

    const product = await Product.findOneAndUpdate( id, remainder, { new: true } );

    res.json( product );

}


//
const deleteProduct = async( req, res = respose ) => {

    const { id } = req.params;
    
    const product = await Product.findByIdAndUpdate( id, {state: false}, { new: true } );
    const userAuth = req.userAuth;

    res.json({
        product,
        userAuth
    });
}



module.exports = {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct

}