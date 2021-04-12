import { Balance } from '../models';
import { AppError } from '../errors';

class BalanceController {
  async index(request, response) {
    let balances;

    try {
      balances = await Balance.find().select({
        date: 1,
        _id: 1,
        value: 1,
      });
    } catch (e) {
      throw new AppError('Something happened, could not list balances');
    }

    return response.json({
      message: 'Successfully listed balances',
      data: balances,
    });
  }
}

export default new BalanceController();
