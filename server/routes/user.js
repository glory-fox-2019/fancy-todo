const router = require('express').Router()

router.get('/',(req,res) => {
    res.send('aaaa')
})

router.post('/login',function(req,res,next){
    console.log("aaaas")
    res.json("LOGIN")
})

router.post('/register',function(req,res,next){
    res.json("REGISTER")
})

module.exports = router