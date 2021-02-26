import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import GoogleMap from 'google-map-react';
import { DEFAULT_ZOOM, GMAPS_API_KEY } from './constants';
import PureMapHeader from './Header';
import PureMapFooter from './Footer';
import MapFilter from '../MapFilter';

export default function PureMap({ isAdmin, farmName, handleGoogleMapApi, center }) {
  const { t } = useTranslation();
  const [showFilter, setShowFilter] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const onFilter = () => {
    setShowFilter(true);
  };

  const getMapOptions = (maps) => {
    return {
      streetViewControl: false,
      scaleControl: true,
      fullscreenControl: false,
      styles: [
        {
          featureType: 'poi.business',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
      ],
      gestureHandling: 'greedy',
      disableDoubleClickZoom: true,
      minZoom: 1,
      maxZoom: 80,
      tilt: 0,
      mapTypeControl: true,
      mapTypeId: maps.MapTypeId.SATELLITE,
      mapTypeControlOptions: {
        style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: maps.ControlPosition.BOTTOM_CENTER,
        mapTypeIds: [maps.MapTypeId.ROADMAP, maps.MapTypeId.SATELLITE, maps.MapTypeId.HYBRID],
      },
      zoomControl: true,
      clickableIcons: false,
    };
  };

  return (
    <div className={styles.pageWrapper}>
      <PureMapHeader className={styles.mapHeader} farmName={farmName} />
      <div className={styles.mapContainer}>
        <div className={styles.workaround}>
          <GoogleMap
            style={{ flexGrow: 1 }}
            bootstrapURLKeys={{
              key: GMAPS_API_KEY,
              libraries: ['drawing', 'geometry', 'places'],
              language: localStorage.getItem('litefarm_lang'),
            }}
            defaultCenter={center}
            defaultZoom={DEFAULT_ZOOM}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleGoogleMapApi(map, maps)}
            options={getMapOptions}
          ></GoogleMap>
        </div>
      </div>
      <PureMapFooter className={styles.mapFooter} isAdmin={isAdmin} setShowFilter={onFilter} />
      {showFilter && <MapFilter />}
    </div>
  );
}

PureMap.prototype = {
  isAdmin: PropTypes.bool,
  farmName: PropTypes.string,
  handleGoogleMapApi: PropTypes.func,
  center: PropTypes.object,
};
