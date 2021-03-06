import { Router } from 'express';

import userRouter from './user.routes';
import authRouter from './auth.routes';
import balanceRouter from './balance.routes';

import { ensureAuthenticatedMiddleware } from '../middlewares';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({
    Author: 'Augusto Vinicius',
    Github: 'https://github.com/adoidadox2',
    Project: 'linkapi-node',
    Version: '1.0.0',
    Status: 'Online',
  });
});

routes.use('/users', userRouter);
routes.use('/auth', authRouter);
routes.use('/balances', ensureAuthenticatedMiddleware, balanceRouter);

export default routes;
