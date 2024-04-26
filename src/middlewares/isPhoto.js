function isPhoto(req, res, next) {
    try {
      if (req.file) {
        const filename = req.file.filename;
        req.body.photo = "/img/" + filename; 
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  export default isPhoto;