import "dotenv/config";
import express from 'express';
import errorHandler from './src/middlewares/errorHandler.mid.js';
import pathHandler from './src/middlewares/pathHandler.mid.js'
import indexRouter from './src/routers/index.router.js';
import morgan from 'morgan';
import { engine } from "express-handlebars"
import __dirname from "./utils.js"
import { createServer } from "http"
import { Server } from "socket.io"
import socketCb from "./src/routers/index.socket.js"
import dbConnect from './src/utils/DbConnection.js';
import session from "express-session"
import cookieParser from "cookie-parser";
import cors from "cors"

//http server
const server = express();
const port = process.env.PORT
const ready = async () => {
    console.log(`Server listening on port ${port}`);
    await dbConnect();
}
 const nodeServer = createServer(server)
nodeServer.listen(port, ready)

//tcp server
const socketServer = new Server(nodeServer)
socketServer.on("connection", socketCb)
export { socketServer }

//template engine (handlebars)
server.engine("handlebars",engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')

//middlewares
server.use(cookieParser(process.env.SECRET_COOKIE))
server.use(
    session({
      secret: process.env.SECRET_SESSION,
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 60 * 60 * 1000 },
    })
  );
  server.use(cors({
    origin: true, 
    credentials: true 
  }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(express.static("public"))


//endpoints
server.use('/', indexRouter)
server.use(morgan('dev'));
server.use(errorHandler);
server.use(pathHandler)
