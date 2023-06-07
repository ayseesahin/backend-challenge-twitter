const router = require('express').Router();
const userModel = require('../users/users-model');
const { isEmailExist, hashPassword, passwordCheck } = require('./auth-middleware');
const { payloadCheck } = require('../users/users-middleware');



router.post('/register', payloadCheck, hashPassword, async (req,res,next)=>{
    try {
        const payload = req.body;
        const user = await userModel.create(payload);
        if (user) {
            res.json({message: `Merhaba ${user.firstName}...`})
        } else {
            next({status: 400, message: "Kayıt sırasında hata oluştu!.."})
        }
    } catch(err){
        next(err)
    }
})

router.post('/login', isEmailExist, passwordCheck, async (req,res,next)=>{
    try {
        const user = req.user;
        const token = "ssh";
        res.json({message: `Welcome back ${user.firstName}...`, token})

    } catch(err){
        next(err)
    }
})

module.exports = router;
