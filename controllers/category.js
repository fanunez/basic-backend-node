
const { response } = require('express');

const { Category } = require('../models');


// Obtener categorias, paginado - total - populate
const getCategory = async( req, res = response) => {
    
    const { limit = 5, since = 0 } = req.query;

    const query = { state: true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
            .skip( Number(since) )
            .limit( Number(limit) )
            .populate( 'user', 'name') 
    ]);


    res.json({
        total,
        categories
    })

}


// Obtener categoria - populate {}
const getCategoryById = async( req, res = response) => {
    
    const { id } = req.params;
    const category = await Category.findById( id )
        .populate( 'user', 'name' );
        

    res.json({
        category 
    });

}

// Crear categoria
const createCategory = async( req, res = response ) => {

    const name = req.body.name.toUpperCase();
    
    const categoryDB = await Category.findOne({ name });
    
    if( categoryDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoryDB.name } ya existe`
        })
    }
    
    // Generar la data a guardar
    const data = {
        name,
        user: req.userAuth._id
    }

    // Guardar en db
    const category = new Category( data );
    await category.save();

    res.status(201).json( category );

}

// actualizar categoria, 
const updateCategory = async( req, res = respose ) => {

    const { id } = req.params;
    const { _id, state, user, ...remainder} = req.body;
    // caps
    remainder.name = remainder.name.toUpperCase();
    remainder.user = req.userAuth._id;

    const category = await Category.findOneAndUpdate( id, remainder, { new: true } );

    res.json( category );
}

// borrar categoria
const deleteCategory = async( req, res = respose ) => {

    const { id } = req.params;

    const category = await Category.findByIdAndUpdate( id, {state: false}, { new: true } );
    const userAuth = req.userAuth;

    res.json({
        category,
        userAuth
    });
}


module.exports = {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory

}