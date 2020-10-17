import React from 'react';
import axios from 'axios'
// import DiveForm from '../../forms/VizReport/VizReport';

  const DiveSiteInfo = ( props ) => {

    const deleteSiteHandler = () => {
      axios.delete("http://localhost:8080/api/divezone/" + `${ props.siteData._id }`)
              .then(function (response) {
                console.log(response);
                // props.successResponse();
              })
              .catch(function (error) {
                console.log(error);
              });
    console.log("Delete.")
  }
    // }

    const diveData = (
        <div>
          <h4>{props.siteData.name}</h4>
          <p>{props.siteData.description}</p>
          <p>Validated: {`${props.siteData.validated}`}</p>
          <button onClick={ ()=>{ props.editHandler(); }}>+</button>
          <button onClick={ deleteSiteHandler }>remove</button>
        </div>
      )


      return (
          diveData
      );
  }

  export default DiveSiteInfo;