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

import { toastr } from 'react-redux-toastr';
import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import apiConfig from '../../../apiConfig';
import { loginSelector } from '../../userFarmSlice';
import { axios, getHeader } from '../../saga';
import { createAction } from '@reduxjs/toolkit';
import {
  deleteManagementPlanSuccess,
  getManagementPlansSuccess,
  onLoadingManagementPlanFail,
  onLoadingManagementPlanStart,
  postManagementPlanSuccess,
  putManagementPlanSuccess,
} from '../../managementPlanSlice';
import i18n from '../../../locales/i18n';

const DEC = 10;

export const getExpiredManagementPlans = createAction(`getExpiredManagementPlansSaga`);

export function* getExpiredManagementPlansSaga() {
  const { managementPlanURL } = apiConfig;
  let { user_id, farm_id } = yield select(loginSelector);
  const header = getHeader(user_id, farm_id);

  try {
    yield put(onLoadingManagementPlanStart());
    const result = yield call(axios.get, managementPlanURL + '/expired/farm/' + farm_id, header);
    yield put(getManagementPlansSuccess(result.data));
  } catch (e) {
    yield put(onLoadingManagementPlanFail());
    console.error('failed to fetch expired crops from database');
  }
}

export const postManagementPlan = createAction(`postManagementPlanSaga`);

export function* postManagementPlanSaga({ payload: managementPlan }) {
  const { managementPlanURL } = apiConfig;
  let { user_id, farm_id } = yield select(loginSelector);
  const header = getHeader(user_id, farm_id);
  try {
    const result = yield call(axios.post, managementPlanURL, managementPlan, header);
    console.log(result);
    yield put(postManagementPlanSuccess(result.data));
  } catch (e) {
    console.log('failed to add managementPlan to database');
  }
}

export const putManagementPlan = createAction(`putManagementPlanSaga`);

export function* putManagementPlanSaga({ payload: managementPlan }) {
  const { managementPlanURL } = apiConfig;
  let { user_id, farm_id } = yield select(loginSelector);
  const header = getHeader(user_id, farm_id);

  try {
    const result = yield call(
      axios.put,
      managementPlanURL + `/${managementPlan.management_plan_id}`,
      managementPlan,
      header,
    );
    yield put(putManagementPlanSuccess(managementPlan));
    toastr.success(i18n.t('message:CROP.SUCCESS.EDIT'));
  } catch (e) {
    console.log('Failed to add managementPlan to database');
    toastr.error(i18n.t('message:CROP.ERROR.EDIT'));
  }
}

export const deleteManagementPlan = createAction(`deleteManagementPlanSaga`);

export function* deleteManagementPlanSaga({ payload: management_plan_id }) {
  const currentDate = formatDate(new Date());
  const { managementPlanURL } = apiConfig;
  let { user_id, farm_id } = yield select(loginSelector);
  const header = getHeader(user_id, farm_id);

  try {
    const result = yield call(axios.delete, managementPlanURL + `/${management_plan_id}`, header);
    yield put(deleteManagementPlanSuccess(management_plan_id));
    toastr.success(i18n.t('message:CROP.SUCCESS.DELETE'));
  } catch (e) {
    console.log('Failed To Delete Field Crop Error: ', e);
    toastr.error(i18n.t('message:CROP.ERROR.DELETE'));
  }
}

export const createYield = createAction(`createYieldSaga`);

export function* createYieldSaga({ payload: yieldData }) {
  const { yieldURL } = apiConfig;
  let { user_id, farm_id } = yield select(loginSelector);
  const header = getHeader(user_id, farm_id);

  const data = {
    crop_id: parseInt(yieldData.crop_id, DEC),
    'quantity_kg/m2': parseInt(yieldData['quantity_kg/m2'], DEC),
    date: yieldData.date,
    farm_id: farm_id,
  };

  try {
    const result = yield call(axios.post, yieldURL, data, header);
  } catch (e) {
    console.log('Error: Could Not Emit Create Yield Action');
  }
}

export const createPrice = createAction(`createPriceSaga`);

export function* createPriceSaga({ payload: price }) {
  const { priceURL } = apiConfig;
  let { user_id, farm_id } = yield select(loginSelector);
  const header = getHeader(user_id, farm_id);

  const data = {
    crop_id: parseInt(price.crop_id, DEC),
    'value_$/kg': parseInt(price.value, DEC),
    date: price.date,
    farm_id: farm_id,
  };
  try {
    const result = yield call(axios.post, priceURL, data, header);
  } catch (e) {
    console.log('Error: Could not Emit Create Price Action');
  }
}

const formatDate = (currDate) => {
  const d = currDate;
  let year = d.getFullYear(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export default function* managementPlanSaga() {
  yield takeLeading(postManagementPlan.type, postManagementPlanSaga);
  yield takeLatest(getExpiredManagementPlans.type, getExpiredManagementPlansSaga);
  yield takeLeading(deleteManagementPlan.type, deleteManagementPlanSaga);
  yield takeLeading(createYield.type, createYieldSaga);
  yield takeLeading(createPrice.type, createPriceSaga);
  yield takeLeading(putManagementPlan.type, putManagementPlanSaga);
}