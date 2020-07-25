exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.increments('id').primary();
  table.string('firstName').notNullable();
  table.string('lastName').notNullable();
  table.decimal('participation').notNullable();
});

exports.down = (knex) => knex.schema.dropTable('users');
