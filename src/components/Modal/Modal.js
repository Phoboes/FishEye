import React from 'react';
import Overlay from '../Overlay/Overlay'
import './Modal.css'

  const Modal = ( props ) => {
      return (
          <Overlay clicked= {props.clicked }>
            <div className="modal">
              { props.children? props.children : <p>Pending...</p> }
            </div>
          </Overlay>
      );
  }

  export default Modal;