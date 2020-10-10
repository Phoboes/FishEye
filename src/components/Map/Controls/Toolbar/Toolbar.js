import React from 'react';

  const Toolbar = ( props ) => {
      return (
          <div>
            <p>Toolbar.js</p>
            { props.children }
          </div>
      );
  }

  export default Toolbar;