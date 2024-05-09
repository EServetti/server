import userManager from "../data/mongo/managers/UserManager.db.js";

async function isValidPass(req, res, next) {
  try {
    const { email, password } = req.body;
    const one = await userManager.readByEmail(email);
    const correct = one.password === password;
    if (correct) {
      return next()
    }
    else {
      const error = new Error("Bad auth!");
      error.statusCode = 401;
      throw error
    }
  } catch (error) {
    return next(error)
  }
}
export default isValidPass