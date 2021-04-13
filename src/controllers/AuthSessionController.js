import { User } from '../models';
import { AppError } from '../errors';
import { JwtHelper, BcryptHelper } from '../helpers';

class AuthSessionController {
  async store(request, response) {
    const { email, password } = request.body;

    let user;

    try {
      user = await User.findOne({ email }).select({
        email: 1,
        _id: 1,
        name: 1,
        password: 1,
      });
    } catch (e) {
      throw new AppError('Verify the given informations and try again');
    }

    if (!user) {
      throw new AppError('Verify the given informations and try again');
    }

    if (!BcryptHelper.validate(password, user.password)) {
      throw new AppError(
        'Verify the given informations and try again',
        null,
        401,
      );
    }

    return response.json({
      message: 'Session created successfully',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token: JwtHelper.sign({
          _id: user._id,
          email: user.email,
        }),
      },
    });
  }
}

export default new AuthSessionController();
