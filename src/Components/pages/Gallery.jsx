import React, { useState, useEffect } from "react";
import ImagePreview from "../other/ImagePreview";
import "../../CSS/home/Gallery.css";
import { ThreeDots } from "react-loader-spinner";
// import axios from "axios"; // Comment out axios import
import image1 from "../../images/image1.jpg";
import image2 from "../../images/image2.jpg";
import image3 from "../../images/image3.jpg";
import image4 from "../../images/image4.jpg";
import image5 from "../../images/image5.jpg";
import image6 from "../../images/image6.jpg";

const Gallery = ({ displayCount }) => {
  // Receive displayCount prop
  const [previewImage, setPreviewImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchImages = async () => {
    //   try {
    //     const response = await axios.get(
    //       "https://sonipainting-backend.onrender.com/get-images"
    //     );
    //     setImages(response.data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching images:", error);
    //     setLoading(false);
    //   }
    // };

    // fetchImages();
    
    // Simulating API call delay with setTimeout
    setTimeout(() => {
      setImages([image1, image2, image3, image4, image5, image6]);
      setLoading(false);
    }, 1000); // Adjust timeout as needed
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
          images.slice(0, displayCount).map((image, index) => (
            <div className="gallery-image" key={index}>
              <img
                src={image} // Use local image source
                alt={`Image ${index}`}
                onClick={() => handleImageClick(image)}
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
