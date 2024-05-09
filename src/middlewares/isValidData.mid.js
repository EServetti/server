import userManager from "../data/mongo/managers/UserManager.db.js";

async function isvalidData (req, res, next) {
  try {
    const { email, password, name} = req.body;
    if(!email || !password || !name) {
      const error = new Error("You must enter at least email, password and name");
      error.statusCode = 401;
      throw error
    }
    else {
      return next()
    }
  } catch (error) {
    return next(error)
  }
}

export default isvalidData