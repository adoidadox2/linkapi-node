import { check } from 'express-validator';

const authSessionMiddleware = {
  storeRules: [
    check('email')
      .exists()
      .withMessage('Enter an email')
      .isEmail()
      .withMessage('Enter a valid email'),
    check('password')
      .exists()
      .withMessage('Enter a password')
      .isString()
      .withMessage('Password must be a string')
      .isLength({ min: 4, max: 16 })
      .withMessage('Password must be between 4 and 16 characters long'),
  ],
};

export default authSessionMiddleware;
