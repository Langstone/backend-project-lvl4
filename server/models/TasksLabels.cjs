const BaseModel = require('./BaseModel.cjs');

module.exports = class TasksLabels extends BaseModel {
  static get tableName() {
      return 'tasks_labels'
  }

  static get jsonSchema() {
      return {
          type: 'object',
          required: ['taskId', 'labelId'],

          properties: {
              id: { type: 'integer' },
              taskId: { type: 'number' },
              labelId: { type: 'number' },
          },
      };
  }
};