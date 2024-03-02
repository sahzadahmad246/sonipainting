import React, { useEffect, useState } from "react";
import painterImage from "../../images/painter1.jpg";
import Services from "../pages/Services";
import { Gallery, images } from "./Gallery";
import Login from "../other/Login";
import "../../CSS/home/home.css";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import ImagePreview from "../other/ImagePreview";
import Reviews from "../other/Reviews";

function Home() {
  const [firstImages, setFirstImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const detectMobileDevice = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    };

    const initialSlice = detectMobileDevice() ? 5 : 7;
    setFirstImages(images.slice(0, initialSlice));
  }, []);

  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };
  return (
    <>
      <div className="landing">
        <div className="landing-left">
          <div className="left-content">
            <div className="welcome-message">
              Welcome to Soni Painting Wroks
            </div>
            <h1>
              Give shining <span>features </span>
            </h1>
            <h1> to your home</h1>
            <div className="left-service">
              <div className="service-icon">
                <span>
                  <i class="fi fi-tr-house-chimney"></i>House Painting
                </span>
                <span>
                  <i class="fi fi-tr-city"></i>Office Painting
                </span>
              </div>
              <div className="service-icon">
                <span className="align-center">
                  <i class="fi fi-tr-blinds-open"></i>Interior Painting
                </span>
                <span>
                  <i class="fi fi-tr-water"></i>Water proofing
                </span>
              </div>
              <div className="btn">
                <button className="bg-danger text-light">Get Quote</button>
                <button className="border border-danger text-danger ">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-right">
          <img src={painterImage} alt="painter image" />
        </div>
      </div>
      <Services />

      <div className="gallery-title">
        <h1>
          Discover Our <span>Painting Portfolio</span>
        </h1>
      </div>

      <div className="gallery-main">
        {firstImages.map((image, index) => (
          <div
            className="gallery-image"
            key={index}
            onClick={() => handleImageClick(image)}
          >
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}

        <NavLink className="text-center gallery-image" to="/gallery">
          see all <i class=" ps-2 fa-sharp fa-solid fa-arrow-right"></i>
        </NavLink>
      </div>

      {previewImage && (
        <ImagePreview imageUrl={previewImage} onClose={handleClosePreview} />
      )}
      <Reviews />
      <Footer />
    </>
  );
}

export default Home;
