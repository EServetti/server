import userManager from "../data/mongo/managers/UserManager.db.js";

async function isValidUser(req, res, next) {
  try {
    const { email, password } = req.body
    const one = await userManager.readByEmail(email)
    if(!email || !password){
      const error = new Error("You must enter the email and password");
      error.statusCode = 401;
      throw error
    }
    else if(one) {
      return next()
    }
    else{
      const error = new Error("Bad auth!");
      error.statusCode = 401;
      throw error
    }
  } catch (error) {
    return next(error)
  }
}

export default isValidUser