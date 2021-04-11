import 'dotenv/config';
import 'express-async-errors';
import './databases';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';
import { AppError } from './errors';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.errors();
    this.routes();
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  errors() {
    this.server.use((e, req, res, next) => {
      if (e instanceof AppError) {
        const result = {};

        if (e.message) {
          result.message = e.message;
        }

        if (e.data) {
          result.data = e.data;
        }

        return res.status(e.statusCode).json(result);
      }

      console.error(e);

      return res.status(500).json({ message: 'Internal server error' });
    });
  }
}

export default new App().server;
