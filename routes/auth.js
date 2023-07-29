const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")


//Register
router.post('/register',async(req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
    })

    try{
   const  saveUser= await newUser.save()
    res.status(201).json(saveUser);   
}catch(err){
  res.status(500).json(err)  
    }
})




//Login
router.post('/login',async(req,res)=>{

try{
  const user=await User.findOne({username:req.body.username});
  if (!user) {
    return res.status(401).json('Wrong username');
  }

  const hashedpassword= CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
  const Originalpassword = hashedpassword.toString(CryptoJS.enc.Utf8) 

    const accessToken=jwt.sign({
      id:user._id,
      isAdmin:user.isAdmin,
      
    },
    process.env.JWT_SEC,
    {
      expiresIn:"3d"
    })


   const {password , ...others}=user._doc;
  if (Originalpassword !== req.body.password) {
    return res.status(401).json('Wrong password');
  }
  res.status(200).json({...others,accessToken})
}
catch(err){
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
}
})

module.exports =router;




















  