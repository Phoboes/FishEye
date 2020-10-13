import React, { useState, useEffect } from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import './Toolbar.css';

import Zone from '../../../forms/DiveZone/DiveZone';
import Popup from '../../Popup/Popup';
import POI from '../../../Map/PointOfInterest/PointOfInterest';
  // let jsxpop = <Popup><Zone/></Popup>

  let completeForm, triggerPop = null;

  const Toolbar = ( props ) => {
    const [ polygon, setPolygon ] = useState({});
    const [ popup, setPopup ] = useState({show: false});

  const _onChange = (e, coords = null) => {
    if( e.layerType === "polygon" ){
      coords = (e.layer.getLatLngs())[0];
      setPolygon({ positions: coords })
      setPopup({ position: e.target.options.center, show: true })
      // triggerPop = e.layer
      // debugger
    } else {
      coords = (e.layer.getLatLng());
      props.overlay( <POI point={ coords } /> )
    }
  }

  const _onCreate = (e) => {
    let center = (e) => {}
    let type = e.layerType;
    let layer = e.layer;
    if (type === 'marker') {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    }
    else {
      // debugger
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
    // debugger
    let coords = [];
    if(e.layers){
      e.layers.eachLayer(( layer )=>{ coords.push(layer.getLatLngs()) })
    }

    if( coords.length > 0 ){
      setPolygon({ positions: coords[0][0] })
      console.log('_onEditStart', e);
    }
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

  const popupHandler = ()=>{
    console.log("Popup!")
    if( popup.show ){
      console.log(Popup)
      completeForm = (
        <Popup
          setLatLng={popup.position}
          >
          <Zone positions={polygon.positions}/>
        </Popup>
      )
    }
  }

  popupHandler();

   function initPopup(ref) {
      if (ref) {
        ref.leafletElement.openPopup();
      }
    }


  return (
    <FeatureGroup ref={initPopup}>
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
          circlemarker: false
        }}
    />
    { completeForm }
    </FeatureGroup>
  );
  }

  export default Toolbar;