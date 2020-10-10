import React from 'react';
import UpdateDiveForm from '../../forms/DiveForm/DiveForm';

  const DiveSite = ( props ) => {

    const diveData = (
        <div>
          <h4>{props.name}</h4>
          <p>Average vis: { props.vis }m</p>
          <p>Last updated: { props.lastUpdated }</p>
          <button onClick={ ()=>{ props.clicked( (<UpdateDiveForm/>) ); }}>+</button>
        </div>
      )


      return (
          diveData
      );
  }

  export default DiveSite;