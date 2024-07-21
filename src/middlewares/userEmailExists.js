import usersRepository from "../repositories/usersRepository.js";

async function userEmailExists(req, res, next) {
  try {
    const {email} = req.body;
    const all = await usersRepository.readRepository()
    const exist = all.find((u) => {
      u.email === email
    })
    if (!exist) {
      return res.error400("Invalid credentials!")
    }
    return next()
  } catch (error) {
    return next(error)
  }
}

export default userEmailExists