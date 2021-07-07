import axios from '../containers/saga';
import sensorURL from '../apiConfig';

export default class sensorClient {
  static async getSensorsByFarmId(id) {
    try {
      const response = await axios.get(sensorURL + `/farm/` + `${id}`);
      return response;
    } catch (e) {
      console.log(e.message);
    }
  }

  static async updateSensorById({ id, name, new_id, lat, lon }) {
    try {
      const response = await axios.patch(sensorURL + `${id}`, { name, new_id, lat, lon });
      return response;
    } catch (e) {
      console.log(e.message);
    }
  }

  static async deleteSensorById(id) {
    try {
      const response = await axios.delete(sensorURL, { data: { id } });
      return response;
    } catch (e) {
      console.log(e.message);
    }
  }

  static async addSensor({ name, id, lat, lng }) {
    try {
      const response = await axios.delete(sensorURL, { name, id, lat, lng });
      return response;
    } catch (e) {
      console.log(e.message);
    }
  }
}
