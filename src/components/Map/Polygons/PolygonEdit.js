import React, { useState, useEffect } from 'react';
import { Polygon, FeatureGroup } from 'react-leaflet';
import Popup from '../Popup/Popup'
import DiveSiteInfo from '../DiveSiteInfo/DiveSiteInfo'
import { EditControl } from 'react-leaflet-draw';
import EditZoneForm from '../../forms/DiveZone/DiveSiteForm';
import '../../forms/NewDiveSite/NewDiveSite.css'


  const Polygons = ( props ) => {
    const [ editState, setEditState ] = useState(false)
    const [ toolbarShow, setToolbarState ] = useState(false);
    const [ polygon, setPolygon ] = useState({...props.siteData});

    let toolbar, popupContent = null;

    // Stops some weird error with the shape refusing to update that doesn't seem to want to be fixed any other way.
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


    // const _onEditPath = (e) => {
    //     debugger
    //     console.log("I trigger on the 'save button'")
    // }
    
    // const editHandler = (e) => {
    //     setToolbarState(!toolbarShow)
    // }

    return (
        <FeatureGroup>
            
          <Polygon
            siteData={props.siteData} 
            color={props.color} 
            positions={props.siteData.boundaryPoints} 
            // onClick={editHandler}
            >
            { toolbar }
            <Popup>{ popupContent }</Popup>
          </Polygon>
        </FeatureGroup>
    );
  }

  export default Polygons;