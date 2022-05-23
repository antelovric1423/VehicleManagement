import express from 'express';
import { indexPage, vehiclesGetAll, vehiclesPost, vehiclesDeleteById } from '../controllers';

const indexRouter = express.Router();

function makeHandlerAwareOfAsyncErrors(handler) {
    return async function (req, res, next) {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    };
}

indexRouter.get('/', makeHandlerAwareOfAsyncErrors(indexPage))
    .get('/vehicles', makeHandlerAwareOfAsyncErrors(vehiclesGetAll))
    .post('/vehicles', makeHandlerAwareOfAsyncErrors(vehiclesPost))
    .delete('/vehicles/:id', makeHandlerAwareOfAsyncErrors(vehiclesDeleteById));

export default indexRouter;
