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
};
