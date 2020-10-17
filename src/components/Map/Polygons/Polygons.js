import React, { useState, useEffect } from 'react';
import { Polygon, FeatureGroup } from 'react-leaflet';
import Popup from '../Popup/Popup'
import DiveSite from '../DiveSiteInfo/DiveSiteInfo'
import PolyEdit from './PolygonEdit';

  const Polygons = ( props ) => {
    const [ popupShow, setPopupState ] = useState({ show: false, coords: {} });

    let markup = null;
  
  if( popupShow ){
    markup = (
      <Popup setLatLng={ popupShow.coords }>
        <DiveSite name={props.siteData.name} description={props.siteData.description} />
      </Popup>
    );
  }
    const popupHandler = (e) => {
      setPopupState( { show: !popupShow, coords: e.latlng } );
    };

    return (
          // <Polygon siteData={props.siteData} color={props.color} positions={props.siteData.boundaryPoints} onClick={popupHandler} >
          //   { markup }
          // </Polygon>
          <PolyEdit
            siteData={props.siteData} 
            color={props.color} 
            positions={props.siteData.boundaryPoints}
          />
    );
  }

  export default Polygons;