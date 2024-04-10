import express from 'express';
import errorHandler from './src/middlewares/errorHandler.mid.js';
import pathHandler from './src/middlewares/pathHandler.mid.js'
import indexRouter from './src/routers/index.router.js';
import morgan from 'morgan';
import { engine } from "express-handlebars"
import __dirname from "./utils.js"
import { createServer } from "http"
import { Server } from "socket.io"

//http server
const server = express();
const port = 8080;
const ready = () => {
    console.log(`Server listening on port ${port}`);
}
 const nodeServer = createServer(server)
nodeServer.listen(port, ready)

//tcp server
const socketServer = new Server(nodeServer)

//template engine (handlebars)
server.engine("handlebars",engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }))

//endpoints
server.use('/', indexRouter)
server.use(morgan('combined'));
server.use(errorHandler);
server.use(pathHandler)
