import React from 'react';
import {Popup} from 'react-leaflet';
import DiveSite from '../DiveSite/DiveSite'
import Spinner from '../../../utils/Spinner/Spinner';

  // const content = <Spinner/>
  const initialState = {
      loaded: false,
      siteData: {
        name: null,
        vis: null,
        lastUpdated: null
      }
    }


  const CustomPopup = ( props ) => {



    const [state, setState] = React.useState(initialState);

    const getData = () => {
      if( !state.loaded ){
        // setState({...state, loaded: true});
        setState({...state, loaded: true, siteData:{
          name: "Boat Harbour",
          vis: "2",
          lastUpdated: "5 hours ago."
        }})
      }
    }

    const setData = ()=>{
      if(state.loaded){
        return (
          <DiveSite 
          name={state.siteData.name}
          vis={state.siteData.vis}
          lastUpdated={state.siteData.lastUpdated}
          clicked={ props.clicked }/>
        )
      } else {
        return (
          <div>
            <h4>Loading...</h4>
            <Spinner/>
          </div>
        )
      }
    }

setInterval(() => {
          getData();
        }, 5000);

    const popupContent = setData();

      return (
          <Popup>
            {popupContent}
          </Popup>
      );
  }

  export default CustomPopup;