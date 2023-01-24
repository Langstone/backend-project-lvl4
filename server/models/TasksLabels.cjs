const BaseModel = require('./BaseModel.cjs');
// const objectionUnique = require('objection-unique');
// const Label = require('./Label.cjs');
// const Task = require('./Task.cjs');
// const { Model } = require('objection');

// const unique = objectionUnique({ fields: ['name'] });

module.exports = class TasksLabels extends BaseModel {
    static get tableName() {
        return 'tasks_labels'
    }

    // static get jsonSchema() {
    //     return {
    //         type: 'object',
    //         required: ['taskId', 'labelId'],

    //         properties: {
    //             taskId: { type: 'integer' },
    //             labelId: { type: 'integer' },
    //         },
    //     };
    // }
    // static get relationMappings() {
    //     return {
    //         task: {
    //             relation: Model.HasOneRelation,
    //             modelClass: Task,
    //             join: {
    //                 from: 'labels.id',
    //                 through: {
    //                     from: 'tasks_labels.task_id',
    //                     to: 'tasks_labels.label_id'
    //                 },
    //                 to: 'tasks.id' 
    //             }
    
    //         },
    //         label: {
    //             relation: Model.HasOneRelation,
    //             modelClass: Label,
    //             join: {
    //                 from: 'tasks.id',
    //                 through: {
    //                     from: 'tasks_labels.task_id',
    //                     to: 'tasks_labels.label_id'
    //                 },
    //                 to: 'labels.id' 
    //             },
    
    //         }
    //     }
        
    // }
}