import { useDispatch, useSelector } from 'react-redux';
import { hookFormPersistSelector } from '../../../hooks/useHookFormPersist/hookFormPersistSlice';
import PureManagementPlanName from '../../../../components/Crop/ManagementPlanName';
import {
  getManagementPlan,
  managementPlansByCropVarietyIdSelector,
} from '../../../managementPlanSlice';
import { pick } from '../../../../util';
import { broadcastProperties, cropManagementPlanProperties } from '../../../broadcastSlice';
import { containerProperties } from '../../../containerSlice';
import { bedProperties } from '../../../bedsSlice';
import { rowProperties } from '../../../rowsSlice';
import { postManagementPlan } from './saga';
import { getProcessedFormData } from '../../../hooks/useHookFormPersist/utils';
import { HookFormPersistProvider } from '../../../hooks/useHookFormPersist/HookFormPersistProvider';
import { getTransplantContainer } from '../../../transplantContainerSlice';

export default function ManagementPlanName({ history, match }) {
  const persistedFormData = useSelector(hookFormPersistSelector);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(
      postManagementPlan(
        formatManagementPlanFormData({
          ...persistedFormData,
          ...data,
          crop_variety_id: match.params.variety_id,
        }),
      ),
    );
  };
  const onError = () => {};
  const managementPlans = useSelector(
    managementPlansByCropVarietyIdSelector(match?.params?.variety_id),
  );

  return (
    <HookFormPersistProvider>
      <PureManagementPlanName
        onSubmit={onSubmit}
        onError={onError}
        match={match}
        history={history}
        managementPlanCount={managementPlans.length + 1}
      />
    </HookFormPersistProvider>
  );
}

const formatManagementPlanFormData = (formData) => {
  const data = getProcessedFormData(formData);
  const planting_type = data.planting_type;
  const plantingMethodAndCropManagementPlan = data[data.planting_type.toLowerCase()];
  const plantingMethod = pick(
    plantingMethodAndCropManagementPlan,
    plantingTypePropertiesMap[planting_type],
  );
  const reqBody = {
    ...getManagementPlan(data),
    crop_management_plan: {
      planting_type,
      location_id: data.location_id,
      ...pick(plantingMethodAndCropManagementPlan, cropManagementPlanProperties),
      [planting_type.toLowerCase()]: plantingMethod,
    },
    transplant_container: data.needs_transplant
      ? getTransplantContainer(data?.transplant_container)
      : undefined,
  };
  return reqBody;
};

const plantingTypePropertiesMap = {
  BROADCAST: broadcastProperties,
  CONTAINER: containerProperties,
  BEDS: bedProperties,
  ROWS: rowProperties,
};
