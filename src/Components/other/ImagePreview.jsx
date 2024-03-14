// ImagePreview.js
import React from "react";
import '../../CSS/home/home.css'

function ImagePreview({ imageUrl, onClose }) {
  return (
    <div className="preview-overlay">
      <div className="gallery-preview-container">
        <button className="close-button" onClick={onClose}>
          <i className="fa fa-solid fa-x"></i>
        </button>
        <div className="preview-image">
          <img src={imageUrl} alt="Preview" />
        </div>
      </div>
    </div>
  );
}

export default ImagePreview;
