import { useForm } from "react-hook-form";
import React, { useState } from "react";
import Script from "react-load-script";
import { VscLocation } from "react-icons/vsc";
import { useDispatch } from 'react-redux';

import PureAddFarm from "../../components/AddFarm";
import { postFarm } from './actions';
// import { farmSelector } from '../selector';

const coordRegex = /^(-?\d+(\.\d+)?)[,\s]\s*(-?\d+(\.\d+)?)$/;

const errorMessage = {
  'required': 'Address is required',
  'placeSelected': 'Please enter a valid address or coordinate'
}

const AddFarm = () => {
  const dispatch = useDispatch();
  // const farm = useSelector(farmSelector);
  const { register, handleSubmit, getValues, setValue, errors } = useForm();
  const FARMNAME = 'farmName';
  const ADDRESS = 'address';
  const [address, setAddress] = useState('');
  const [gridPoints, setGridPoints] = useState({});
  const [country, setCountry] = useState('');
  const ref0 = register({ required: { value: true, message: 'Farm name is required' } });
  const ref1 = register({
    required: { value: true, message: 'Address is required' },
    validate: {
      placeSelected: data => address && gridPoints && data[address]
    }
  });

  const onSubmit = (data) => {
    // console.log(gridPoints, address, getValues(FARMNAME), data);
    const farmInfo = {
      ...data,
      gridPoints,
      country,
    };
    console.log(farmInfo);
    dispatch(postFarm(farmInfo));
  }

  let autocomplete;

  const handleScriptLoad = () => {
    const options = {
      types: ['address'],
      language: 'en-US'
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    autocomplete.setFields(['geometry', 'formatted_address', 'address_component']);

    // Fire Event when a suggested name is selected
    autocomplete.addListener('place_changed', handlePlaceChanged);
  }

  const clearState = () => {
    setAddress('');
    setGridPoints({});
    setCountry('');
  }

  const handlePlaceChanged = () => {
    console.log("handlePlaceChanged");
    const gridPoints = {};
    const place = autocomplete.getPlace();
    console.log(place);
    // const coordRegex = /^(-?\d+(\.\d+)?)[,\s]\s*(-?\d+(\.\d+)?)$/;
    const isCoord = coordRegex.test(getValues(ADDRESS));

    if (!place.geometry && !isCoord) {
      setValue(ADDRESS, '');
      clearState();
      return;
    }
    if (isCoord) {
      return;
    }

    // const pieces = place.formatted_address.split(', ');
    // // get last part of address, which is the country
    // setCountry(pieces[pieces.length - 1]);
    const country = place.address_components.find((component) => component.types.includes('country')).long_name;
    setCountry(country);

    setAddress(place.formatted_address);
    setValue(ADDRESS, place.formatted_address);
    gridPoints['lat'] = place.geometry.location.lat();
    gridPoints['lng'] = place.geometry.location.lng();
    setGridPoints(gridPoints);
  }

  const handleBlur = () => {
    console.log('handleBlur');
    const gridPoints = {};
    // const coordRegex = /^(-?\d+(\.\d+)?)[,\s]\s*(-?\d+(\.\d+)?)$/;
    const inputtedAddress = getValues(ADDRESS);
    const isCoord = coordRegex.test(inputtedAddress);
    if (isCoord) {
      // convert input to array of numbers
      let coords = inputtedAddress.split(/[,\s]\s*/).map(str => parseFloat(str));
      // perform check on lat lng values
      let lat = coords[0];
      let lng = coords[1];
      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        clearState();
        return;
      }

      setAddress(inputtedAddress);
      // this.props.dispatch(actions.change('profileForms' + model + '.address', this.props.address));
      gridPoints['lat'] = lat;
      gridPoints['lng'] = lng;
      setGridPoints(gridPoints);
      // this.props.dispatch(actions.change('profileForms' + model + '.gridPoints', gridPoints));
    } else {
      if (inputtedAddress !== address) clearState();
    }
  }

  const getGeoLocation = () => {
    console.log("calling getGeoLocation");
    navigator.geolocation.getCurrentPosition(function(position) {
      let gridPoints = {};
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const formattedAddress = `${lat}, ${lng}`;
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      gridPoints['lat'] = lat;
      gridPoints['lng'] = lng;
      setGridPoints(gridPoints);
      setAddress(formattedAddress);
      setValue(ADDRESS, formattedAddress);
    });
  }

  return <>
    <Script
      url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDNLCM0Fgm-_aF1x96paf-vdGzCAW6GRHM&libraries=places,drawing,geometry&language=en-US`}
      onLoad={handleScriptLoad}
    />
    <PureAddFarm onSubmit={handleSubmit(onSubmit)} title={'Tell us about your farm'} inputs={[{
      label: 'Farm name',
      inputRef: ref0,
      name: FARMNAME,
      errors: errors[FARMNAME] && errors[FARMNAME].message,
    }, {
      label: 'Farm location',
      info: 'Street address or comma separated latitude and longitude (e.g. 49.250945, -123.238492)',
      icon: <VscLocation size={27} onClick={getGeoLocation}/>,
      inputRef: ref1,
      id: 'autocomplete',
      name: ADDRESS,
      errors: errors[ADDRESS] && errorMessage[errors[ADDRESS]?.type],
      onBlur: handleBlur
    }]}/>
  </>
}

export default AddFarm;
