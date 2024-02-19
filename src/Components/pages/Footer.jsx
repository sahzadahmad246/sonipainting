import React from "react";
import "../../CSS/home/Footer.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="footer-main">
        <div className="footer-top">
          <div className="footer-box footer-services">
            <h3>Services</h3>
            <ul>
              <li>
                <i class="fi fi-tr-house-chimney"></i>House Painting
              </li>
              <li>
                <i class="fi fi-tr-city"></i>Office Painting
              </li>
              <li>
                <i class="fi fi-tr-blinds-open"></i>Interior Painting
              </li>
              <li>
                <i class="fi fi-tr-water"></i>Water proofing
              </li>
            </ul>
          </div>
          <div className="footer-box quick-links">
            <h3>Quick Links</h3>
            <ul>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="gallery">Gallery</NavLink>
              <NavLink to="call-back">Request a call back</NavLink>
            </ul>
          </div>
          <div className="footer-box social-links">
            <h1>
              <NavLink>Soni Painting Works</NavLink>
            </h1>
            <ul>
              <li>
                <NavLink>
                  <i class="fa-brands fa-x-twitter"></i>
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <i class="fa-brands fa-instagram"></i>
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <i class="fa-brands fa-whatsapp"></i>
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <i class="fa-brands fa-facebook"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
        <p>Copyright <span id="copyright"> © </span> 2024   Soni Painting Works. All Rights Reserved</p>

        </div>
      </div>
    </>
  );
}

export default Footer;
