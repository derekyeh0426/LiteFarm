const Model = require('objection').Model;

class Sensor extends Model {
  static get tableName() {
    return 'sensor';
  }

  static get idColumn() {
    return 'sensor_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['sensor_id'],
      properties: {
        sensor_id: { type: 'string' },
        grid_points: {
            type: 'object',
            properties: {
              lat: { type: 'number' },
              lng: { type: 'number' },
            },
        },
      },
      additionalProperties: false,
    };
  }

  static get relationMappings() {
    // Import models here to prevent require loops.
    return {
    };
  }
}

module.exports = Sensor;