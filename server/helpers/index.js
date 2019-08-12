const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
    HashingPassword : (password)=>{
        console.log(password , ' di helpers')
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash
    },
    ComparePassword : (passwordDiDb , passwordInput)=>{
        console.log(passwordDiDb , passwordInput , ' ini di helpers =<><><><><>')
        return bcrypt.compareSync( passwordInput , passwordDiDb); 
    },
    Token : (data)=>{
        console.log(data , '=======<><>')
        console.log(process.env.SECRET)
        return jwt.sign({
            data 
        } , process.env.SECRET)
    },
    TokenVerify : (token)=>{
        return jwt.verify(token , process.env.SECRET)
    }
}