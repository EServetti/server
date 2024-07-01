import environment from './src/utils/env.utils.js';
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
// import session from "express-session"
import cookieParser from "cookie-parser";
import cors from "cors"
import Handlebars from "handlebars"
import compression from 'express-compression';


//http server
const server = express();
const port = environment.PORT
const ready = async () => {
    console.log(`Server listening on port ${port}`);
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
Handlebars.registerHelper('equal', function(value1, value2, options) {
  if (value1 === value2) {
      return true
  } else {
      return false
  }
});

//middlewares
server.use(cookieParser(environment.SECRET_COOKIE))
// server.use(
//     session({
//       store: new MongoStore({
//         mongoUrl: process.env.MONGO_URI,
//         ttl: 60 * 60
//       }),
//       secret: process.env.SECRET_SESSION,
//       resave: true,
//       saveUninitialized: true
//     })
//   );
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(cors({
  origin: true, 
  credentials: true 
}
))
server.use(
  compression({
  brotli: { enabled: true, zlib: {} },
  })
  );


//endpoints
server.use('/', indexRouter)
server.use(morgan('dev'));
server.use(errorHandler);
server.use(pathHandler)