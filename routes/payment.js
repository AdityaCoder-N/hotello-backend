const express = require('express');

var crypto = require("crypto");
const router = express.Router();
const Razorpay = require('razorpay');
const Payment = require('../Models/Payment');


const instance = new Razorpay({
    key_id: 'rzp_test_tsOMmrkK3lhvfu',
    key_secret: 'HLnT6t3mZNvDPC6zkgpBQnzz',
});

const client_host = 'http://localhost:3000'

router.post('/checkout',async (req,res)=>{

    try{
        const options = {
            amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
    
        const order = await instance.orders.create(options);
        console.log(order);
    
    
        res.status(200).json({success : true, order});
    }
    catch (error) {
        res.status(400).json(error);
    }
    

})

router.post('/paymentVerification',async (req,res)=>{

    console.log("req body : ", req.body);
    console.log("res body : ", res.body);
    const { razorpay_order_id , razorpay_payment_id , razorpay_signature} = req.body;

    const body=razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', 'HLnT6t3mZNvDPC6zkgpBQnzz')
                                    .update(body.toString())
                                    .digest('hex');

    console.log("sig received " ,razorpay_signature);
    console.log("sig generated " ,expectedSignature);

    if(razorpay_signature==expectedSignature)
    {
        // save in database
        await Payment.create({
            razorpay_order_id , 
            razorpay_payment_id , 
            razorpay_signature
        })

        // res.redirect(`${client_host}/paymentSuccess`);
        res.status(200).json({success:true});
    }
    else{
        res.status(400).json({success:false});
    }

})

router.get('/getKey',(req,res)=>res.status(200).json({key:'rzp_test_tsOMmrkK3lhvfu'}));


module.exports = router;