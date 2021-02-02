
exports.up = function(knex) {
    return knex.schema.createTable('agenda',function(table){
        table.increments(); //Id da tabela
        table.string('data');
        table.string('observation');

        table.string('user_id').notNullable();
        table.string('service_id').notNullable();

        table.foreign('user_id').references('id').inTable('users')
        table.foreign('service_id').references('id').inTable('services')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('agenda')
};
