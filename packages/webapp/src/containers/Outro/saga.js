/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (saga.js) is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */

import {
 FINISH_ONBOARDING
} from "./constants";
import { call, takeEvery } from 'redux-saga/effects';
import apiConfig from '../../apiConfig';
const axios = require('axios');

export function* patchOutroStep() {
  let user_id = localStorage.getItem('user_id');
  let farm_id = localStorage.getItem('farm_id');
  const { userFarmUrl } = apiConfig;
  const header = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
      user_id: localStorage.getItem('user_id'),
      farm_id: localStorage.getItem('farm_id'),
    },
  };

  let data = {
    step_four: true,
    step_four_end: new Date(),
  };

  try {
    yield call(axios.patch, userFarmUrl + '/onboarding/farm/' + farm_id + '/user/' + user_id, data, header);
  }
  catch (e) {
    console.error('failed to update table');
  }
}



export default function* outroSaga() {
  yield takeEvery(FINISH_ONBOARDING, patchOutroStep);
}
