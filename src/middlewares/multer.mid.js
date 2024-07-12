import multer from "multer";
import { Storage } from "@google-cloud/storage";
import __dirname from "../../utils.js";
import environment from "../utils/env.utils.js";
import path from "path";

const { GOOGLE_PROYECT_ID } = environment;

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, __dirname + "/public/img/users-img"),
//   //filename: (req, file, cb) => cb(null, crypto.randomBytes(12).toString("hex"))
//   filename: (req, file, cb) => cb(null, file.originalname),
// });

// const uploader = multer({ storage });
// export default uploader;

const storage = new Storage({
  projectId: GOOGLE_PROYECT_ID,
  keyFilename: path.join(__dirname, "/coderhouse-server-e3271927dc20.json"),
});

const bucketName = "everithingforyourhome";

const uploader = multer({
  storage: multer.memoryStorage(),
});

const uploadFile = (req, res, next) => {
  try {
    if (!req.file) {
      return res.error400("You must upload a file!");
    }

    const bucket = storage.bucket(bucketName);
    const fileName = Date.now() + "-" + req.file.originalname;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      const error = new Error(
        err.message
      );
      throw error;
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      req.body.photo = publicUrl;
      next();
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    return next(error);
  }
};

export { uploader, uploadFile };
