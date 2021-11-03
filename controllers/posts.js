const mongoose = require('mongoose');
const { v1: uuidv1 } = require('uuid');
const { post } = require('../api/users');
const Posts = require('../models/Posts')



const addPost = (req , res) => {
    
    // Id de user
    const {body} = req; 
    body.id = req.paramsId;
    
    const post = new Posts ({ 
        userId: req.body.userId,
        like: 0,
        description: req.body.description,
        createdAt: new Date()
    })

    post.save( (err, pst) => {
        err && res.status(500).send(err.message),
        res.status(201).json(pst) 
    }) 
}

const findAllPost = (req , res) => {
    Posts.find( (err , posts ) => {
        err && res.status(500).send(err.message),
        res.status(200).json(posts) 
    } )
}

const findPostId = (req , res) => {
    Posts.findById( req.params.id , (err , posts ) => {
        err && res.status(500).send(err.message),
        res.status(200).json(posts) 
    } )
}

const editAll = async(req, res) => {
    try {
        const { body } = req;
        const filter = { _id: req.params.id }
        const update = body;

        const doc = await Posts.findOneAndUpdate(filter, update, { new: true });

        if (!doc)
            return res.status(404).json({ message: `_id ${req.params.id} doesn't exists` });
        res.status(200).json(doc);
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

const editSomeone = async(req, res) => {
    try {
        const { body } = req;
        const filter = { _id: req.params.id };
        const update = body;
        delete body._id
        const doc = await Posts.findOneAndUpdate(filter, update, { new: true });

        if (!doc)
            return res.status(404).json({ message: `_id ${req.params.id} doesn't exists` })

        res.status(200).json(doc)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

const remove = async(req,res) => {
    try {
        console.log(req.params.id);
        const filter = {_id:req.params.id}
        let response = await Posts.remove(filter)
        res.status(200).json({OK: true, deletedcount: response.deletedcount})
        
    } catch (error) {
        res.status(500).json({message:error})
    }
}



module.exports = { addPost , findAllPost , findPostId , remove, editAll, editSomeone}
