import axios from '../containers/saga';
import farmUrl from '../apiConfig';

export default class farmClient {
  static async getMyFarms() {
    try {
      const response = await axios.get(farmUrl);
      return response;
    } catch (e) {
      console.log(e.message);
    }
  }
}
