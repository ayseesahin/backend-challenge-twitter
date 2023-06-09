const router = require('express').Router();
const userModel = require('./users-model');
const { payloadCheck, isIdExist } = require('./users-middleware');


router.get('/', async (req,res,next)=>{
    try {
        const users = await userModel.getAll();
        res.json(users);
    } catch (err) {
        next(err)
    }
})

router.get('/:id', isIdExist, async (req,res,next)=>{
    try {
        const { id } = req.params;
        const user = await userModel.getById(id);
        res.json(user);
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', isIdExist, async (req,res,next)=>{
    try {
        const { id } = req.params;
        const count = await userModel.remove(id);
        if(count){
            res.json({message: `${id}'li kullanıcı silindi.`})
        } else {
            res.status(404).json({message: `${id} id'li kullanıcı bulunamadı!...`})
        }
        
    } catch (err) {
        next(err)
    }
})

router.put('/:id', payloadCheck, isIdExist, async (req,res,next)=>{
    try {
        const { id } = req.params;
        const payload = req.body;
        const count = await userModel.update(id, payload);
        if(count){
            res.json({message: `${id}'li kullanıcı güncellendi.`})
        } else {
            res.status(404).json({message: `${id} id'li kullanıcı güncellenemedi!...`})
        }
    } catch (err) {
        next(err)
    }
})


module.exports = router;