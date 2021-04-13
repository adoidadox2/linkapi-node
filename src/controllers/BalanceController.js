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
        updatedAt: 1,
      });
    } catch (e) {
      throw new AppError('Something happened, could not list balances');
    }

    const lastIndex = balances.length - 1;
    const lastUpdate = lastIndex > -1 ? balances[lastIndex].updatedAt : null;
    const formattedBalanceArray = balances.map(({ _id, date, value }) => {
      return {
        _id,
        date,
        value,
      };
    });

    return response.json({
      message: 'Successfully listed balances',
      data: formattedBalanceArray,
      last_update: lastUpdate,
    });
  }
}

export default new BalanceController();
