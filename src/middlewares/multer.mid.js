import multer from "multer";
import { Storage } from "@google-cloud/storage";
import __dirname from "../../utils.js";
import environment from "../utils/env.utils.js";
import path from "path";
import fs from "fs";

const { GOOGLE_PROYECT_ID, GOOGLE_B64_SECRET } = environment;

if (!GOOGLE_B64_SECRET) {
  throw new Error('La variable de entorno GOOGLE_B64_SECRET no está definida.');
}

// Decodifica la cadena Base64 y guarda el archivo JSON temporalmente solo una vez
const keyFilenamePath = path.join(__dirname, "/temp-keyfile.json");

if (!fs.existsSync(keyFilenamePath)) {
  fs.writeFileSync(keyFilenamePath, Buffer.from(GOOGLE_B64_SECRET, 'base64').toString('utf-8'));
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
