const express = require('express');

const mongoose = require('mongoose');
const Users = require('./api/users')
const Posts = require('./api/posts');


const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/users',Users)
app.use('/api/posts',Posts)


mongoose.connect(
    "mongodb://localhost/users",
    {useNewUrlParser:true},
    (err,res) => {
        err && console.log('Error conectando a la bd')
        app.listen(4000,()=>{
            console.log('Servidor corriendo en http://localhost:4000');
        })
    }
)

