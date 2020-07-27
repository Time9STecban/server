import {Response, Request} from 'express'
import {
  getAuthAccount,
  confirmAuthAccount,
  getAccounts,
  getAccount,
  getBalancesAccounts,
  getBalanceAccount,
  getStatusAuth
} from "../api/account";
class AccountController {
  async function getAuth(request: Request, response: Response) {
    try {
      let link = await getAuthAccount();
      response.status(200).send({ link: link });
    } catch (error) {
      error(`POST /account/auth - ${JSON.stringify(error.message)}`);
      response
        .status(400)
        .send({
          message:
            error.message || "Erro ao solicitar autenticação",
        });
    }
  }

  async function getToken(request: Request, response: Response) {
    try {
      let code = request.query.code;
      if (!code) {
        throw new Error(
          "É necessário passar o parametro code para confirmar a autenticação"
        );
      }
      let token = await confirmAuthAccount(code);
      response.status(200).send(token);
    } catch (error) {
      error(
        `POST /account/confirmAuth - ${JSON.stringify(error.message)}`
      );
      response
        .status(400)
        .send({
          message:
            error.message || "Erro ao confirmar a autenticação",
        });
    }
  }

  async function getAllAccounts(request: Request, response: Response) {
    try {
      let token = request.body.token;
      if (!token) {
        throw new Error("É necessário informar o token para obter as contas");
      }
      let accounts = await getAccounts(token);
      response.status(200).send(accounts);
    } catch (error) {
      error(`POST /account/accounts - ${JSON.stringify(error.message)}`);
      response
        .status(400)
        .send({
          message:
            error.message || "Erro na localização das contas",
        });
    }
  }

  async function getSpecificAccount(request: Request, response: Response) {
    try {
      let token = request.body.token;
      let idAccount = request.params.id;
      if (!token) {
        throw new Error("É necessário informar o token para obter as contas");
      }
      let account = await getAccount(token, idAccount);
      response.status(200).send(account);
    } catch (error) {
      error(`POST /account/accounts - ${JSON.stringify(error.message)}`);
      response
        .status(400)
        .send({
          message:
            error.message || "Erro na localização das contas",
        });
    }
  }

  async function getBalances(request: Request, response: Response) {
    try {
      let token = request.body.token;
      if (!token) {
        throw new Error("É necessário informar o token para obter a conta");
      }
      let account = await getBalancesAccounts(token);
      response.status(200).send(account);
    } catch (error) {
      error(`POST /account/balances - ${JSON.stringify(error.message)}`);
      response
        .status(400)
        .send({
          message:
            error.message || "Ocorreu algum erro consultar do saldo das contas",
        });
    }
  }

  async function getBalance(request: Request, response: Response) {
    try {
      let token = request.body.token;
      let id = request.params.id;
      if (!token) {
        throw new Error("É necessário informar o token para obter a conta");
      }
      let account = await getBalanceAccount(token, id);
      response.status(200).send(account);
    } catch (error) {
      error(`POST /account/id/balance - ${JSON.stringify(error.message)}`);
      response
        .status(400)
        .send({
          message:
            error.message || "Ocorreu algum erro ao consultar do saldo da conta",
        });
    }
  }

  async function getStatusConfirmation(request: Request, response: Response){
    try{
      let status = await getStatusAuth();
      response.status(200).send(status)
    }catch(error){
      error(`POST /account/authstatus - ${JSON.stringify(error.message)}`);
      response
        .status(400)
        .send({
          message:
            error.message || "Erro ao consultar o status a autenticação",
        });
    }
  }

}
export default AccountController;