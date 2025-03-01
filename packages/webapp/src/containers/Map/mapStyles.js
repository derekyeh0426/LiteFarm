import {
  barnColour,
  bufferZoneColour,
  ceremonialSiteColour,
  farmBoundColour,
  farmBoundHoverColour,
  fenceColour,
  fieldColour,
  gardenColour,
  greenhouseColour,
  naturalAreaColour,
  residenceColour,
  surfaceWaterColour,
  watercourseColour,
  barnSelectedColour,
  bufferZoneSelectedColour,
  ceremonialSiteSelectedColour,
  // farmBoundSelectedColour,
  fieldSelectedColour,
  gardenSelectedColour,
  greenhouseSelectedColour,
  naturalAreaSelectedColour,
  residenceSelectedColour,
  surfaceWaterSelectedColour,
} from './styles.module.scss';
import waterValve from '../../assets/images/map/water-valve.png';
import waterValveHover from '../../assets/images/map/water-valve-hover.png';
import gate from '../../assets/images/map/gate.png';
import gateHover from '../../assets/images/map/gate-hover.png';

export const areaStyles = {
  barn: {
    colour: barnColour,
    selectedColour: barnSelectedColour,
    dashScale: 2,
    dashLength: '14px',
  },
  ceremonial_area: {
    colour: ceremonialSiteColour,
    selectedColour: ceremonialSiteSelectedColour,
    dashScale: 1.5,
    dashLength: '8px',
  },
  farm_site_boundary: {
    colour: farmBoundColour,
    hoverColour: farmBoundHoverColour,
    // selectedColour: farmBoundSelectedColour,
    dashScale: 1,
    dashLength: '1px',
  },
  field: {
    colour: fieldColour,
    selectedColour: fieldSelectedColour,
    dashScale: 1,
    dashLength: '6px',
  },
  garden: {
    colour: gardenColour,
    selectedColour: gardenSelectedColour,
    dashScale: 1,
    dashLength: '6px',
  },
  greenhouse: {
    colour: greenhouseColour,
    selectedColour: greenhouseSelectedColour,
    dashScale: 1,
    dashLength: '8px',
  },
  surface_water: {
    colour: surfaceWaterColour,
    selectedColour: naturalAreaSelectedColour,
    dashScale: 0.7,
    dashLength: '6px',
  },
  natural_area: {
    colour: naturalAreaColour,
    selectedColour: residenceSelectedColour,
    dashScale: 0.7,
    dashLength: '12px',
  },
  residence: {
    colour: residenceColour,
    selectedColour: surfaceWaterSelectedColour,
    dashScale: 0,
    dashLength: '12px',
  },
};

export const lineStyles = {
  watercourse: {
    colour: watercourseColour,
    dashScale: 0.7,
    dashLength: '6px',
    polyStyles: {
      strokeColor: watercourseColour,
      strokeWeight: 2,
      fillColor: watercourseColour,
      fillOpacity: 0.3,
    },
  },
  farm_site_boundary: {
    colour: farmBoundColour,
    hoverColour: farmBoundHoverColour,
    dashScale: 1,
    dashLength: '1px',
    polyStyles: {
      strokeColor: 'transparent',
      strokeWeight: 1,
      fillColor: 'transparent',
      fillOpacity: 0.3,
    },
  },
  fence: {
    colour: fenceColour,
    dashScale: 0.7,
    dashLength: '6px',
  },
  buffer_zone: {
    colour: bufferZoneColour,
    selectedColour: bufferZoneSelectedColour,
    dashScale: 0.7,
    dashLength: '6px',
    polyStyles: {
      strokeColor: bufferZoneColour,
      strokeWeight: 2,
      fillColor: bufferZoneColour,
      fillOpacity: 0.3,
    },
  },
};

export const icons = {
  gate: gate,
  water_valve: waterValve,
};
export const hoverIcons = {
  gate: gateHover,
  water_valve: waterValveHover,
};
