import React, { useState } from 'react';
import { Polygon, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import '../../DiveSite/Form/DiveSiteForm.css'

import PolygonPopupContent from './PolygonPopup';

  const Polygons = ( props ) => {
  let toolbar = null;

  // const [ editState, setEditState ] = useState(false);
  // const [ toolbarShow, setToolbarState ] = useState(true);
  const [ polygon, setPolygon ] = useState({...props.siteData});

  //  const initHandler = ( ref ) => {
  //       if( ref !== null ){
  //           ref.leafletElement._toolbars.edit._toolbarContainer.children[0].click();
  //           ref.leafletElement._toolbars.edit._toolbarContainer.nextSibling.children[1].children[0].click();
  //       }
  //   }

    // const editHandler = (e) => {
    // //     setToolbarState(!toolbarShow)
    //     setEditState(!editState)
    // }
    
    // const handleExitEditState = () => {
    //     // setToolbarState(false);
    //     // setEditState(false);
    // }

    const editChangeHandler = (e) => {
        // debugger
        let coords = [];
        if(e.layers){
            e.layers.eachLayer(( layer )=>{ 
                coords.push(layer.getLatLngs()[0].map((coord) => {return [coord.lat, coord.lng]}));
            })
        }
        if( coords.length > 0 ){
          setPolygon({ ...polygon, points: coords[0] })
        }
        // debugger
    }

  // if( toolbarShow ){
  //   props.toolbarHandler();
    toolbar = 
        (<EditControl
            ref={null /*initHandler*/}
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
  // }
    return (
        <FeatureGroup>
          <Polygon
            siteData={props.siteData} 
            color={props.color} 
            positions={props.siteData.boundaryPoints}
          >
            { toolbar }
            <PolygonPopupContent 
              polygon={polygon}
              siteData={props.siteData} 
              refreshDataHandler={props.refreshDataHandler}
              // editToolBarToggle={ editHandler }
              />
          </Polygon>
        </FeatureGroup>
    );
  }

  export default Polygons;