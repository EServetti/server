import { config } from "dotenv";
import argsUtil from "./args.util.js";

const {env} = argsUtil
console.log(env);
let path = ""
if(env === "prod"){
    path = "./.env.prod"
}else if(env === "dev") {
    path = "./.env.dev"
} else {
    path = "./.env.test"
}
config({path})

const environment = {
MONGO_URI : process.env.MONGO_URI,
PORT : process.env.PORT,
SECRET_COOKIE : process.env.SECRET_COOKIE,
SECRET_SESSION : process.env.SECRET_SESSION,
GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,
SECRET_JWT : process.env.SECRET_JWT,
GOOGLE_EMAIL : process.env.GOOGLE_EMAIL,
GOOGLE_PASSWORD : process.env.GOOGLE_PASSWORD,
GOOGLE_PROYECT_ID : process.env.GOOGLE_PROYECT_ID,
GOOGLE_SECRET_KEY: process.env.GOOGLE_SECRET_KEY,
STRIPE_PUBLIC_KEY : process.env.STRIPE_PUBLIC_KEY,
STRIPE_SECRET_KEY : process.env.STRIPE_SECRET_KEY,
STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET
}

export default environment