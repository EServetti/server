import multer from "multer";
import { Storage } from "@google-cloud/storage";
import __dirname from "../../utils.js";
import environment from "../utils/env.utils.js";
import path from "path";
import fs from "fs";

const { GOOGLE_PROYECT_ID, GOOGLE_SECRET_KEY } = environment;

if (!GOOGLE_SECRET_KEY) {
  throw new Error('La variable de entorno GOOGLE_SECRET_KEY no está definida.');
}

// Guarda el archivo JSON temporalmente solo una vez
const keyFilenamePath = path.join(__dirname, "/temp-keyfile.json");
let keyJson;
keyJson = JSON.parse(GOOGLE_SECRET_KEY);



if (!fs.existsSync(keyFilenamePath)) {
  fs.writeFileSync(keyFilenamePath, JSON.stringify(keyJson));
}

const storage = new Storage({
  projectId: GOOGLE_PROYECT_ID,
  keyFilename: keyFilenamePath,
});

const bucketName = "everithingforyourhome";

const uploader = multer({
  storage: multer.memoryStorage(),
});

const uploadFile = (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const bucket = storage.bucket(bucketName);
    const fileName = Date.now() + "-" + req.file.originalname;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      const error = new Error(err.message);
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