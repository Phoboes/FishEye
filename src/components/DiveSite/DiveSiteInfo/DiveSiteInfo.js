import React from 'react';
import DeleteButton from '../DeleteButton/DeleteButton';

  const DiveSiteInfo = ( props ) => {

    const diveData = (
        <div>
          <h4>{props.siteData.name}</h4>
          <p>{props.siteData.description}</p>
          <p>Validated: {`${props.siteData.validated}`}</p>
          <button onClick={ ()=>{ props.editHandler(); }}>+</button>
          <DeleteButton 
            siteData={props.siteData} 
            refreshDataHandler={props.refreshDataHandler}
            updateSiteDataHandler={props.updateSiteDataHandler}  />
        </div>
      )


      return (
          diveData
      );
  }

  export default DiveSiteInfo;