import express from 'express';
import { testEnvVariable } from '../settings';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) =>
  res.status(200).json({ message: testEnvVariable })
);

export default indexRouter;
