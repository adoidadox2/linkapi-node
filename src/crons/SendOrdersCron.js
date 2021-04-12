import { schedule } from 'node-cron';
import { Promise } from 'bluebird';
import moment from 'moment';

import { Balance, Deal } from '../models';
import { BlingService } from '../services';

class SendOrdersCron {
  constructor() {
    this.running = false;
    this.init();
  }

  init() {
    schedule('* * * * *', async () => {
      if (!this.running) {
        console.log('SendOrdersCron started');
        this.running = true;

        Deal.find({ verified: false })
          .then(nonVerifiedDealsArray => {
            if (nonVerifiedDealsArray) {
              console.log(
                `${nonVerifiedDealsArray.length} non verified deals found`,
              );

              Promise.map(
                nonVerifiedDealsArray,
                async nonVerifiedDeal => {
                  let blingResponse;
                  let foundBalance;

                  try {
                    blingResponse = await BlingService.sendOrder(
                      nonVerifiedDeal,
                    );
                  } catch (e) {
                    throw new Error(
                      'Something happened, order could not be created',
                    );
                  }

                  try {
                    foundBalance = await Balance.findOne({
                      date: moment(nonVerifiedDeal.won_time)
                        .format('DD/MM/YYYY')
                        .toString(),
                    });
                  } catch (e) {
                    throw new Error(
                      'Something happened, order could not be created',
                    );
                  }

                  if (!foundBalance) {
                    try {
                      await Balance.create({
                        date: moment(nonVerifiedDeal.won_time)
                          .format('DD/MM/YYYY')
                          .toString(),
                        value: nonVerifiedDeal.value,
                      });
                    } catch (e) {
                      throw new Error(
                        'Something happened, the balance could not be created',
                      );
                    }
                  } else {
                    foundBalance.value += nonVerifiedDeal.value;

                    foundBalance.save();
                  }

                  try {
                    nonVerifiedDeal.verified = true;

                    nonVerifiedDeal.save();
                  } catch (e) {
                    throw new Error(
                      'Something happened, deal could not be verified',
                    );
                  }

                  // console.log(JSON.stringify(blingResponse));

                  return blingResponse;
                },
                { concurrency: 1 },
              )
                .then(() => {
                  console.log('SendOrdersCron finished');
                  this.running = false;
                })
                .catch(promiseError => {
                  console.error(promiseError);
                  this.running = false;
                });
            } else {
              console.log(`0 non verified deals found`);
              console.log('SendOrdersCron finished');
              this.running = false;
            }
          })
          .catch(sendOrdersError => {
            console.error(sendOrdersError.toString());
            this.running = false;
          });
      }
    }).start();
  }
}

export default new SendOrdersCron();
