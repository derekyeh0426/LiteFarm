const Model = require('objection').Model;

class Sensor extends Model {
  static get tableName() {
    return 'sensor';
  }

  static get idColumn() {
    return 'sensor_id';
  }
}

module.exports = Sensor;