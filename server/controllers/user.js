const User = require('../models/user');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { jwtSign, jwtVerify } = require('../helper/jwt');

class UserController {
  static findAll(req, res, next) {

  }

  static signIn(req, res, next) {
    // console.log(req.body);
    const { username, password } = req.body;
    User.findOne({username})
    .then(one => {
      if (one && one.password === password) {
        res.status(200).json({message: "berhasil sign in"});
      } else {
        res.status(403).json({message: "gagal sign in"});
      }
    })

  }

  static googleSignIn(req, res, next) {
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      return Promise.all([payload, User.findOne({
        email: payload.email
      })])
    })
    .then(([payload, existUser]) => {
      if (existUser) {
        return existUser;
      } else {
        return User.create({
          username: payload.email.split('@')[0],
          full_name: payload.name,
          password: 'd341o0>\][ asdliqhb ocqyvcxicbjh xqhxioayvcquhe yxv OUcy qj$%453@#@%^6',
          email: payload.email
        })
      }
    })
    .then((data) => {
      const {username, full_name, email} = data;
      const token = jwtSign({username, full_name, email});
      // console.log('>>>>>>>> Server', token);
      res.status(200).json({token});
    })
    .catch((err) => {
      res.status(401)
    })
  }


}

module.exports = UserController;