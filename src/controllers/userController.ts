import {Request, Response} from 'express';
import knex from '../database/connection';

class UsersController {
  async create (request: Request, response: Response){
    const{ 
      cpf,
      bancos
    } = request.body;

    const trx = await knex.transaction();

    const insertedIds = await trx('users').insert({
      cpf
    });

    const user_id = insertedIds[0];
    const userBancos = bancos.map((banco_id: number) =>{
      return{
        banco_id,
        user_id
      };
    })
    await trx('user_bancos').insert(userBancos);
    
    return response.json({sucess: true});
  }
  // async const login (request: Request, response: Response) {
  //     const {
  //       cpf,
  //     } = request.body;

  //     if (!cpf) {
  //       throw new Error("É necessário informar CPF");
  //     }
  // };
}


export default UsersController;