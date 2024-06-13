import { readService  } from "../service/api/users.api.service.js";
async function exist (req, res, next) {
try { 
    const { email } = req.body;
    const all = await readService();
    const exist = all.some((user) => user.email === email);
    if (exist) {
      return res.error400("Bad auth!")
    } else {
        next()
    }
} catch (error) {
    return next(error)
}
}
export default exist