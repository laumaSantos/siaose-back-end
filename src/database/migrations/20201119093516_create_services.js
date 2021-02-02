
exports.up = function(knex) {
    return knex.schema.createTable('services', function(table){
        table.increments();
        table.string('name').notNullable();
        table.string('location');
        table.string('description');
        table.decimal('value');
        table.decimal('stars');

        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('users');
    });
}
exports.down = function(knex) {
  return knex.schema.dropTable('services');
};
