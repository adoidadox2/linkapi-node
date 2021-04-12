import { Router } from 'express';

import { AuthSessionController } from '../controllers';
import {
  authSessionMiddleware,
  expressValidatorMiddleware,
} from '../middlewares';

const authRouter = Router();

authRouter.post(
  '/session',
  authSessionMiddleware.storeRules,
  expressValidatorMiddleware.result,
  AuthSessionController.store,
);

export default authRouter;
