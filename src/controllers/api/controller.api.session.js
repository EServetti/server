import { readByEmailService, updateService } from "../../service/users.api.service.js";
import { recovePassword } from "../../utils/mailing.password.js";
import usersRepository from "../../repositories/usersRepository.js";
import { createHash } from "../../utils/hash.js";

async function register (req, res, next) {
    try {
      return res.message201("We've sent you a verification mail!");
    } catch (error) {
      return next(error);
    }
  }
  
  async function login (req, res, next) {
    try {
      return res.cookie("token", req.user.token, { secure: true, sameSite: 'None', signedCookie: true, maxAge:3600000 }).message200("You're welcome!");
    } catch (error) {
      return next(error);
    }
  }
  
  async function data (req, res, next) {
    try {
      const one = req.body;
      res.message200(one);
    } catch (error) {
      return next(error);
    }
  }

  async function authenticate (req, res, next) {
    try {
      const {email, verifyCode } = req.query
      const one = await readByEmailService(email)
      const verified = verifyCode === one.verifyCode
      if(!verified) {
        return res.error400("Invalid credentials!")
      } else {
        await updateService(one._id, {
          verify: true
        })
        const message = `The account ${one.email} has been authenticated!`
        return res.message200("The account has been verified!")
      }
    } catch (error) {
      return next(error)
    }
  }
  
  async function signout (req, res, next) {
    try {
      const online = req.cookies.token;
        res.clearCookie("token", { secure: true, sameSite: "None"})
        return res.message200("Loged out!");
    } catch (error) {
      return next(error);
    }
  }

  async function password (req, res, next) {
    try {
      const {email} = req.body
      const one = await usersRepository.readByEmailRepository(email)
      const {_id} = one
      const data = {
        email,
        _id
      }
      recovePassword(data)
      return res.message200("We've sent you an email")
    } catch (error) {
      return next(error)
    }
  }

  async function passwordUpdate(req, res, next) {
    try {
      const {uid, password} = req.body
      if(!uid) {
        return res.error400("Please enter the uid!")
      }
      const pass = createHash(password)
      const data = {
        password: pass
      }
      const one = await usersRepository.updateRepository(uid, data)
      if(!one) {
        return res.error404()
      }
      return res.message200(one)
    } catch (error) {
      return next(error)
    }
  }

export {register, login, data, authenticate, signout, password, passwordUpdate}