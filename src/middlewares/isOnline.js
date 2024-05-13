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