import React, { useState, useEffect } from "react";
import ImagePreview from "../other/ImagePreview";
import "../../CSS/home/Gallery.css";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

const Gallery = ({ displayCount }) => { // Receive displayCount prop
  const [previewImage, setPreviewImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/get-images", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

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
        {loading ? (
          <div className="loader">
            <ThreeDots color="#000000" height={50} width={50} />
          </div>
        ) : (
          images.slice(0, displayCount).map((imageName, index) => ( // Slice the images array
            <div className="gallery-image" key={index}>
              <img
                src={`http://localhost:5000/images/${imageName}`}
                alt={`Image ${index}`}
                onClick={() => handleImageClick(`http://localhost:5000/images/${imageName}`)}
              />
            </div>
          ))
        )}
      </div>
      {previewImage && (
        <ImagePreview imageUrl={previewImage} onClose={handleClosePreview} />
      )}
    </div>
  );
};

export default Gallery;
