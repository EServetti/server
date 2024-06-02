import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import CustomStrategy from "passport-custom";
import { createHash, compareHash } from "../utils/hash.js";
import userManager from "../data/mongo/managers/UserManager.db.js";
import { createToken, verifyToken } from "../utils/jwt.js"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        //Si no se ingresan los daros email o password no funciona el passport, por lo tanto se debe seguir utilizando el midd isValidData
        //Revisa que no exista anteriormente un user con este email
        const exist = await userManager.readByEmail(email);
        if (exist) {
          const error = new Error("Bad auth from register!");
          error.statusCode = 401;
          return done(error);
        }
        const hashPassword = createHash(password);
        req.body.password = hashPassword;
        const one = await userManager.create(req.body);
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
        const one = await userManager.readByEmail(email);
        if (!one) {
          const error = new Error("Bad auth!");
          error.statusCode = 401;
          return done(error);
        }
        //Error si el password no coincide con el user
        else {
          const correct = compareHash(password, one.password);
          if (!correct) {
            const error = new Error("Invalid credentials!");
            error.statusCode = 401;
            return done(error);
          } else {
            const data = {
              email,
              name: one.name,
              age: one.age,
              role: one.role,
              photo: one.photo,
              _id: one._id
            }
            const token = createToken(data)
            data.token = token
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
        const data = verifyToken(token)
        const one = {
          email: data.email,
          age: data.age,
          name: data.name,
          role: data.role,
          photo: data.photo,
          _id: data._id
        };
        req.body = one;
        return done(null, one);
      } else {
        const error = new Error("You must login!");
        error.statusCode = 401;
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
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/session/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let one = await userManager.readByEmail(profile.id);
        if (!one) {
          one = {
            email: profile.id,
            name: profile.name.givenName,
            photo: profile.picture,
            password: createHash(profile.id),
            role: 0,
          };
          await userManager.create(one);
        }
        const two = await userManager.readByEmail(profile.id);
        const data = {
          email: two.email,
          name: two.name,
          role: two.role,
          age: two.age,
          photo: two.photo,
          _id: two._id
        }
        const token = createToken(data)
        data.token = token
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
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([
      (req) => req?.cookies["token"],
    ]),
    secretOrKey: process.env.SECRET_JWT
  },
  (data, done) => {
    try {
      if(data){
        return done(null, data)
      } else{
        const error = new Error("You must login!");
        error.statusCode = 401;
        return done(error);
      }
    } catch (error) {
      return(error)
    }
  }
)
);

export default passport;
