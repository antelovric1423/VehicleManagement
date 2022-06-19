import express from 'express';
import { vehiclesGetAll, vehiclesPost, vehiclesDeleteById, vehiclesPut } from './controller';
import { makeHandlerAwareOfAsyncErrors } from "../helpers";

const vehiclesRouter = express.Router();

vehiclesRouter.get('/', makeHandlerAwareOfAsyncErrors(vehiclesGetAll))
  .post('/', makeHandlerAwareOfAsyncErrors(vehiclesPost))
  .put('/:id', makeHandlerAwareOfAsyncErrors(vehiclesPut))
  .delete('/:id', makeHandlerAwareOfAsyncErrors(vehiclesDeleteById));

export default vehiclesRouter;
