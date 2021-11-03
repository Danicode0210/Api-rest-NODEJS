const mongoose = require('mongoose');
const Schema = mongoose.Schema
const postSchema = new Schema({
    postId: { type: String },
    userId: { type: String },
    description: { type: String },
    createdAt: { type: Date },
    like: { type: Number } 
}) 

module.exports = Posts = mongoose.model('Posts' , postSchema)