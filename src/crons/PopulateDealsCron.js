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
    schedule(`${process.env.DEALS_CRON_TIME}`, async () => {
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
              console.log(`Deals found: ${requestedDealsArray.length}`);

              Promise.map(
                requestedDealsArray,
                async integrationResponseDeal => {
                  let createdDeal;
                  let alreadyExistingDeal;

                  try {
                    alreadyExistingDeal = await Deal.findOne({
                      deal_id: integrationResponseDeal.id,
                    });
                  } catch (e) {
                    throw new Error(
                      'Something happened, deal could not be created',
                    );
                  }

                  if (!alreadyExistingDeal) {
                    try {
                      createdDeal = await Deal.create({
                        deal_id: integrationResponseDeal.id,
                        title: integrationResponseDeal.title,
                        customer_name: integrationResponseDeal.person_id.name,
                        value: integrationResponseDeal.value,
                        currency: integrationResponseDeal.currency,
                        won_time: integrationResponseDeal.won_time,
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
              console.log(`Deals found: 0`);
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
