import passport from "passport";

function passportCb(strategy) {
  return (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if(error) {
        console.log(error);
        return next(error)
      }
      if(user) {
        req.user = user
        next()
      }
      if(info){
        return res.json({
          statusCode: info.statusCode || 401,
          message: info.messages? info.messages: info.toString
        })
      }
    })(req, res, next)
  }
}

export default passportCb