import React from 'react';
import DiveForm from '../../forms/DiveForm/DiveForm';

  const DiveSite = ( props ) => {

    const diveData = (
        <div>
          <h4>{props.name}</h4>
          <p>Average vis: { props.vis }m</p>
          <p>Last updated: { props.lastUpdated }</p>
          <button onClick={ ()=>{ props.clicked( (<DiveForm/>) ); }}>+</button>
        </div>
      )


      return (
          diveData
      );
  }

  export default DiveSite;