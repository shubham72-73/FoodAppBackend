const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtSecret = process.env.SECRET_CODE;

router.use(bodyParser.json());

// Create User Route

router.post('/createUser',
[
    body('email', 'Enter valid email ID').isEmail(),
    body('name').isLength({min: 2}),
    body('password', 'Enter Atleast 5 characters').isLength({min: 5})
],
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try{
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email.toLowerCase(),
            location: req.body.location
        }).then(res.json({success:true}));
    } catch(error){
        console.log(error);
        res.json({success:false});
    }
})

// Login User Route

router.post('/loginuser',
[
    body('email', 'Enter valid email ID').isEmail(),
    body('password', 'Enter Atleast 5 characters').isLength({min: 5})
],
 async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        let email = req.body.email.toLowerCase();
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors: "Try logging in with correct email"});
        }
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if(!pwdCompare){
            return res.status(400).json({errors: "Incorrect Password"});
        }
        const data = {
            user:{
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({success:true, authToken:authToken});
    } catch(error){
        console.log(error);
        res.json({success:false});
    }
})


module.exports = router;