
export const up = (knex) => {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('password_digest');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

export const down = (knex) => {
    return knex.schema.dropTable('users');
};
