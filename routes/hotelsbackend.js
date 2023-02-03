const express = require('express');
const  Hotel  = require('../Models/Hotel');
const  Room  = require('../Models/Room');

const router  = express.Router();
const host = 'http://localhost:3001'
//CREATE 
router.post('/createhotel',async (req,res)=>{

    try{
        
        const {name, address, photos, rating,price,rooms} = req.body;
        
        const found = await Hotel.find({name:name});
        
        if(found.length>0)
        {
            res.status(200).json(found[0]);
            return;
        }

        const newHotel = new Hotel({name,address,photos,rating,price,rooms});
        

        // console.log(newHotel);

        const savedHotel = await newHotel.save();
        
        // saving default rooms in hotels
        await fetch(`${host}/rooms/createRoom/${savedHotel._id}`,{

            method:'POST',

            headers:{
                'content-type':'application/json'
            },

            body:JSON.stringify({
                "title":"King size room",
                "desc":"King size room with balcony and washroom ",
                "price":"4000",
                "maxPeople":3,
                "roomNumbers" : [{"number":101} , {"number":102}, {"number":103}, {"number":104}, {"number":105} ]
            })
        })
        await fetch(`${host}/rooms/createRoom/${savedHotel._id}`,{

            method:'POST',

            headers:{
                'content-type':'application/json'
            },

            body:JSON.stringify({
                "title":"Regular room",
                "desc":"Regular room with attached washroom",
                "price":"2500",
                "maxPeople":3,
                "roomNumbers" : [{"number":301} , {"number":302}, {"number":303}, {"number":304}]
            })
        })
        

        res.status(200).json(savedHotel);


    }catch(err){
        // res.status(500).json(err);
        res.send(err);
    }

})

//UPDATE

router.put('/update/:id',async (req,res)=>{

    try {
        
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set : req.body},{new:true});

        res.status(200).json(updatedHotel);

    } catch (error) {
        res.status(500).json(error);
    }

})


// Delete

router.delete('/delete/:id',async (req,res)=>{

    try {

        await Hotel.findByIdAndDelete(req.params.id);

        res.status(200).json("Hotel has been deleted");

    } catch (error) {
        res.status(500).json(error);
    }

})

// Get a hotel

router.get('/getHotel/:id',async (req,res)=>{

    try {
        
        const hotel = await Hotel.findById(req.params.id);

        res.status(200).json(hotel);

    } catch (error) {
        res.status(500).json(error);
    }

})

//Get all hotels

router.get('/getAll',async (req,res)=>{

    try {
        
        const hotels = await Hotel.find();

        res.status(200).json(hotels);

    } catch (error) {
        res.status(500).json(error);
    }

})

// To get rooms of a particular hotel
router.get('/getHotelRooms/:hotelid', async (req,res)=>{

    try {
        
        const hotel = await Hotel.findById(req.params.hotelid);
        console.log("hotel : ", hotel);
        
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room);
        }))
        
        // console.log("list : ", list);
        res.status(200).json(list);

    } catch (error) {
        res.status(500).json(error);
    }

})


module.exports = router;