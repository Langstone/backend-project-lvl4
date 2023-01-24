
export const up = (knex) => {
    return knex.schema.createTable('tasks_labels', (table) => {
        table.increments('id').primary();
        table.integer('task_id');
        table.integer('label_id');
    })
};

export const down = (knex) => {
    return knex.schema.dropTable('tasks_labels');
};
