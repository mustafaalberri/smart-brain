import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ detectButton, inputChange }) => {
  return (
    <>
      <p className="p_brain"> This is a magic brain that will detect faces in your pictures. Try it now to increase your rank! </p>
      <div className="img__link__form">
          <input onChange = {inputChange} type="text" placeholder="Enter Image URL here..." />
          <button onClick = {detectButton}> Detect </button>
      </div>
    </>
  );
}

export default ImageLinkForm;