import React, { useState } from 'react';
import Control from 'react-leaflet-control';
import NewDiveEditControls from '../../../forms/NewDiveSite/NewDiveSite';


  const EditControlWrap = ( props ) => {
    const [ showControl, toggleShowControl ] = useState(false);
    let markup = null;
    const toggleHandler = () => {
      toggleShowControl(!showControl)
    }

    if( showControl ){
      if(props.controls){
        markup = props.controls;
      } else {
        markup = <NewDiveEditControls clicked={toggleHandler}/>
      }
    } else {
      // debugger
      markup = null;
    }

      return (
          <Control position='topright'>
            { markup }
            <button onClick={toggleHandler}>Add</button>
          </Control>
      );
  }

  export default EditControlWrap;