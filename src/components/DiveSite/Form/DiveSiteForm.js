import React, { useState } from 'react';
import axios from 'axios'
import './DiveSiteForm.css';

  const DiveZone = ( props ) => {

  const formValues = props.siteData !== undefined ? {...props.siteData} : {};
  const [ formData, setFormData ] = useState(formValues)

    props.editToolBarToggle();

  const formSubmitHandler = ( e ) => {
    // These are used to toggle the popup form if this is a new shape and it submits successfully.
    const popup = e.currentTarget.parentNode.parentElement.parentElement.parentElement.parentElement;
    const polygon = popup.parentElement;
    e.preventDefault(e);
    const request = {
      url: 'http://localhost:8080/api',
      method: ''
    }

    // If there's no data, it's a new shape.
    if( props.siteData === undefined ){
      request.url = request.url + `/diveZones`;
      request.method = axios.post
    } else {
      request.url = request.url + `/diveZone/${ props.siteData._id }`;
      request.method = axios.patch
    }

    // Deals with a shape that is entirely new, or an edit state.
    if( props.newShapeBounds ){
      formData.boundaryPoints = props.newShapeBounds
    }

    // Sets the methods of either push or patch depending on the model type (new or existing)
    request.method(request.url, {...formData, positions: formData.boundaryPoints })
              .then(function (response) {
                console.log(response);
                props.refreshDataHandler();
                if( props.updatePopupContent ){
                  props.updatePopupContent( response.data.data );
                  return
                }
              })
              .catch(function (error) {
                console.log(error);
              });
    console.log("SUBMIT.")
    polygon.click();
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
              <button>Submit</button><button onClick={ ()=>{ props.cancelEdit(); } }>Cancel</button>
            </form>
          </div>
      );
  }

  export default DiveZone;