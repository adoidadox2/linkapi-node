import mongoose from 'mongoose';

class DefaultDatabase {
  constructor() {
    this.init();
  }

  init() {
    mongoose
      .connect(`${process.env.DB_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(
          `Connection successfully with MongoDB at ${process.env.DB_URL}`,
        );
      })
      .catch(() => {
        console.log(
          `Connection unsuccessfully with MongoDB at ${process.env.DB_URL}`,
        );
      });
  }
}

export default new DefaultDatabase();
