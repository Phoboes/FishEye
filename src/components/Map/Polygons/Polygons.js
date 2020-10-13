import React, { useState, useEffect } from 'react';
import { Polygon } from 'react-leaflet';
import Popup from '../Popup/Popup'
import DiveSite from '../DiveSite/DiveSite'

  let popup = null;
  const Polygons = ( props ) => {
    const [ popupShow, setPopupState ] = useState({ show: false, coords: {} });
    const [ siteData, setSiteData ] = useState({});

    useEffect(()=>{
      setSiteData({... props.siteData})
    }, [siteData.name]);

    useEffect(() => {
      if( popupShow ){
        popup = (
          <Popup setLatLng={ popupShow.coords }>
            <DiveSite name={siteData.name} description={siteData.description} />
          </Popup>
        );
      } else {
        popup = null;
      }
    }, [popupShow])

    const popupHandler = (e) => {
      // debugger
      // setSiteData({...props.siteData})
      setPopupState( { show: !popupShow, coords: e.latlng } );
    };

    // console.log("New polygon!");
      return (
            <Polygon siteData={props.siteData} color={props.color} positions={props.siteData.boundaryPoints} onClick={popupHandler} >
              { popup }
            </Polygon>
      );
  }

  export default Polygons;