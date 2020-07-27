import express from 'express';
import knex from './database/connection';
import UserController from './controllers/userController'
import AccountController from './controllers/accoutController'

const routes = express.Router();

const userController = new UserController();
const accontController = new AccountController ;


routes.get('/bancos', async (request, response) => {
  const bancos = await knex('bancos').select('*');
  return response.json(bancos);

});
routes.post("/account/auth/",accontController ),
routes.get("/account/balances",accontController),
routes.post("/account/auth/", accontController),
routes.get("/account/authstatus", accontController),
routes.get("/account/confirmAuth",accontController),
routes.get("/account/accounts", accontController),
routes.get("/account/:id",accontController),
routes.get("/account/:id/balance",accontController);

routes.post('/users', userController.create);
//routes.get('/user/login', userController.login);

export default routes;