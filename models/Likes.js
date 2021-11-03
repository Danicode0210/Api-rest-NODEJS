const mongoose = require('mongoose');
const Schema = mongoose.Schema
const LikeSchema = new Schema({
    postId: { type: String },
    userId: { type: String },
    active: { type: Boolean }
}) 

module.exports = Posts = mongoose.model('Likes' , LikeSchema)