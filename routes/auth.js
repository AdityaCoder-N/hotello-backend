const express = require('express');
const router = express.Router();

const User = require('../Models/User');
const { body, validationResult } = require('express-validator');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_secret = "thisisanimportantstring1234"

const fetchUser = require('../Middleware/fetchUser');


// Create User   -> No Login required   
router.post('/createuser',[body('email','Enter a valid email').isEmail(),
                            body('password','Password Must be atleast 5 characters Long').isLength({min:5})],async (req,res)=>{    // no login required
    
    let success=false;
    // if there are errors in the user input return them using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
        
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success,error: 'Sorry a User with this email Already exists'})
        }

        // creating a scecured hash from password
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password,salt);
        

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })

        newUser.save();
        const data = {
            user : {
                id : newUser.id
            }
        }

        const authToken = jwt.sign(data,JWT_secret);
        
        success=true;
        res.status(200).json({success,authToken});

    } catch (error) {
        res.status(500).json(error);
    }

})

// Login/validate User   -> No Login required   
router.post('/login',[body('email','Enter a valid email').isEmail(),
                            body('password','Password Must be atleast 5 characters Long').isLength({min:5})],async (req,res)=>{    // no login required
    
    let success=false;
    // if there are errors in the user input return them using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
        
        let user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({success,error: 'User with this email does not exist'})
        }
        
        const passwordCompare = await bcrypt.compare(req.body.password,user.password);

        if(!passwordCompare){
            return res.status(400).json({success,error:"Wrong Email or Password"});
        }

        const data = {
            user : {
                id : user.id
            }
        }

        const authToken = jwt.sign(data,JWT_secret);
        
        success=true;
        res.status(200).json({success,authToken});

    } catch (error) {
        res.status(500).json(error);
    }

})






module.exports = router;