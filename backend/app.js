import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import vehiclesRouter from './vehicles/router';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/vehicles', vehiclesRouter);

export default app;