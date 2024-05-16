async function isValidData(req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const age = req.body.age
    if (!email || !password || !name || !age) {
      const error = new Error(
        "You must enter at least email, password, date of birth, and name"
      );
      error.statusCode = 400;
      throw error;
    }
    return next()
  } catch (error) {
    return next(error);
  }
}

export default isValidData