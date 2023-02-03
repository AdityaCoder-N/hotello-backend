const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({

  title:{
    type: String,
    required: true
  },
  desc:{
    type:String
  },
  price:{
    type: String,
    required: true
  },
  maxPeople:{
    type:Number,
    default:2
  },

  roomNumbers: [ { number: Number, unavailableDates : {type:[Date]} } ]

},
{timestamps:true}
);

module.exports =  mongoose.model('Room',RoomSchema);