
const { response } = require("express");

const { ObjectId } = require('mongoose').Types;

// Modelos
const { User, Category, Product } = require('../models');

// Colecciones permitidas
const collections = [
    'users',
    'categories',
    'products',
    'roles'
];

// Buscar usuarios en DB mediante parametros 
const searchUsers = async( term = '', res = response ) => {

    const isMongoId = ObjectId.isValid( term ); // TRUE

    // buscar por id
    if( isMongoId ) {
        const user = await User.findById( term );
        return res.json({
            results: ( user ) ? [ user ] : []
        });
    }
    // buscar por otro parametro
    // expresion regular para evitar CaseSensitive y busqueda por lotes
    const regex = new RegExp( term, 'i' );

    const users = await User.find({ 
        $or: [{ name: regex }, { email:regex }], // se pueden agregar condiciones
        $and: [{ state: true }]                  // usuario activo
    });

    // se puede agregar count para listar
    res.json({
        results: users
    });

}

// Buscar categorias por id/nombre
const searchCategory = async( term = '', res = response ) => {

    const isMongoId = ObjectId.isValid( term ); // TRUE

    // buscar por id
    if( isMongoId ) {
        const category = await Category.findById( term );
        return res.json({
            results: ( category ) ? [ category ] : []
        });
    }

    // expresion regular para evitar CaseSensitive y busqueda por lotes
    const regex = new RegExp( term, 'i' );

    const categories = await Category.find({ name: regex, state: true });

    res.json({
        results: categories
    })

}

// Buscar productos por id/nombre
const searchProduct = async( term = '', res = response ) => {

    const isMongoId = ObjectId.isValid( term ); // TRUE

    // buscar por id
    if( isMongoId ) {
        const product = await Product.findById( term )
                              .populate('category', 'name');
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    // expresion regular para evitar CaseSensitive y busqueda por lotes
    const regex = new RegExp( term, 'i' );

    const products = await Product.find({ name: regex, state: true })
                           .populate('category', 'name');

    res.json({
        results: products
    })

}



// Busqueda de elementos en la coleccion mediante parametros
const search = ( req, res = response ) => {

    const { collection, term } = req.params;

    if( !collections.includes( collection ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ collections }`
        })
    }

    switch ( collection ) {
        case 'users':
            searchUsers( term, res );
            break;

        case 'categories':
            searchCategory( term, res );
            break;

        case 'products':
            searchProduct( term, res );
            break;
        
        default:
            res.status(500).json({
                msg: 'Busqueda no implementada'
            });
    }

    // res.json({
    //     msg: 'Buscar...',
    //     collection,
    //     term
    // })

}


module.exports = {
    search

}