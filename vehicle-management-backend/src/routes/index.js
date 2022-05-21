import express from 'express';
import { indexPage } from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/vehicles', indexPage)
    .post('/vehicles', indexPage)
    .delete('/vehicles', indexPage);

export default indexRouter;
