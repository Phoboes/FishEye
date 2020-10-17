import React from 'react';
import Control from 'react-leaflet-control';
import NewSiteToolbar from '../../../forms/NewDiveSite/NewDiveSite';

  const EditControlWrap = ( props ) => {
    let toolbar = null;

    if( !props.toolbar ){
      toolbar = <NewSiteToolbar/>
    } else {
      toolbar = props.toolbar;
    }



      return (
          <Control position='topright'>
            { toolbar }
            <button>Click me.</button>
          </Control>
      );
  }

  export default EditControlWrap;