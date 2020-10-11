import React from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import './Toolbar.css';

import Zone from '../../../forms/DiveZone/DiveZone';
import POI from '../../../forms/PointOfInterest/PointOfInterest';

  const Toolbar = ( props ) => {
  const _onChange = (e, coords = null) => {
    if( e.layerType === "polygon" ){
      coords = (e.layer.getLatLngs());
      props.overlay( <Zone points={ coords } /> )
    } else {
      coords = (e.layer.getLatLng());
      props.overlay( <POI point={ coords } /> )

    }

  }

  const _onCreate = (e) => {
    let type = e.layerType;
    let layer = e.layer;
    if (type === 'marker') {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    }
    else {
      console.log("_onCreated: something else created:", type, e);
    }
    // Do whatever else you need to. (save to db; etc)

    _onChange(e);
  }

  const _onDeleted = (e) => {

    let numDeleted = 0;
    e.layers.eachLayer( (layer) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

    _onChange(e);
  }

  const _onMounted = (drawControl) => {
    console.log('_onMounted', drawControl);
  }

  const _onEditPath = (e) => {
    console.log('_onEditStart', e);
  }

  const _onEditStop = (e) => {
    console.log('_onEditStop', e);
  }

  const _onDeleteStart = (e) => {
    console.log('_onDeleteStart', e);
  }

  const _onDeleteStop = (e) => {
    console.log('_onDeleteStop', e);
  }

      return (
        <FeatureGroup>
          <EditControl
            position='topright'
            onEdited={_onEditPath}
            onCreated={_onCreate}
            onDeleted={_onDeleted}
            draw={{
              rectangle: false,
              line: false,
              polyline: false,
              circle: false,
              marker: false
            }}
        />
        </FeatureGroup>
      );
  }

  export default Toolbar;