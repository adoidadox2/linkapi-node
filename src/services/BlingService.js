import { blingAPI } from '../apis';
import { AppError } from '../errors';
import { JsonToXmlHelper } from '../helpers';

class BlingService {
  async sendOrder(order) {
    const orderXml = JsonToXmlHelper.parse(order);

    let blingResponse;

    try {
      blingResponse = await blingAPI.post(`/pedido/json`, null, {
        params: {
          apikey: process.env.BLING_TOKEN,
          xml: orderXml,
        },
      });
    } catch (e) {
      console.log(e);
      throw new AppError('Error while sending order');
    }

    const { data } = blingResponse;

    return data;
  }
}

export default new BlingService();
