import React, { useState } from 'react';
import Map from './components/Map/Map'
import axios from 'axios';

import './App.css';

function App() {
  let [ userIp, setUserIp ] = useState(null);
  const getIp = async () => {
    await axios.get('http://localhost:8080/api/userIP')
    .then( ( res ) => { 
      setUserIp( res.data.data );
      } )
    .catch( ( err ) => { console.log(err); });
  }

  if( userIp === null ){
    getIp();
  }

  console.log("Ip: " + userIp)
  return (
    <div className="App">
      <Map ip={userIp}></Map>
    </div>
  );
}

export default App;
