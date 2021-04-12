import { AppError } from '../errors';
import { JwtHelper } from '../helpers';

export default (request, response, next) => {
  const {
    headers: { authorization },
  } = request;
  const messages = {
    error: 'You are not authorized to access this resource',
  };

  if (authorization) {
    const [, token] = authorization.split(' ');

    try {
      const decodedToken = JwtHelper.verify(token);
      request.userId = decodedToken._id;
      request.userEmail = decodedToken.email;

      return next();
    } catch (e) {
      throw new AppError(messages.error, null, 401);
    }
  } else {
    throw new AppError(messages.error, null, 401);
  }
};
