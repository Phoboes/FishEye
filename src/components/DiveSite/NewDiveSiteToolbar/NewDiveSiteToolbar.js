import React, { useState, useRef } from 'react';
import { FeatureGroup, Popup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import './NewDiveSiteToolbar.css';

import NewZoneForm from '../Form/DiveSiteForm';
import DiveSiteInfo from '../DiveSiteInfo/DiveSiteInfo';
// import POI from '../../Map/PointOfInterest/PointOfInterest';

  const NewDiveSite = ( props ) => {
    const [ polygon, setPolygon ] = useState({});
    const [ popup, setPopup ] = useState({show: false});
    const [ drawing, toggleDrawing ] = useState(false);
    const [ formCompleted, setFormComplete ] = useState(false);

    let completeForm = null;
    let popupContent = null;
    let toggleDrawBar, toggleEditBar = null;
    let toolbar = useRef(null);


    const popupContentHandler = () => {
      setFormComplete(true);
    }

    if( !formCompleted ){
      popupContent = (
        <NewZoneForm 
          newShapeBounds={polygon.positions} 
          refreshDataHandler={ props.refreshDataHandler } 
          successResponse={ popupContentHandler }/>
      );
    } else {
      popupContent = <DiveSiteInfo siteData={polygon}/>
    }
    const clickHandlers = (ref) => {
      if(ref === null){ return }
      toolbar = ref;
      const buttons = toolbar.leafletElement._toolbars
      const drawContainer = buttons.draw._toolbarContainer
      const editContainer = buttons.edit._toolbarContainer

      toggleDrawBar = () => {
        if( drawing ){
          drawContainer.style.display = "none"
        } else {
          drawContainer.style.display = "block"
        }
        toggleDrawing(!drawing);
        console.log("ToggleDraw ")
      }

      toggleEditBar = (enabled = false) => {
        if( enabled ){
          editContainer.style.display = "none"
        } else {
          editContainer.style.display = "block"
        }
        console.log("ToggleEdit")
      }

        toggleEditBar()

      for(let i = 0; i < editContainer.children.length; i++ ){
        editContainer.children[i].addEventListener('click', toggleDrawBar);
      }

      for(let i = 0; i < drawContainer.children.length; i++ ){
        drawContainer.children[i].addEventListener('click', toggleEditBar);
      }
    }

  const _onChange = (e, coords = null) => {
    if( e.layerType === "polygon" ){
      coords = (e.layer.getLatLngs())[0];
      setPolygon({ positions: coords })
      setPopup({ position: e.target.options.center, show: true })
    } else {
      coords = (e.layer.getLatLng());
      // props.overlay( <POI point={ coords } /> )
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
    if( popup.show ){
      completeForm = (
        <Popup
          setLatLng={popup.position}
          >
          { popupContent }
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
        ref={ clickHandlers }
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
    { props.children }
    { completeForm }
    </FeatureGroup>
  );
  }

  export default NewDiveSite;