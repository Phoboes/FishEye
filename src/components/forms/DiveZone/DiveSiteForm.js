import React, { useState } from 'react';
import axios from 'axios'
import './DiveSiteForm.css';

  const DiveZone = ( props ) => {

    const formValues = props.diveSite !== undefined ? {...props.diveSite} : {};
    const [ formData, setFormData ] = useState(formValues)

  const formSubmitHandler = ( e ) => {
    e.preventDefault();
    const request = {
      url: 'http://localhost:8080/api',
      method: ''
    }

    if( props.diveSite === undefined ){
      // debugger
      request.url = request.url + `/diveZones`;
      request.method = axios.post
    } else {
      // debugger
      request.url = request.url + `/diveZone/${ props.diveSite._id }`;
      request.method = axios.patch
    }

    if( props.positions ){
      formData.boundaryPoints = props.positions
    }

    request.method(request.url, {...formData, positions: formData.boundaryPoints })
              .then(function (response) {
                console.log(response);
                props.successResponse();
              })
              .catch(function (error) {
                console.log(error);
              });
    console.log("SUBMIT.")
  }

    console.log('Form rendered')
    console.log(props)

    const onChangeHandler = (e) => {
      const updatedValue = {...formData};
      updatedValue[e.target.name] = e.target.value;
      setFormData(updatedValue);
    }

      return (
          <div>
            <h3>{ formValues.name ? `Edit ${formValues.name}:` : "New site:" }</h3>
            <form onSubmit={ formSubmitHandler }>
              <label htmlFor="name">Dive site name:</label>
              <br/>
              <input type="text" id="name" name="name" placeholder="Dive Site" defaultValue={formValues.name} autoFocus={true} onChange={onChangeHandler}/>
              <br/>
              <label htmlFor="vis">Visibility:</label>
              <br/>
              <input type="number" id="vis" name="vis" placeholder="Vis" defaultValue={formValues.visibility} onChange={onChangeHandler}/>
              <br/>
              <label htmlFor="description">Description (optional):</label>
              <br/>
              <input type="text" id="description" name="description" defaultValue={formData.description} onChange={onChangeHandler}/>
              <br/>
              <button>Submit</button>
            </form>
          </div>
      );
  }

  export default DiveZone;