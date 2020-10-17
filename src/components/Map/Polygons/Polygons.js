import React, { useState } from 'react';
import { Polygon, FeatureGroup, Popup } from 'react-leaflet';
// import DiveSite from '../DiveSiteInfo/DiveSiteInfo'
import DiveSiteInfo from '../DiveSiteInfo/DiveSiteInfo'
import EditZoneForm from '../../forms/DiveZone/DiveSiteForm';
// import Toolbar from './PolygonEdit'
import { EditControl } from 'react-leaflet-draw';
// import EditToolbarWrap from '../../Map/Controls/EditControlWrap/EditControlWrap'
import '../../forms/NewDiveSite/NewDiveSite.css'


  const Polygons = ( props ) => {
  let popupContent, toolbar = null;

  const [ popupShow, setPopupState ] = useState({ show: false, coords: {} });
  const [ editState, setEditState ] = useState(false);
  const [ toolbarShow, setToolbarState ] = useState(false);
  const [ polygon, setPolygon ] = useState({...props.siteData});

  
   const initHandler = ( ref ) => {
        if( ref !== null ){
            ref.leafletElement._toolbars.edit._toolbarContainer.children[0].click();
            ref.leafletElement._toolbars.edit._toolbarContainer.nextSibling.children[1].children[0].click();
        }
    }

    const editHandler = (e) => {
        setToolbarState(!toolbarShow)
        setEditState(!editState)
    }
    
    const handleExitEditState = () => {
        setToolbarState(false);
        setEditState(false);
    }

    const editChangeHandler = (e) => {
        let coords = [];
        if(e.layers){
            e.layers.eachLayer(( layer )=>{ 
                coords.push(layer.getLatLngs()[0].map((coord) => {return [coord.lat, coord.lng]}));
            })
        }
        if( coords.length > 0 ){
        setPolygon({ ...polygon, points: coords })
        }
    }

  if( editState ){
    popupContent = <EditZoneForm diveSite={polygon} positions={polygon.points} successResponse={ handleExitEditState }/>
  } else {
      popupContent = <DiveSiteInfo siteData={polygon} editHandler={editHandler}/>
  }

  if( toolbarShow ){
    props.toolbarHandler();
    toolbar = 
        (<EditControl
            ref={initHandler}
            position='topright'
            onEdited={editChangeHandler}
            draw={{
            rectangle: false,
            line: false,
            polyline: false,
            circle: false,
            circlemarker: false,
            polygon: false
        }}/>)
  }
    return (
        <FeatureGroup>
          <Polygon
            siteData={props.siteData} 
            color={props.color} 
            positions={props.siteData.boundaryPoints}
          >
            { toolbar }
            <Popup>{ popupContent }</Popup>
          </Polygon>
        </FeatureGroup>
    );
  }

  export default Polygons;