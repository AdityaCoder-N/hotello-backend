
const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({

  name:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  photos:{
    type:[String]
  },
  rating:{
    type:String,
  },
  price:{
    type:String,
    required:true
  },
  rooms:{
    type:[String],
  }  

});

module.exports =  mongoose.model('Hotel',HotelSchema);