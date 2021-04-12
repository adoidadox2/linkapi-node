import { schedule } from 'node-cron';
import { Promise } from 'bluebird';

import { Deal } from '../models';
import { PipeDriveService } from '../services';

class PopulateDealsCron {
  constructor() {
    this.running = false;
    this.init();
  }

  init() {
    schedule('* 5 * * *', async () => {
      if (!this.running) {
        console.log('PopulateDealsCron started');
        this.running = true;

        let foundDeals;

        try {
          foundDeals = await Deal.find({});
        } catch (e) {
          throw new Error('Something happened, could not get deals');
        }

        const startOffset = foundDeals.length;

        PipeDriveService.requestDeals(startOffset)
          .then(requestedDealsArray => {
            if (requestedDealsArray) {
              console.log(`${requestedDealsArray.length} deals found`);

              Promise.map(
                requestedDealsArray,
                async singleDeal => {
                  let createdDeal;
                  let alreadyExistingDeal;

                  try {
                    alreadyExistingDeal = await Deal.findOne({
                      deal_id: singleDeal.deal_id,
                    });
                  } catch (e) {
                    throw new Error(
                      'Something happened, deal could not be created',
                    );
                  }

                  if (!alreadyExistingDeal) {
                    try {
                      createdDeal = await Deal.create({
                        deal_id: singleDeal.id,
                        title: singleDeal.title,
                        customer_name: singleDeal.person_id.name,
                        value: singleDeal.value,
                        currency: singleDeal.currency,
                        won_time: singleDeal.won_time,
                      });
                    } catch (e) {
                      console.log(e);
                      throw new Error(
                        'Something happened, deal could not be created',
                      );
                    }
                  }

                  return createdDeal;
                },
                { concurrency: 1 },
              )
                .then(() => {
                  console.log('PopulateDealsCron finished');
                  this.running = false;
                })
                .catch(promiseError => {
                  console.error(promiseError);
                  this.running = false;
                });
            } else {
              console.log(`0 deals found`);
              console.log('PopulateDealsCron finished');
              this.running = false;
            }
          })
          .catch(requestDealsError => {
            console.error(requestDealsError.toString());
            this.running = false;
          });
      }
    }).start();
  }
}

export default new PopulateDealsCron();
