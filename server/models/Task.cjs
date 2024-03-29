const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');
const unique = objectionUnique({ fields: ['name'] });

module.exports = class Task extends unique(BaseModel) {
    static get tableName() {
        return 'tasks'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'statusId', 'creatorId'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1 },
                statusId: { type: 'number' },
                creatorId: { type: 'number' },
            },
        }
    }

    static get relationMappings() {
        const Label = require('./Label.cjs');
        const Status = require('./TaskStatus.cjs');
        const User = require('./User.cjs');
        return {
            status: {
                relation: BaseModel.HasOneRelation,
                modelClass: Status,
                join: {
                    from: 'tasks.statusId',
                    to: 'taskStatuses.id',
                }
            },

            label: {
                relation: BaseModel.HasOneRelation,
                modelClass: Label,
                join: {
                    from: 'tasks.labelId',
                    to: 'labels.id',
                },
            },

            executor: {
                relation: BaseModel.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'tasks.executorId',
                    to: 'users.id',
                },
            }, 

            creator: {
                relation: BaseModel.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'tasks.creatorId',
                    to: 'users.id',
                },
            },
            labels: {
                relation: BaseModel.ManyToManyRelation,
                modelClass: Label,
                join: {
                  from: 'tasks.id',
                  through: {
                    from: 'tasks_labels.taskId',
                    to: 'tasks_labels.labelId',
                  },
                  to: 'labels.id',
                },
            },
        }
        
    }
};
