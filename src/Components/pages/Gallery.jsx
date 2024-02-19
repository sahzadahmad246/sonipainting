import React from "react";
import "../../CSS/home/Gallery.css";
import thumbnail1 from "../../images/interior.png";
import thumbnail2 from "../../images/painter.jpg";
import thumbnail3 from "../../images/painter.jpg";

const images = [
  thumbnail1,
  thumbnail2,
  thumbnail3,
  thumbnail1,
  thumbnail2,
  thumbnail3,
  thumbnail3,
  thumbnail1,
  thumbnail2,
  thumbnail3,
];

const Gallery = () => {
  return (
    <div className="gallery-div">
      <div className="gallery-title">
        <h1>
          Discover Our Painting <span>Portfolio</span>
        </h1>
      </div>
      <div className="gallery-main">
        {images.map((image, index) => (
          <div className="gallery-image" key={index}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export { images, Gallery };
export default Gallery;
