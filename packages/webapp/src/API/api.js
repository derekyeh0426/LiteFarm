import fieldClient from './field-api';
import farmClient from './farm-api';
import sensorClient from './sensor-api';

//I am aware all the api calls are already implemented in saga.js of individual objects, but i am not 100% sure how it works so i create this one simply for the sake of testing
export default class client {
  static farm = farmClient;
  static field = fieldClient;
  static sensor = sensorClient;
}
