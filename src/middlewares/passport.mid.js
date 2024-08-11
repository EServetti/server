import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import CustomStrategy from "passport-custom";
import { createHash, compareHash } from "../utils/hash.js";
import {
  readByEmailService,
  createService,
} from "../service/users.api.service.js";
import { createToken, verifyToken } from "../utils/jwt.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import environment from "../utils/env.utils.js";
import { sendEmail } from "../utils/mailing.util.js";
import CustomError from "../utils/errors/customError.js";
import errors from "../utils/errors/errors.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        //Si no se ingresan los datos email o password no funciona el passport, por lo tanto se debe seguir utilizando el midd isValidData
        //Revisa que no exista anteriormente un user con este email
        const exist = await readByEmailService(email);
        if (exist) {
          const error = CustomError.new(errors.auth);
          return done(error);
        }
        const one = await createService(req.body);
        const data = { to: email, name: one.name, verifyCode: one.verifyCode };
        await sendEmail(data);
        return done(null, one);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        //Error si no existe un user con ese email
        const one = await readByEmailService(email);
        if (!one) {
          const error = CustomError.new(errors.auth);
          return done(error);
        }
        //Error si el password no coincide con el user
        else {
          const correct = compareHash(password, one.password);
          if (!correct || !one.verify) {
            const error = CustomError.new(errors.invalid);
            return done(error);
          } else {
            const data = {
              email,
              name: one.name,
              age: one.age,
              role: one.role,
              photo: one.photo,
              _id: one._id,
              phone: one.phone,
              complete: one.complete
            };
            const token = createToken(data);
            data.token = token;
            return done(null, data);
          }
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

//devuelve los datos del user
passport.use(
  "data",
  new CustomStrategy(async (req, done) => {
    try {
      const token = req.cookies.token;
      if (token) {
        const data = verifyToken(token);
        const one = {
          email: data.email,
          age: data.age,
          name: data.name,
          role: data.role,
          photo: data.photo,
          _id: data._id,
          phone: data.phone,
          complete: data.complete
        };
        req.body = one;
        return done(null, one);
      } else {
        const error = CustomError.new(errors.notLogged);
        return done(error);
      }
    } catch (error) {
      return done(error);
    }
  })
);

//register/login con Google
passport.use(
  "Google",
  new GoogleStrategy(
    {
      clientID: environment.GOOGLE_CLIENT_ID,
      clientSecret: environment.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://server-production-f97c.up.railway.app/session/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let one = await readByEmailService(profile.id);
        if (!one) {
          one = {
            email: profile.id,
            name: profile.name.givenName,
            photo: profile.picture,
            password: createHash(profile.id),
            role: 0,
            verify: true,
          };
          await createService(one);
        }
        const two = await readByEmailService(profile.id);
        const data = {
          email: two.email,
          name: two.name,
          role: two.role,
          age: two.age,
          photo: two.photo,
          _id: two._id,
          phone: two.phone,
          complete: two.complete
        };
        const token = createToken(data);
        data.token = token;
        return done(null, data);
      } catch (error) {
        done(error);
      }
    }
  )
);

//isAuth con jwt
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: process.env.SECRET_JWT,
    },
    (data, done) => {
      try {
        if (data) {
          return done(null, data);
        } else {
          const error = CustomError.new(errors.notLogged);
          return done(error);
        }
      } catch (error) {
        return error;
      }
    }
  )
);

export default passport;
