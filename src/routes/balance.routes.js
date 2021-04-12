import { Router } from 'express';

import { BalanceController } from '../controllers';

const balanceRouter = Router();

balanceRouter.get('/', BalanceController.index);

export default balanceRouter;
