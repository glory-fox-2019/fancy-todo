const Model = require('../models');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt = require('../helpers/jwt');
const bcrypt = require('../helpers/bcrypt');

class User {
  static loginWithGoogle(req,res,next){
    let googlePayload;
    client.verifyIdToken({
      idToken: req.body.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then((ticket) => {
      googlePayload = ticket.getPayload();
      return Model.User
          .findOne({email: googlePayload.email})
    })
    .then((data) => {
      if(data) return data
      return Model.User
        .create({
          username: googlePayload.email.match(/[^@]+/)[0],
          email: googlePayload.email,
          password: process.env.DUMMYPASSWORD,
        })
    })
    .then((data) => {
      let payload = {
        username: data.username,
        email: data.email
      }
      payload = jwt.generateToken(payload);
      res.json(payload);
    })
    .catch(next)
  }
  static getUser(req,res,next){
    let payload = jwt.decodeToken(req.headers.token);
    Model.User
      .findOne({
        email: payload.email
      })
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Not Found!'})
        res.json(data);
      })
      .catch(next)
  }
  // static login(req,res,next){
  //   Model.User
  //     .findOne({
  //       username: req.body.username,
  //       password: req.body.password
  //     })
  // }
}

module.exports = User;