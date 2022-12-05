
export const up = (knex) => {
    return knex.schema.createTable('task_statuses', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

export const down = (knex) => {
    return knex.schema.dropTable('task_statuses');
};
