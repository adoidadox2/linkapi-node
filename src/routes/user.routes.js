import { Router } from 'express';

import { UserController } from '../controllers';
import { userMiddleware, expressValidatorMiddleware } from '../middlewares';

const userRouter = Router();

userRouter.get('/', UserController.index);

userRouter.post(
  '/',
  userMiddleware.storeRules,
  expressValidatorMiddleware.result,
  UserController.store,
);

export default userRouter;
