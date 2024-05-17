import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import CustomStrategy from "passport-custom"
import { createHash, compareHash } from "../utils/hash.js";
import userManager from "../data/mongo/managers/UserManager.db.js";

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
            req.session.email = email;
            req.session.name = one.name;
            req.session.age = one.age
            req.session.role = one.role;
            req.session.photo = one.photo;
            req.session._id = one._id;
            return done(null, one);
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
  new CustomStrategy( async (req, done) => {
    try {
      const email = req.session.email;
      if (email) {
        const {email, age, name, role, photo} = req.session
        const one = {
          email,
          age,
          name,
          role,
          photo
        }
        req.body = one
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

//passport para crear un carrito

//register/login con Google


export default passport;
