import React, {useState} from "react";
import ImagePreview from "../other/ImagePreview";
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
  const [previewImage, setPreviewImage] = useState(null);
  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };
  return (
    <div className="gallery-div">
      <div className="gallery-title">
        <h1>
          Discover Our Painting <span>Portfolio</span>
        </h1>
      </div>
      <div className="gallery-main">
        {images.map((image, index) => (
          <div
            className="gallery-image"
            key={index}
            onClick={() => handleImageClick(image)}
          >
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
      {previewImage && (
        <ImagePreview imageUrl={previewImage} onClose={handleClosePreview} />
      )}
    </div>
  );
};

export { images, Gallery };
export default Gallery;
