//modules
import express from 'express';
// import { engine } from "express-handlebars"
import { createServer } from "http"
import { Server } from "socket.io"
import cookieParser from "cookie-parser";
import cors from "cors"
// import Handlebars from "handlebars"
import compression from 'express-compression';
// import session from "express-session"
// import morgan from 'morgan';
import cluster from 'cluster';
import { cpus } from 'os';
import { serve, setup } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import socketCb from "./src/routers/index.socket.js"
//middlewares
import indexRouter from './src/routers/index.router.js';
import pathHandler from './src/middlewares/pathHandler.mid.js'
import errorHandler from './src/middlewares/errorHandler.mid.js';
import winston from './src/middlewares/winston.mid.js';
//server data
import environment from './src/utils/env.utils.js';
import __dirname from "./utils.js"
import swaggerOptions from './src/utils/swagger.js';
import argsUtil from './src/utils/args.util.js';




//http server
const server = express();
const port = environment.PORT
const ready = async () => {
    console.log(`Server listening on port ${port}`);
}
const nodeServer = createServer(server)
const numOfProc = cpus().length
if(cluster.isPrimary) {
for (let i=1; i<=numOfProc; i++) {
cluster.fork()
}
console.log("proceso primario");
} else {
console.log("proceso worker "+process.pid);
nodeServer.listen(port, ready);
}

//tcp server
const socketServer = new Server(nodeServer, {
  cors: {
    origin: true,
    credentials: true
  }
})
socketServer.on("connection", socketCb)


//template engine (handlebars)
// server.engine("handlebars",engine())
// server.set('view engine', 'handlebars')
// server.set('views', __dirname + '/src/views')
// Handlebars.registerHelper('equal', function(value1, value2, options) {
//   if (value1 === value2) {
//       return true
//   } else {
//       return false
//   }
// });

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
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

server.use(cors(corsOptions));

server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(
  compression({
  brotli: { enabled: true, zlib: {} },
  })
);
const specs = swaggerJSDoc(swaggerOptions)



//endpoints
// //solo documentar en caso de estar en desarrollo o testing
if(argsUtil.env === "dev" || argsUtil.env === "test") {
  server.use("/api/docs", serve, setup(specs))
}
server.use('/', indexRouter)
server.use(errorHandler);
server.use(pathHandler)
server.use(winston);

