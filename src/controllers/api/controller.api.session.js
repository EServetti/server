

async function register (req, res, next) {
    try {
      return res.message201("The account has been created!");
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
  
  async function login (req, res, next) {
    try {
      return res.cookie("token", req.user.token, { signedCookie: true, maxAge:3600000 }).message200("You're welcome!");
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
  
  async function signout (req, res, next) {
    try {
      const online = req.cookies.token;
        res.clearCookie("token")
        return res.message200("Loged out!");
    } catch (error) {
      return next(error);
    }
  }

export {register, login, data, signout}