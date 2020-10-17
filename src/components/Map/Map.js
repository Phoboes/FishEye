import React, { useState } from 'react';
import { Map, Marker } from 'react-leaflet';
import './Map.css';
import LayerControls from '../Map/Controls/LayerControl/LayerControls';
import EditControlWrap from './Controls/EditControlWrap/EditControlWrap'
import DiveSites from '../DiveSites/DiveSites';

const MapWrapper = ( props ) => {

  return (
      <div className="leaflet-container">
          <Map center={[-34.040441,151.1988752]} zoom={13}>
            <LayerControls/>
              <DiveSites ip={ props.ip }/>
          </Map>
        </div>
  );
}
  export default MapWrapper;