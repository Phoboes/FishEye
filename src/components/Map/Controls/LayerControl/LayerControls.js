import React from 'react';
import {TileLayer, LayersControl } from 'react-leaflet';
import './LayerControls.css'

const { BaseLayer } = LayersControl;

  const satellite = (
    <TileLayer 
      url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      attribution={null}
      maxZoom="18"
      id='mapbox/streets-v11'
      // tileSize="512"
      accessToken={process.env.REACT_APP_LEAFLET_API}
    />
  )
  
  const street = (
    <TileLayer 
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      attribution={null}
      maxZoom="18"
      id='mapbox/streets-v11'
      // tileSize="512"
      accessToken={process.env.REACT_APP_LEAFLET_API}
    />
  )


          



  const LayerControls = ( props ) => {
      return (
          <LayersControl position="topright">
                <BaseLayer checked name="Satellite">
                  { satellite }
                </BaseLayer>
                 <BaseLayer checked name="Street">
                  { street }
                </BaseLayer>
          </LayersControl>
      );
  }

  export default LayerControls;