
//Middleware para redireccionar al inicio en el caso de que la sesison expire.
async function isOnline (req, res, next) {
  try {
    const online = req.session.email;
    if (online) {
      next()
    }
    else {
      res.redirect("/")
    }
  } catch (error) {
    return error
  }
}

export default isOnline;