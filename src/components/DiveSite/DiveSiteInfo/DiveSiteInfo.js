import React from 'react';
import DeleteButton from '../DeleteButton/DeleteButton';
import { AiFillEdit, AiFillEye } from 'react-icons/ai';
import { FaDrawPolygon } from 'react-icons/fa';

  const DiveSiteInfo = ( props ) => {

    const diveData = (
        <div>
          <h4>{props.siteData.name}</h4>
          <p>{props.siteData.description}</p>
          <p>Validated: {`${props.siteData.validated}`}</p>
          <button><AiFillEye/></button>
          <button><FaDrawPolygon/></button>
          <button onClick={ ()=>{ props.editHandler(); }}>< AiFillEdit /></button>
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