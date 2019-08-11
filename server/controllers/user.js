const User = require('../models/user')
const {verifyPassword} = require('../helpers/bcrypt')
const {createToken} = require('../helpers/jwt')

class UserController {
    static register(req,res,next){
        const {firstname,lastname,email,password} = req.body
        User.create({firstname,lastname,email,password})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static login(req,res,next){
        const {email,password} = req.body
        User.findOne({email})
        .then(data => {
            if(data){
                if (verifyPassword(password,data.password)){
                    
                    let token = createToken(data)
                    const {firstname,id} = data
                    res.status(200).json({token, firstname, id})
                } else {
                    res.status(404).json('message : Email not found')
                }
            } else {
                res.status(404).json('message : Email not found')
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json('error')
        })
    }

}

// let input = {firstname : "a", lastname:"b", email:"abc@gmail.com" , password:"as123"}
// UserController.register(input)

module.exports = UserController