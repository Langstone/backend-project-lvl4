// @ts-check

const { Model, ref, raw } = require('objection');

module.exports = class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }
}
