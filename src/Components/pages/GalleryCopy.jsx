import React, { useState, useEffect } from "react";
import ImagePreview from "../other/ImagePreview";
import "../../CSS/home/Gallery.css";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";


const Gallery = ({ displayCount }) => {
  // Receive displayCount prop
  const [previewImage, setPreviewImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://sonipainting-backend.onrender.com/get-images"
        );
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
  console.log(images);
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
            <ThreeDots
              color="red"
              height={100}
              width={100}
              visible={true}
              className="loader"
            />
          </div>
        ) : (
          images.slice(0, displayCount).map((imageName, index) => (
            <div className="gallery-image" key={index}>
              <img
                src={`https://sonipainting-backend.onrender.com/images/${imageName}`}
                alt={`Image ${index}`}
                onClick={() =>
                  handleImageClick(
                    `https://sonipainting-backend.onrender.com/images/${imageName}`
                  )
                }
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
