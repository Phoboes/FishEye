import React, { useState } from 'react';
import axios from 'axios';
import Polygon from '../Map/Polygons/Polygons';
import Toolbar from '../Map/Controls/EditControlWrap/EditControlWrap';
import Aux from '../HOC/Auxillary';

const DiveSites = ( props ) => {
  const [ diveSites, setDiveSites ] = useState(false);
  let toolbar = <Toolbar/>;
  let zones;

  const [ defaultToolBar, toggleToolBar ] = useState(toolbar)

  const toolbarHandler = () => {
      toggleToolBar(null);
  }

  const fetchDiveSiteHandler = async ()=>{
    await axios.get('http://localhost:8080/api/divezones')
      .then( ( res ) => { 
        setDiveSites( res.data.data );
        console.log(res.data.data)
      })
      .catch( ( err ) => { console.log(err); });
  }

  if( diveSites ){
    zones = diveSites.map(( zone )=>{
      let color = "green";
      if( zone.ip === props.userIP ){
        color = "orange"
      }
      return <Polygon key={zone._id} color={color} siteData={ zone } toolbarHandler={toolbarHandler}/>
    })
  } else {
    fetchDiveSiteHandler();
  }


  return (
      <Aux>
        { defaultToolBar }
        { zones }
      </Aux>
  );
}

export default DiveSites;