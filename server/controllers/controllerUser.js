const axios = require('axios')
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

}

module.exports = controllerUser