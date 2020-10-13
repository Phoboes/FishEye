import React, { useEffect, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import axios from 'axios';
import { Map, Marker } from 'react-leaflet';
import Popup from './Popup/Popup';
import './Map.css';
import diveIcon from '../../Images/Markers/diveMarker';
import Modal from '../Modal/Modal';
import LayerControls from '../Map/Controls/LayerControl/LayerControls';
import Toolbar from './Controls/Toolbar/Toolbar';
import Polygon from './Polygons/Polygons'

let modal, zones = null;
const MapWrapper = ( props ) => {

  const [overlay, overlayToggle] = useState(false);
  const [userIP, setUserIP] = useState();
  const [diveSites, setDiveSites] = useState([]);

  const fetchDiveSiteHandler = ()=>{
    axios.get('http://localhost:8080/api/divezones')
    .then( ( res ) => { 
      setDiveSites( res.data.data );
      console.log(res.data.data)
     })
    .catch( ( err ) => { console.log(err); });
  }

  useDeepCompareEffect(() => {
    console.log('Dive Site changed')
    fetchDiveSiteHandler();
  }, [diveSites])

  useEffect(() => {
    console.log('Get IP')
    axios.get('http://localhost:8080/api/userIP')
      .then( ( res ) => { 
        setUserIP( res.data.data )
       } )
      .catch( ( err ) => { console.log(err); });
  }, [userIP])

  if( diveSites ){
    zones = diveSites.map(( zone )=>{
      return <Polygon key={zone._id} color="purple" siteData={ zone } />
    })
  }

  const overlayHandler = ( content ) => {
    console.log(content)
    console.log(overlay)
    if( !overlay && !content ){
      modal = null;
      overlayToggle(false)
    } else {
      modal = (<Modal>{ content }</Modal>);

      overlayToggle(true);
    }
      // console.log(overlay)
  }

  return (
    <div>
      <div className="leaflet-container">
          <Map center={[-34.040441,151.1988752]} zoom={13} onClick={ (e)=>{ /*polygon.push( Object.values(e.latlng) );  console.log(polygon)}*/ }}>
            <LayerControls/>
            <Marker 
            position={[-34.04236522975801, 151.19794607162476]}
            icon={diveIcon}
            >
              <Popup clicked={overlayHandler}>A popup!</Popup>
            </Marker>
              { zones }
              <Toolbar overlay={overlayHandler} />
          </Map>
        </div>
        { modal }
      </div>
  );
}

  export default MapWrapper;