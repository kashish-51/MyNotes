const express = require('express');
const User = require('../models/User');  //imported models of user
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'harryisagoodboy';

// ROUTE 1: Create a user using : Post "/api/auth/createuser" . no login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Enter a valid password of length min 5 char').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // checks whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        console.log(user)
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exist" })
        }

        const salt = await bcrypt.genSalt(10);
       const  secPass = await bcrypt.hash(req.body.password,salt)  //because it return promises
       
       // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
  //res.json(user)
       success=true;
    res.json({success, authtoken});
  

    } catch (error) {         // catch errors
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

// ROUTE 2: Authenticate a user using : Post "/api/auth/login" . no login required

router.post('/login', [
    
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),             //.exists checks if the password exist or not
], async (req, res) => {
let success= false;
  // If there are errors, return bad request and the errors

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const{email, password} = req.body;
try{                                                                    //checks if user exist or not
    let user= await User.findOne({email});
     if (!user){
        success:false;
        return res.status(400).json({success, error:"Please try to login with correct credentials"});   
     }
     const passwordCompare = await bcrypt.compare(password, user.password);
if(!passwordCompare){
    success = false;
    return res.status(400).json({success, error:"Please try to login with correct credentials"});   

}
const data = {
    user:{
        id:user.id
    }
}
const authtoken = jwt.sign(data, JWT_SECRET);
success= true;
res.json({success,authtoken})

}catch (error) {         // catch errors
    console.error(error.message);
    res.status(500).send("Internal server error");
}
})
// ROUTE 3: Get user detail using : Post "/api/auth/getuser" .login required
router.post('/getuser', fetchuser,  async (req, res) => {

try {
   userId = req.user.id;
  
   const user = await User.findById(userId).select("-password") 
   res.send(user);
    
} catch (error) {         // catch errors
    console.error(error.message);
    res.status(500).send("Internal server error");
}
})
module.exports = router




