const bcrypt = require("../helpers/bcryptjs-helper");
const jwt = require("../helpers/jwt-helper");
const User = require("../models/user");

class UserController {
  static createUser(req, res, next) {
    User.create({
      username: req.body.username.toLowerCase(),
      password: bcrypt.hashSync(req.body.password),
    })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }

  static login(req, res, next) {
    User.findOne({ username: req.body.username.toLowerCase() })
      .then(user => {
        if (!user) {
          res.status(401).json({ message: "Wrong username/password" });
          return;
        }

        const loggedIn = bcrypt.compareSync(req.body.password, user.password);
        if (!loggedIn) {
          res.status(401).json({ message: "Wrong username/password" });
          return;
        }

        const userData = {
          id: user._id,
          username: user.username
        };

        const token = jwt.sign(userData);
        req.headers.token = token;

        res.status(200).json({
          message: `Welcome back, ${user.username}!`,
          token: token
        });
      })

      .catch(err => {
        console.log(err);
        next();
      });
  }

  static googleLogin(req, res, next) {
    const { OAuth2Client } = require("google-auth-library");
    const client = new OAuth2Client(process.env.CLIENT_ID);
    console.log(client)

    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload();
        User.findOne({
          email: payload.email
        })
          .then(user => {
            if (user) {
              const { name, email} = user
              return { name, email}
            } else {
              const { name, email} = payload
              User.create({
                username: email,
                password: bcrypt.genSaltSync(10)
              })
              return { name, email}
            }
          })
          .then(data => {
            let tokenCreated = jwt.sign({
              id: data._id,
              username: data.email,
            }, process.env.JWT_SECRET)
            res.json({ token: tokenCreated })
          })
      })
      .catch(err => next(err))
  }
}

module.exports = UserController;
