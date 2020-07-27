import Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('user_bancos', table =>{
    table.increments('id').primary();

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users');
    
    table.integer('banco_id')
      .notNullable()
      .references('id')
      .inTable('bancos');
    
  })
}

export async function down(knex: Knex){
  return knex.schema.dropTable('user_bancos');
}