import React, { useState, useRef } from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import './NewDiveSite.css';

import NewZoneForm from '../DiveZone/DiveSiteForm';
import Popup from '../../Map/Popup/Popup';
import POI from '../../Map/PointOfInterest/PointOfInterest';
  // let jsxpop = <Popup><Zone/></Popup>

  // Todo: Move this inside and un-break whatever it breaks.
  // let completeForm = null;

  const NewDiveSite = ( props ) => {
    const [ polygon, setPolygon ] = useState({});
    const [ popup, setPopup ] = useState({show: false});
    const [ editing, toggleEdit ] = useState(false)

    let completeForm = null;
    const toolbar = useRef(null)

    // const clickHandlers=(ref)=>{
    //   if(ref === null){ return }
    //   const buttons = ref.leafletElement._toolbars
    //   const drawContainer = buttons.draw._toolbarContainer
    //   const editContainer = buttons.edit._toolbarContainer

    //   const toggleDrawBar = ()=>{
    //     drawContainer.style.display = "none"
    //     editContainer.style.display = "block"
    //     console.log("Clicked toggleDrawer")
    //     toggleEdit(false);
    //   }
    //   const toggleEditBar = ()=>{
    //     editContainer.style.display = "none"
    //     drawContainer.style.display = "block"
    //     console.log("Clicked toggleDrawer")
    //     toggleEdit(true);
    //   }

    //   if( !editing ){
    //     toggleEditBar()
    //   }

    //   for(let i = 0; i < editContainer.children.length; i++ ){
    //     editContainer.children[i].addEventListener('click', toggleDrawBar);
    //   }

    //   for(let i = 0; i < drawContainer.children.length; i++ ){
    //     drawContainer.children[i].addEventListener('click', toggleEditBar);
    //   }

    //   // buttons.draw._toolbarContainer.addEventListener('click', () => {
    //   //   buttons.draw._toolbarContainer.style.display = "none"
    //   //   buttons.edit._toolbarContainer.style.display = "block"
    //   // });

    //   // debugger
    //   // ref.leafletElement._toolbars
    // }

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
          <NewZoneForm positions={polygon.positions}/>
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
        // ref={ clickHandlers }
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