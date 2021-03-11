import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AreaDetailsLayout from '..';
import { useForm } from 'react-hook-form';
import Leaf from '../../../assets/images/farmMapFilter/Leaf.svg';
import Radio from '../../Form/Radio';
import DateContainer from '../../Inputs/DateContainer';
import moment from 'moment';
// import { useSelector } from 'react-redux';
// import { locationInfoSelector } from '../../../containers/mapSlice';

export default function PureField({ history }) {
  const { t } = useTranslation();
  // TODO: use grid_points in endpoint call/saga. keep changes consistent with other area locations
  // const { grid_points } = useSelector(locationInfoSelector);
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    formState: { isValid, isDirty },
  } = useForm({
    mode: 'onChange',
  });
  const onError = (data) => {};
  const onSubmit = (data) => {
    console.log(data);
  };

  const FIELD_TYPE = 'field_type';
  const fieldTypeSelection = watch(FIELD_TYPE, 'transitioning');

  const disabled = !isValid || !isDirty;

  useEffect(() => {
    setValue(FIELD_TYPE, 'nonorganic');
  }, []);
  return (
    <AreaDetailsLayout
      name={t('FARM_MAP.FIELD.NAME')}
      title={t('FARM_MAP.FIELD.TITLE')}
      history={history}
      onSubmit={onSubmit}
      onError={onError}
      register={register}
      isNameRequired={true}
      disabled={disabled}
      handleSubmit={handleSubmit}
      setValue={setValue}
      showPerimeter={true}
    >
      <div>
        <p style={{ marginBottom: '25px' }}>
          {t('FARM_MAP.FIELD.FIELD_TYPE')} <img src={Leaf} style={{ paddingLeft: '7px' }} />
        </p>
        <div>
          <Radio
            style={{ marginBottom: '25px' }}
            label={t('FARM_MAP.FIELD.NON_ORGANIC')}
            defaultChecked={true}
            inputRef={register({ required: true })}
            value={'nonorganic'}
            name={FIELD_TYPE}
          />
        </div>
        <div>
          <Radio
            style={{ marginBottom: '25px' }}
            label={t('FARM_MAP.FIELD.ORGANIC')}
            inputRef={register({ required: true })}
            value={'organic'}
            name={FIELD_TYPE}
          />
        </div>
        <div>
          <Radio
            style={{ marginBottom: '25px' }}
            label={t('FARM_MAP.FIELD.TRANSITIONING')}
            inputRef={register({ required: true })}
            value={'transitioning'}
            name={FIELD_TYPE}
          />
        </div>
        <div>
          {/* <DatePicker/> */}
          {fieldTypeSelection === 'transitioning' && (
            <DateContainer
              style={{ marginBottom: '40px' }}
              date={moment()}
              label={t('FARM_MAP.FIELD.DATE')}
            />
          )}
        </div>
      </div>
    </AreaDetailsLayout>
  );
}
