import { Router } from 'express';
import errorHandler from '../middlewares/errorHandler.mid.js'
import apiRouter from './api/index.api.js';
import usersRouter from './api/users.api.js';

const indexRouter = Router();

indexRouter.use('/api', apiRouter);

export default indexRouter;