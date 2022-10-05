const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

//Extrate user payload data
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // console.log("jwt_payload",jwt_payload)
      User.findById(jwt_payload.id)
        .then((user) => {
          // console.log("User",user)
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log('Passport Failed to Send Response'));
    })
  );
};
