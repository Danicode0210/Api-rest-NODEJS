const Like = require('../models/Likes')

const addLike = async(req, res) => {
    try {
        const like = new Like({
            postId: req.body.postId,
            userId: req.body.userId,
            active: req.body.active
        })
        like.save( (likes) => {
            return res.status(201).json(likes) 
        })
    } catch (error) {
        return res.status(500).send({message:'error'})
    }
}

const findAllLike = (req , res) => {
    
    Like.find( (err , likes ) => {
        err && res.status(500).send(err.message),
        res.status(200).json(likes) 
    } )
}

const findLikeId = (req , res) => {
    Like.findById( req.params.id , (err , likes ) => {
        err && res.status(500).send(err.message),
        res.status(200).json(likes) 
    } )
}

const editAll = async(req, res) => {
    try {
        const { body } = req;
        const filter = { _id: req.params.id }
        const update = body;

        const doc = await Like.findOneAndUpdate(filter, update, { new: true });

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
        const doc = await Like.findOneAndUpdate(filter, update, { new: true });

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
        let response = await Like.remove(filter)
        res.status(200).json({OK: true, deletedcount: response.deletedcount})
        
    } catch (error) {
        res.status(500).json({message:error})
    }
}

module.exports = { addLike, findAllLike, findLikeId, editAll, editSomeone, remove }