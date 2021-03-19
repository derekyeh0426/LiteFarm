import React from 'react';
import PureField from '../../../components/AreaDetailsLayout/Field';
import { postFieldLocation } from './saga';
import { useDispatch, useSelector } from 'react-redux';
import { fieldEnum } from '../../fieldSlice';
import { useTranslation } from 'react-i18next';
import { measurementSelector } from '../../userFarmSlice';
import { locationInfoSelector } from '../../mapSlice';

function FieldDetailForm({ history }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const system = useSelector(measurementSelector);
  const { grid_points } = useSelector(locationInfoSelector);

  const submitForm = (data) => {
    const message = `${t('FARM_MAP.MAP_FILTER.FIELD')}${t('message:MAP.SUCCESS_POST')}`;
    dispatch(postFieldLocation({ form: data, message: message }));
  };

  return (
    <PureField
      history={history}
      submitForm={submitForm}
      areaType={fieldEnum}
      system={system}
      grid_points={grid_points}
    />
  );
}

export default FieldDetailForm;
