import express from 'express';
import errorHandler from './src/middlewares/errorHandler.mid.js';
import pathHandler from './src/middlewares/pathHandler.mid.js'
import indexRouter from './src/routers/index.router.js';
import morgan from 'morgan';

//servidor
const server = express();
const port = 8080;
const ready = () => {
    console.log(`Server listening on port ${port}`);
}

server.listen(port, ready)  

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }))

//endpoints
server.use('/', indexRouter)
server.use(morgan('combined'));
server.use(errorHandler);
server.use(pathHandler)
