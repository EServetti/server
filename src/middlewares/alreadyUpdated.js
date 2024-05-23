import userManager from "../data/mongo/managers/UserManager.db.js";

async function alreadyUpdated(req, res, next) {
  try {
    const { _id } = req.session
    const one = await userManager.readOne(_id);
    if (one.role === 1) {
      const error = new Error("You have already updated your role!");
      error.statusCode = 401;
      throw error;
    }
    return next()
  } catch (error) {
    return next(error);
  }
}

export default alreadyUpdated