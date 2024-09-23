// ImagePreview.js
import React from "react";
import "../../CSS/home/home.css";

function ImagePreview({ image, onClose }) {
  console.log(image);
  return (
    <div className="preview-overlay">
      <div className="gallery-preview-container">
        <button className="close-button" onClick={onClose}>
          <i className="fa fa-solid fa-x"></i>
        </button>
        <div className="preview-image">
          <img src={image.url} alt="Preview" />
          <span>{image.description}</span>
        </div>
      </div>
    </div>
  );
}

export default ImagePreview;
