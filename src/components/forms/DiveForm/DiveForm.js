import React from 'react';
import './DiveForm.css';

  const DiveForm = ( props ) => {
      return (
          <div>
            <h3>Dive site.</h3>
            <form>
              <label>Vis:</label>
              <input type="text" placeholder="many"/>
            </form>
          </div>
      );
  }

  export default DiveForm;