import React, { useEffect } from 'react';
import PureCertificationSelection from '../../../components/CertificationSelection';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllSupportedCertifications,
  getAllSupportedCertifiers,
  patchRequestedCertification,
} from '../saga';
import history from '../../../history';
import {
  // All supported certification types
  allCertificationTypesSelector,
  setCertificationSelection,
  setCertificationSelectionSelector,
  setRequestedCertification,
  setRequestedCertificationSelector,
  selectedCertificationType,
  setCertificationID,
} from '../organicCertifierSurveySlice';
import { userFarmSelector } from '../../userFarmSlice';

export default function CertificationSelection() {
  const dispatch = useDispatch();
  const allSupportedCertificationTypes = useSelector(allCertificationTypesSelector);

  const certificationType = useSelector(setCertificationSelectionSelector);

  const requestedCertification = useSelector(setRequestedCertificationSelector);
  const role = useSelector(userFarmSelector);

  useEffect(() => {
    dispatch(getAllSupportedCertifications());
  }, [dispatch]);

  const onSubmit = (info) => {
    let certification_id = null;
    allSupportedCertificationTypes.map((type) => {
      if (type.certification_type === certificationType) {
        certification_id = type.certification_id;
      }
    });
    dispatch(setCertificationID(certification_id));
    dispatch(selectedCertificationType(true));
    const callback = () => {
      !certification_id
        ? history.push('/requested_certifier')
        : history.push('/certifier_selection_menu');
    };
    let data = {
      requested_certification: null,
      certification_id: null,
    };
    if (!certification_id) {
      data.requested_certification = info.requested;
    } else {
      data.certification_id = certification_id;
    }
    if (certification_id) dispatch(getAllSupportedCertifiers(certification_id));
    setTimeout(() => {
      dispatch(patchRequestedCertification({ data, callback }));
    }, 100);
  };

  const onGoBack = () => {
    history.push('/interested_in_organic');
  };

  return (
    <>
      <PureCertificationSelection
        onSubmit={onSubmit}
        onGoBack={onGoBack}
        dispatch={dispatch}
        setCertificationSelection={setCertificationSelection}
        certificationType={certificationType}
        allSupportedCertificationTypes={allSupportedCertificationTypes}
        setRequestedCertification={setRequestedCertification}
        requestedCertification={requestedCertification}
        setCertificationID={setCertificationID}
        role_id={role.role_id}
      />
    </>
  );
}
