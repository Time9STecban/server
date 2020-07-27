import Knex from 'knex';

export async function seed(knex: Knex){
  await knex('bancos').insert([
    { name: 'BB'},
    { name: 'Bradesco'},
    { name: 'Itaú'},
    { name: 'Nubank'}
  ])

}