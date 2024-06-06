import { Router } from 'express';
import errorHandler from '../middlewares/errorHandler.mid.js'
import apiRouter from './api/index.api.js';
import viewsRouter from './views/index.views.js';
import CustomRouter from './customRouter.js';


class IndexRouter extends CustomRouter {
   init() {
    this.use('/api', apiRouter);
    this.use("/", viewsRouter);
   }
}
 const indexRouter= new IndexRouter()

export default indexRouter.getRouter();