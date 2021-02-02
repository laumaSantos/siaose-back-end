// método responsável por executar a migrations, cria a tabela
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
    table.increments().primary();
    table.string('cpf').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('profession').notNullable();
    table.string('avatar')
  })
};
// exclui a tabela
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
