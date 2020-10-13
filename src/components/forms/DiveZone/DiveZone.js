import React, { useEffect } from 'react';
import axios from 'axios'
import './DiveZone.css';

  const DiveZone = ( props ) => {

  const formSubmitHandler = ( e ) => {
    e.preventDefault();
    // debugger
    const formValues = {...props};
    
    for(let i = 0; i < e.target.length - 1; i++ ){
      formValues[e.target[i].name] = e.target[i].value
    }
    
    axios.post('http://localhost:8080/api/divezones', {...formValues})
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
    console.log("SUBMIT.")
  }

    console.log('Form rendered')
    console.log(props)

      return (
          <div>
            <h3>New site:</h3>
            <form onSubmit={ formSubmitHandler }>
              <label htmlFor="name">Dive site name:</label>
              <br/>
              <input type="text" id="name" name="name" placeholder="Dive Site" autoFocus={true}/>
              <br/>
              <label htmlFor="vis">Visibility:</label>
              <br/>
              <input type="number" id="vis" name="vis" placeholder="Vis"/>
              <br/>
              <label htmlFor="vis">Description (optional):</label>
              <br/>
              <input type="text" id="description" name="description"/>
              <br/>
              <button>Submit</button>
            </form>
          </div>
      );
  }

  export default DiveZone;