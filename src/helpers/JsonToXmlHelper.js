import jsontoxml from 'jsontoxml';

class JsonToXmlHelper {
  parse(deal) {
    return jsontoxml({
      pedido: {
        cliente: {
          nome: deal.customer_name,
        },
        itens: {
          item: {
            un: 'x',
            codigo: deal.deal_id,
            descricao: deal.title,
            vlr_unit: deal.value,
            qtde: '1',
          },
        },
      },
    });
  }
}

export default new JsonToXmlHelper();
