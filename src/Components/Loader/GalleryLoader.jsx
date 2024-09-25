import React from "react";
import "./GalleryLoader.css";  // Import the external CSS file

const GalleryLoader = () => {
  return (
    <div>
      {/* Skeleton loader for desktop */}
      <div className="gallery-loader-desktop">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="gallery-skeleton">
            <div className="loader-image"></div>
            <div className="loader-text"></div>
          </div>
        ))}
      </div>

      {/* Skeleton loader for mobile */}
      <div className="gallery-loader-mobile">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="gallery-skeleton mobile-skeleton">
            <div className="loader-image"></div>
            <div className="loader-text"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryLoader;
