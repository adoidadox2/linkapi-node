import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({
    Author: 'Augusto Vinicius',
    Github: 'https://github.com/adoidadox2',
    Project: 'linkapi-node',
    Version: '1.0.0',
    Status: 'Online',
  });
});

export default routes;
