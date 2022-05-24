import express from 'express';
import { vehiclesGetAll, vehiclesPost, vehiclesDeleteById } from './controller';
import { makeHandlerAwareOfAsyncErrors } from "../helpers";

const vehiclesRouter = express.Router();

vehiclesRouter.get('/', makeHandlerAwareOfAsyncErrors(vehiclesGetAll))
    .post('/', makeHandlerAwareOfAsyncErrors(vehiclesPost))
    .delete('/:id', makeHandlerAwareOfAsyncErrors(vehiclesDeleteById));

export default vehiclesRouter;
