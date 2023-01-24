export const up = (knex) => {
    return knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('discription');
        table.integer('status_id');
        table.foreign('status_id')
            .references('id')
            .inTable('task_statuses')
            .onDelete('RESTRICT');
        table.integer('creator_id');
        table.foreign('creator_id')
            .references('id')
            .inTable('users')
            .onDelete('RESTRICT');
        table.integer('executor_id');
        table.foreign('executor_id')
            .references('id')
            .inTable('users')
            .onDelete('RESTRICT');
        table.integer('label_id');
        table.foreign('label_id')
            .references('id')
            .inTable('labels')
            .onDelete('RESTRICT');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

export const down = (knex) => {
    return knex.schema.dropTable('tasks');
};