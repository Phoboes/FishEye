import React from 'react';
import './Overlay.css'

  const Overlay = ( props ) => {
      return (
          <div className="overlay" onClick={ ()=>{ props.clicked( null ); } }>
            { props.children }
          </div>
      );
  }

  export default Overlay;