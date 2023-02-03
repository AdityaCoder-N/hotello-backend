const mongoose = require('mongoose');

let mongoURI = 'mongodb+srv://Aditya:RGeFpAimr9G2N7y@cluster0.a7femdq.mongodb.net/test'

const connectToMongo=()=>{

    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo Succesfully");
    });

}

module.exports = connectToMongo;