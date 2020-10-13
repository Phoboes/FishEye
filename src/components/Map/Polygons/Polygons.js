import React from 'react';
import { Polygon } from 'react-leaflet';


  const Polygons = ( props ) => {
    console.log("New polygon!");
      return (
            <Polygon siteData={props.siteData} color={props.color} positions={props.siteData.boundaryPoints} onClick={(e)=>{}} />
      );
  }

  export default Polygons;