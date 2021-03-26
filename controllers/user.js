
const { request, response } = require('express');

const User = require('../models/user')



const getUser = (req = request, res = response) => {

    const { query, name = 'No name', apikey } = req.query;

    res.json({
        msg: 'get API - Controller',
        query,
        name,
        apikey
    });
}


const postUser = async(req, res) => {

    // const body = req.body;
    const body = req.body;
    const user = new User( body );

    // esperar guardado
    await user.save();

    res.json({
        msg: 'post API - Controller',
        // body
        user

    });
}


const putUser = (req, res) => {

    const id = req.params.id;
    
    res.json({
        msg: 'put API - Controller',
        id

    });
}


const patchUser = (req, res) => {
    res.json({
        msg: 'patch API - Controller'
    });
}


const deleteUser = (req, res) => {
    res.json({
        msg: 'delete API - Controller'
    });
}




module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}