const User = require('../models/user')

const findAllUsers =(req,res)=>{
    User.find((err,users)=>{
        err && res.status(500).send(err.message);

        res.status(200).json(users)
    })
}

const findById = (req,res) =>{
    User.findById(req.params.id,(err,user)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(user);

    })
}


const addUser = (req,res) =>{
    let user = new User({
        name:req.body.name,
        username:req.body.username,
        password:req.body.password,
        mail:req.body.mail,

    })

    user.save((err,usr)=>{
        err && res.status(500).send(err.message),
        res.status(200).json(usr);
    });
};

const removeUser = async(req,res) => {
    try {
        console.log(req.params.id);
        const filter = {_id:req.params.id}
        let response = await User.remove(filter)
        res.status(200).json({OK: true, deletedcount: response.deletedcount})
        
    } catch (error) {
        res.status(500).json({message:error})
    }
}  


const editAll = async(req, res) => {
    try {
        const { body } = req;
        const filter = { _id: req.params.id }
        const update = body;

        const doc = await User.findOneAndUpdate(filter, update, { new: true });

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
        const doc = await User.findOneAndUpdate(filter, update, { new: true });

        if (!doc)
            return res.status(404).json({ message: `_id ${req.params.id} doesn't exists` })

        res.status(200).json(doc)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}



module.exports={findAllUsers, findById, addUser, removeUser, editAll, editSomeone }