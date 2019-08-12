const jwt = require('jsonwebtoken');
const { TokenVerify} = require('../helpers')
const { Todo } = require('../Models')
module.exports = {
    VerifyToken : (token)=>{
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            console.log(decoded , ' di middelware')
            req.decoded = decoded
          } catch(err) {
            // err
          }
    },
    Authenthication : (req,res,next)=>{
        try {
         
          console.log(req.headers)
          const decoded = TokenVerify(req.headers.token)
          let temp = {...decoded}
          if( typeof decoded.data == 'string'){
            decoded.data = {};
            decoded.data._id = temp.data;
          }
          console.log(decoded , ' di middelware');
          req.decode = decoded;
          console.log(req.decode);
          // req.decode.data._id = 
          // console.log(req.decode , ' ---------------------------<><><><><> di middelware auth ccccccccccccc')
          next()
        }catch (err){+
          res.status(403).json({
            message : "anda tidak memilik akses"
          })
        }
    },
    Authorized : (req,res,next)=>{
      Todo.findOne({
        _id : req.params.id,
        User : req.decode.data._id
      })
      .then(user=>{
        console.log(' sampai di authorized middelware' , user , '<<<<<===========')
        if(user){
          next()
        }else {
          res.status(403).json({
            message : "You don't have access"
          })
        }
      })
      .catch(err=>{
        next(err)
      })
    }
}