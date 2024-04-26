/*import multer from "multer";
import __dirname from "../../utils.js";
import crypto from 'crypto';
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, __dirname + "/public/img"),
  filename: (req, file, cb) => {
    // Generar un nombre de archivo único
    const filename = crypto.randomBytes(12).toString("hex");
    const extension = path.extname(file.originalname);
    cb(null, `${filename}${extension}`)}
  });


const uploader = multer({ storage });
export default uploader;*/


import multer from "multer";
import __dirname from "../../utils.js";
//import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, __dirname + "/public/img"),
  //filename: (req, file, cb) => cb(null, crypto.randomBytes(12).toString("hex"))
  filename: (req, file, cb) => cb(null, file.originalname),
});

const uploader = multer({ storage });
export default uploader;