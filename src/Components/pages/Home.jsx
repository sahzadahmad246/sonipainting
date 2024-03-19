import React, { useEffect, useState } from "react";
import painterImage from "../../images/painter1.jpg";
import Services from "../pages/Services";
// import { Gallery, images } from "./Gallery";
import Login from "../other/Login";
import "../../CSS/home/home.css";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import ImagePreview from "../other/ImagePreview";
import Reviews from "../other/Reviews";
import Gallery from "./Gallery";

function Home() {
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
                <NavLink className="bg-danger text-light button" to="/contact">
                  Get Quote
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-right">
          <img src={painterImage} alt="painter image" />
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
