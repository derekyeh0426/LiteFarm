import axios from '../containers/saga';
import sensorURL from '../apiConfig';

export default class sensorClient {
  static async getSensorsByFarmId(id) {
    try {
      const response = await axios.get(sensorURL + `/farm/``${id}`);
      return response;
    } catch (e) {
      console.log(e.message);
    }
  }
}
