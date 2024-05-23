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
    return next()
  } catch (error) {
    return next(error)
  }
}

export default isValidUser