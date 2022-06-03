import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { frontendAddress } from './settings';
import logger from 'morgan';
import vehiclesRouter from './vehicles/router';

const app = express();
app.use(cors({
  origin: frontendAddress
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/vehicles', vehiclesRouter);

export default app;
