const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');
const { Model } = require('objection');

const unique = objectionUnique({ fields: ['name'] });

module.exports = class Label extends unique(BaseModel) {
    static get tableName() {
        return 'labels'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1 },
            },
        };
    }

    static get relationMappings() {
        const Task = require('./Task.cjs');
        return {
            task: {
                relation: Model.ManyToManyRelation,
                modelClass: Task,
                join: {
                    from: 'labels.id',
                    through: {
                        from: 'tasks_labels.labelId',
                        to: 'tasks_labels.taskId'
                    },
                    to: 'tasks.id' 
                }
    
            }
        }
    };
    // static get relationMappings() {
    //     return {
    //       tasks: {
    //         relation: BaseModel.ManyToManyRelation,
    //         modelClass: 'Task',
    //         join: {
    //           from: 'labels.id',
    //           through: {
    //             from: 'tasks_labels.labelId',
    //             to: 'tasks_labels.taskId',
    //           },
    //           to: 'tasks.id',
    //         },
    //       },
    //     };
    //   }
}