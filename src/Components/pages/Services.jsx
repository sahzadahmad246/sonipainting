import React from "react";
import "../../CSS/home/Services.css";
import residentialIcon from "../../images/residential.png";
import waterProofIcon from "../../images/water.png";
import interiorIcon from "../../images/interior.png";
import officeIcon from "../../images/office.png";
function Services() {
  return (
    <>
      <div className="our-serives">
        <div className="serives-text">Our Services</div>
        <h1>
          Spreading the joy of <span>Painting </span>
        </h1>
        <h1> and coloring</h1>
        <div className="services-boxes">
          <div className="services-box">
            <img src={residentialIcon} alt="image" />
            <br />
            <h5>House Painting </h5>
            <p>
              Revitalize homes with expert painting services for interiors and
              exteriors.
            </p>
            <button className="know-more-btn bg-danger text-light">
              Know More <i class=" ps-2 fa-sharp fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="services-box">
            <img src={interiorIcon} alt="image" />
            <br />
            <h5>Interior Painting </h5>
            <p>
              Enhance workspaces with professional painting for offices,
              minimizing disruption.
            </p>
            <button className="know-more-btn bg-danger text-light">
              Know More <i class=" ps-2 fa-sharp fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="services-box">
            <img src={officeIcon} alt="image" />
            <br />
            <h5>Office Painting </h5>
            <p>
              ransform interiors with precision painting for walls, ceilings,
              and trim.
            </p>
            <button className="know-more-btn bg-danger text-light">
              Know More <i class=" ps-2 fa-sharp fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="services-box">
            <img src={waterProofIcon} alt="image" /> <br />
            <h5>Water Proofing </h5>
            <p>
              Protect your home from water damage with  waterproofing
              solutions.
            </p>
            <button className="know-more-btn bg-danger text-light">
              Know More <i class=" ps-2 fa-sharp fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
