const JwtPassport = require("passport-jwt");
const dotenv = require("dotenv");

//Database Model
const { UserModel } = require("../database/user");

const JWTStratergy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "SRIAUTHAPP",
};

module.exports = (Passport) => {
  Passport.use(
    new JWTStratergy(options, async (jwt__payload, done) => {
      try {
        const doesUserExist = await UserModel.findById(jwt__payload.user);
        if (!doesUserExist) return done(null, false);

        return done(null, doesUserExist);
      } catch (error) {
        throw new Error(error);
      }
    })
  );
  Passport.serializeUser(function (user, done) {
    done(null, user);
  });

  Passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};
