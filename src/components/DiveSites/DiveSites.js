import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Polygon from '../Map/Polygons/Polygons';
import Toolbar from '../Map/Controls/EditControlWrap/EditControlWrap';
import Aux from '../HOC/Auxillary';

const DiveSites = ( props ) => {
  const [ diveSites, setDiveSites ] = useState(false);
  const [ polygonComponents, setPolygonComponents ] = useState(null);
  const [ toolbar, setToolbar ] = useState(null);

 const toolbarHandler = ( toolbar ) => {
      if( toolbar ){
        setToolbar(toolbar);
      }
  }

  useEffect(() => {
    if( diveSites ){
      let zones = diveSites.map(( zone )=>{
        let color = "green";
        if( zone.ip === props.userIP ){
          color = "orange"
        }
        console.log("Made polygon for " + zone.name)
        return <Polygon key={zone._id} color={color} siteData={ zone } refreshDataHandler={ fetchDiveSiteHandler } setToolbar={ toolbarHandler }/>
      })
      setPolygonComponents(zones)
      } else {
      fetchDiveSiteHandler();
    }
  }, [diveSites])

  const fetchDiveSiteHandler = async ()=>{
    console.log("Fetched new data")
    await axios.get('http://localhost:8080/api/divezones')
      .then( ( res ) => { 
        setDiveSites( res.data.data );
        console.log(res.data.data)
      })
      .catch( ( err ) => { console.log(err); });
  }
  console.log(toolbar)
  if( !toolbar ){
    setToolbar(<Toolbar refreshDataHandler={ fetchDiveSiteHandler }/>)
  }

  return (
      <Aux>
        { toolbar }
        { polygonComponents }
      </Aux>
  );
}

export default DiveSites;