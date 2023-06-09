const router = require('express').Router();
const userModel = require('../users/users-model');
const { isEmailExist, hashPassword, passwordCheck, generateToken, restricted, logout } = require('./auth-middleware');
const { payloadCheck } = require('../users/users-middleware');



router.post("/register", payloadCheck, hashPassword, async (req, res, next) => {
    const { username, password, email, avatar_url } = req.body;
  
    const newUser = { 
      username: username,
      password: password,
      email: email,
      avatar_url: avatar_url,
    };
  
    try {
      const insertedUser = await userModel.create(newUser);
      res
        .status(201)
        .json({ message: "User successfully created.", insertedUser });
    } catch (error) {
      next(error);
    }
  });

router.post('/login', isEmailExist, passwordCheck, generateToken, async (req,res,next)=>{
    try {
        const user = req.user;
        const token = user.token;
        res .status(200).json({message: `Welcome back ${user.username}...`, token})

    } catch(err){
        next(err)
    }
})

router.get('/logout', restricted, logout, async (req,res,next)=>{
  try {
      const username = req.decodedUser.username;
      res.json({message: `Get back soon ${username}...`})

  } catch(err){
      next(err)
  }
})



module.exports = router;
