import fieldClient from './field-api';
import farmClient from './farm-api';
import sensorClient from './sensor-api';

export default class client {
  static farm = farmClient;
  static field = fieldClient;
  static sensor = sensorClient;
}
