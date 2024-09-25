import React, { useEffect } from "react";
import Services from "../pages/Services";
import "../../CSS/home/home.css";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import Reviews from "../other/Reviews";
import Gallery from "./Gallery";
import { Carousel } from "react-bootstrap";
import SliderLoader from "../Loader/sliderLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import staff1 from "../../images/staff1.jpg";
import staff2 from "../../images/staff2.jpg";
import staff3 from "../../images/staff3.jpg";

function Home() {
  // Images array for the slider (staff1, staff2, staff3)
  const staffImages = [
    { url: staff1 },
    { url: staff2 },
    { url: staff3 },
  ];

  return (
    <>
      <div className="landing">
        <div className="landing-left">
          <div className="left-content">
            <div className="welcome-message">
              Welcome to Soni Painting Works
            </div>
            <h1>
              Give shining <span>features </span>
            </h1>
            <h1> to your home</h1>
            <div className="left-service">
              <div className="service-icon">
                <span>
                  <i className="fi fi-tr-house-chimney"></i>House Painting
                </span>
                <span>
                  <i className="fi fi-tr-city"></i>Office Painting
                </span>
              </div>
              <div className="service-icon">
                <span className="align-center">
                  <i className="fi fi-tr-blinds-open"></i>Interior Painting
                </span>
                <span>
                  <i className="fi fi-tr-water"></i>Waterproofing
                </span>
              </div>
              <div className="btn">
                <NavLink className="bg-danger text-light button" to="/contact">
                  Get Quote
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="landing-right">
          {/* Removed Redux logic and directly used staff images */}
          <Carousel>
            {staffImages.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image.url}
                  alt={`Staff Image ${index + 1}`}
                  className="slider-image"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>

      <Services />
      <Gallery displayCount={8} />
      <Reviews />
      <Footer />
    </>
  );
}

export default Home;
