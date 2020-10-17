import React from 'react';
import './VizReport.css';

  const VizReport = ( props ) => {
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

  export default VizReport;