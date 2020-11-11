import React from 'react';
import axios from 'axios';
import { AiTwotoneDelete } from 'react-icons/ai';

  const DeleteButton = ( props ) => {
    const deleteSiteHandler = () => {
      axios.delete("http://localhost:8080/api/divezone/" + `${ props.siteData._id }`)
              .then(function (response) {
                console.log(response);
                props.refreshDataHandler();
                // props.updateSiteDataHandler(null);
              })
              .catch(function (error) {
                console.log(error);
              });
    console.log("Delete.")
  }

      return (
            <button onClick={deleteSiteHandler} >< AiTwotoneDelete /></button>
      );
  }

  export default DeleteButton;