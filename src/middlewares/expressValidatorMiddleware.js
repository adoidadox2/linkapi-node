import { validationResult } from 'express-validator';
import AppError from '../errors/AppError';

const expressValidatorMiddleware = {
  result: (request, response, next) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      throw new AppError(
        'Verify the given informations and try again',
        errors.array(),
        401,
      );
    }

    return next();
  },
};

export default expressValidatorMiddleware;
