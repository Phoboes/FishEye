import React, {useState} from 'react';
// import Control from 'react-leaflet-control';
import NewSiteToolbar from '../../../DiveSite/NewDiveSiteToolbar/NewDiveSiteToolbar';
import Aux from '../../../HOC/Auxillary';

import './EditControlWrap.css'

  const EditControlWrap = ( props ) => {
    const defaultToolbar = null;
    const [ toolbar, setToolbar ] = useState(defaultToolbar);

    if( !props.toolbar && !toolbar ){
      setToolbar(<NewSiteToolbar refreshDataHandler={ props.refreshDataHandler }/>);
    } 



      return (
        <Aux>
          { toolbar }
        </Aux>
      );
  }

  export default EditControlWrap;