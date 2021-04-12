import { User } from '../models';
import { AppError } from '../errors';
import { BcryptHelper } from '../helpers';

class UserController {
  async index(request, response) {
    let users;

    try {
      users = await User.find();
    } catch (e) {
      throw new AppError('Something happened, could not list users');
    }

    return response.json({
      message: 'Successfully listed users',
      data: users,
    });
  }

  async store(request, response) {
    const { name, email, password } = request.body;

    let createdUser;

    if (await User.findOne({ email })) {
      throw new AppError('Email is already in use, login to get access token');
    }

    try {
      createdUser = await User.create({
        name,
        email,
        password: BcryptHelper.hash(password),
      });
    } catch (e) {
      console.log(e);
      throw new AppError('Something happened, the user could not be created');
    }

    return response.json({
      message: 'User created successfully',
      data: {
        name: createdUser.name,
        email: createdUser.email,
      },
    });
  }
}

export default new UserController();
