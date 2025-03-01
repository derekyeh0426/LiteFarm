import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '../../history';
import PureOutroSplash from '../../components/Outro';
import { certifierSurveySelector } from '../OrganicCertifierSurvey/slice';
import { patchOutroStep } from './saga';
import {
  finishedSelectingCertificationTypeSelector,
  requestedCertifier,
  requestedCertifierSelector,
  selectedCertification,
  selectedCertifier,
} from '../OrganicCertifierSurvey/organicCertifierSurveySlice';
import { showedSpotlightSelector } from '../showedSpotlightSlice';

function Outro() {
  const dispatch = useDispatch();
  const requestCertifierData = useSelector(requestedCertifierSelector);
  const survey = useSelector(certifierSurveySelector);
  const selected = useSelector(finishedSelectingCertificationTypeSelector);
  const { navigation } = useSelector(showedSpotlightSelector);
  const toShowSpotlight = !navigation;
  const onGoBack = () => {
    history.push(
      !survey.interested || !selected
        ? '/certification/interested_in_organic'
        : requestCertifierData
        ? '/certification/certifier/request'
        : '/certification/certifier/selection',
    );
  };
  const onContinue = () => {
    dispatch(
      selectedCertification({
        certificationName: null,
        certification_id: null,
        requestedCertification: null,
      }),
    );
    dispatch(
      selectedCertifier({
        certifierName: null,
        certifierID: null,
        isRequestingCertifier: null,
      }),
    );
    dispatch(requestedCertifier(null));
    dispatch(patchOutroStep());
  };

  return (
    <PureOutroSplash
      onGoBack={onGoBack}
      onContinue={onContinue}
      toShowSpotlight={toShowSpotlight}
    />
  );
}

export default Outro;
