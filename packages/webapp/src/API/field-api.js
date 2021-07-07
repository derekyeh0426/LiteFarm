import axios from '../containers/saga';
import fieldURL from '../apiConfig';

export default class fieldClient {
  static async getFieldsByFarmId(id) {
    try {
      const response = await axios.get(fieldURL + `/farm/` + `${id}`);
      return response;
    } catch (e) {
      console.log(e.message);
    }
  }
}
