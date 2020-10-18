import React, { useState } from 'react';
import { Popup } from 'react-leaflet';
import DiveSiteInfo from '../../DiveSite/DiveSiteInfo/DiveSiteInfo';
import EditZoneForm from '../../DiveSite/Form/DiveSiteForm';
// import '../../DiveSite/Form/DiveSiteForm.css'

const PolygonPopup = (props) => {
    let content = null;
    const [ siteData, setSiteData ] = useState({...props.siteData})
    const [ editForm, toggleEditForm ] = useState(false);

    const editFormHandler = () => {
        toggleEditForm(!editForm);
        // props.editToolBarToggle(!editForm)
    }

    const updatePopupContentHandler = ( updatedData ) => {
        setSiteData(updatedData);
        editFormHandler();
    }

    if(!editForm){
        content = (
            <DiveSiteInfo 
                siteData={ siteData }
                editHandler={ editFormHandler }
                refreshDataHandler={props.refreshDataHandler}
                />
        );
    } else {
        content = (
        <EditZoneForm 
            newShapeBounds={ props.polygon.points }
            updatePopupContent={updatePopupContentHandler} 
            refreshDataHandler={props.refreshDataHandler} 
            siteData={siteData}
            cancelEdit={editFormHandler}
            editToolBarToggle={props.editToolBarToggle}
            />)
    }



    return(
        <Popup>
            {content}
        </Popup>
    )
}

export default PolygonPopup;
