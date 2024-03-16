import React from "react";
import "../../CSS/home/Services.css";
import residentialIcon from "../../images/residential.png";
import waterProofIcon from "../../images/water.png";
import interiorIcon from "../../images/interior.png";
import officeIcon from "../../images/office.png";

const servicesData = [
  {
    icon: residentialIcon,
    title: "House Painting",
    description: "Revitalize homes with expert painting services for interiors and exteriors.",
  },
  {
    icon: interiorIcon,
    title: "Interior Painting",
    description: "Enhance workspaces with professional painting for offices, minimizing disruption.",
  },
  {
    icon: officeIcon,
    title: "Office Painting",
    description: "Transform interiors with precision painting for walls, ceilings, and trim.",
  },
  {
    icon: waterProofIcon,
    title: "Water Proofing",
    description: "Protect your home from water damage with waterproofing solutions.",
  },
  {
    icon: waterProofIcon,
    title: "Wood Polishing",
    description: "Revitalize your wood furniture with our expert polishing services. Renew, protect, and enhance the natural beauty of your pieces.",
  },
  {
    icon: waterProofIcon,
    title: "Plumbing",
    description: "Fixing leaks and installing pipes – we've got your plumbing covered.",
  },
  {
    icon: waterProofIcon,
    title: "POP",
    description: "Transform your spaces with expert POP services, including false ceiling and wall plastering.",
  },
];

function Services() {
  return (
    <div className="our-serives">
      <div className="serives-text">Our Services</div>
      <h1>
        Spreading the joy of <span>Painting </span>
      </h1>
      <h1> and coloring</h1>
      <div className="services-boxes">
        {servicesData.map((service, index) => (
          <div className="services-box" key={index}>
            <img src={service.icon} alt="image" />
            <br />
            <h5>{service.title}</h5>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
