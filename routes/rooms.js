const Room = require('../Models/Room');
const Hotel = require('../Models/Hotel'); 
const express = require('express');

const router = express.Router();

// create Room
router.post('/createRoom/:hotelid',async (req,res)=>{

    const HotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        
        const savedRoom = await newRoom.save();
        
        const h = await Hotel.findByIdAndUpdate(HotelId, {$push : {rooms : savedRoom._id}},{new : true});
        

        res.status(200).json(h);
        
    } catch (error) {
        res.status(500).json(error);
    }
    
})

// Update Room
router.put('/updateRoom/:id',async (req,res)=>{

    try {
        
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set : req.body },
            { new :true } 
        );
            
        res.status(200).json(updatedRoom);
    
    } catch (error) {
        res.status(500).json(error);
    }

})

// Delete Room
router.delete('/deleteRoom/:id/:hotelid',async (req,res)=>{

    const hotelid = req.params.hotelid;
    try {
        
        await Hotel.findByIdAndUpdate(hotelid,{
            $pull : {rooms : req.params.id}
        })

        await Room.findByIdAndDelete(req.params.id);
            
        res.status(200).json('Room deleted');
    
    } catch (error) {
        res.status(500).json(error);
    }

})

// Get Room
router.get('/getRoom/:id',async (req,res)=>{

    try {
        
        const Room = await Room.findById(req.params.id);
            
        res.status(200).json(Room);
    
    } catch (error) {
        res.status(500).json(error);
    }

})
// Get Rooms
router.get('/getRooms',async (req,res)=>{

    
    try {
        
        const Rooms = await Room.find();
            
        res.status(200).json(Rooms);
    
    } catch (error) {
        res.status(500).json(error);
    }
    
})

// update room availability(available dates) 
// used in reserving a room
router.put('/updateAvailableDates/:id', async (req,res)=>{
    
    try {
        
        await Room.updateOne({"roomNumbers._id":req.params.id} , {
            $push:{
                "roomNumbers.$.unavailableDates":req.body.dates
            }
        })

        res.status(200).json("Dates added successfully");

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;