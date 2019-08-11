const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')
const User = require('../models/User')

class controllerUser{
    static create(req,res,next){
        let {name,email,password,birthday_date,todo} = req.body
        password = bcrypt.hashPassword(password)
        User.create({
            name,
            email,
            password,
            birthday_date,
            todo
        })
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    
    static login(req,res,next){
        const{email,password} = req.body
        User.findOne({email})
            .then(data=>{
                if(data){
                    if(bcrypt.comparePassword(password,data.password)){
                        const {_id, name,email,birthday_date} = data
                        req.headers.token = jwt.generateToken({_id,name,email,birthday_date})
                        res.json(req.headers.token)
                    }else{
                        res.status(404).json({message : 'invalid password/username'})
                    }  
                }else{
                    res.status(404).json({message : 'invalid password/username'})
                }
            })
            .catch(err=>{
                next(err)
            })
    }

    static googleLogin(req,res,next){
        const {token} = req.body
        console.log(token);
        console.log(process.env.CLIENT_ID);
        client.verifyIdToken({
            idToken : token,
            audience : process.env.CLIENT_ID
        })
        .then(ticket=>{
            const payload = ticket.getPayload();
            console.log(payload);
            User.findOne({
                email : payload.email
            })
            .then(user=>{
                if(user){
                    console.log('data ada di db')
                    const {name,email,birthday_date} = user
                    return {name,email,birthday_date}
                }else{
                    console.log('membuat data')
                    const {name,email} = payload
                    User.create({
                        name,
                        email,
                        password : bcrypt.hashPassword(process.env.DEFAULT_PASSWORD)
                    })
                    return {name,email}
                }
            })
            .then(data=>{
                let tokenCreated = jwt.generateToken(data)
                req.headers.token = tokenCreated
                res.json(req.headers.token)
                console.log(req.headers.token);
            })
            
        })
        .catch(err=>next(err))
    }

}

module.exports = controllerUser