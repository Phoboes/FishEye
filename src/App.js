import React from 'react';
import Map from './components/Map/Map'
import axios from 'axios';

import './App.css';

function App() {
  let userIp = null;
  const getIp = async () => {
    await axios.get('http://localhost:8080/api/userIP')
    .then( ( res ) => { 
      userIp = ( res.data.data )
      } )
    .catch( ( err ) => { console.log(err); });
  }

  if( userIp === null ){
    getIp();
  }

  return (
    <div className="App">
      <Map ip={userIp}></Map>
    </div>
  );
}

export default App;
