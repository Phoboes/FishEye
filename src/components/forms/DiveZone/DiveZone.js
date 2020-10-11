import React from 'react';

  const DiveZone = ( props ) => {
      return (
          <div>
            <form>
              <label for="name">Dive site name:</label>
              <input type="text" id="name" name="name" value="Dive Site"/>
              <label for="vis">Visibility:</label>
              <input type="text" id="vis" name="vis" value="Vis"/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
      );
  }

  export default DiveZone;